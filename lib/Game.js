var Player = require('./Player.js');
var Nut = require('./Nut.js')
var Enemy = require('./Enemy.js')
var Goal = require('./Goal.js')
var levelBox = require('./levelBox.js')

function Game (options) {
  this.context = options.context
  this.canvas = options.canvas
  this.pauseButton = options.pause
  this.time = options.time || 60
  this.lives = 3
  this.grid = [[]]
  this.levelJSON = ''
  this.levelBox = levelBox
  this.currentLevel = 0
  this.player = new Player({game:this, context:this.context})
  this.goal = new Goal({game:this, context:this.context})
  this.nut = new Nut({game:this, context:this.context})
  this.enemies = []
  this.walls = []
  this.playOn = true
}

Game.prototype.pause = function () {
  this.pauseButton.click()
};

Game.prototype.run = function () {
  this.tick()
  this.load(this.levelBox[1])
};

Game.prototype.load = function (levelJSON) {
  this.levelJSON = levelJSON
  origin = JSON.parse(this.levelJSON)
  this.currentLevel = origin.currentLevel
  this.time = origin.time || 10000
  this.grid = origin.grid
  this.walls = origin.walls

  var level = document.querySelector('.level-num').innerText = "LEVEL: " + this.currentLevel;

  this.player.x = origin.player.x
  this.player.y = origin.player.y

  this.nut.x = origin.nut.x
  this.nut.y = origin.nut.y

  this.goal.x = origin.goal.x
  this.goal.y = origin.goal.y

  this.enemies = []
  for (i=0; i < origin.enemies.length; i++) {
    this.enemies[i] = new Enemy(origin.enemies[i])
    this.enemies[i].context = this.context
    this.enemies[i].game = this
  }
  this.refreshGrid(this)
};

Game.prototype.reset = function () {
  var origin = JSON.parse(this.levelJSON)
  var clear =[]
  if (this.player.x != origin.player.x || this.player.y != origin.player.y){
    clear.push({x:this.player.x, y:this.player.y})
    this.player.x = origin.player.x
    this.player.y = origin.player.y
  }
  if (this.nut.x != origin.nut.x || this.nut.y != origin.nut.y) {
    clear.push({x:this.nut.x, y:this.nut.y})
    this.nut.x = origin.nut.x
    this.nut.y = origin.nut.y
  }
  this.refreshGrid(this)
  for (i = 0; i < clear.length; i++) {
    this.grid[clear[i].x][clear[i].y] = {name:'empty'}
  }
  this.time = origin.time
  this.pause()
};

Game.prototype.restart = function () {
  this.lives = 3
  this.load(this.levelBox[1])
  this.pause()
};

Game.prototype.nextLevel = function () {
  this.load(this.levelBox[this.currentLevel+1])
  this.pause()
};

Game.prototype.loseLife = function () {
  this.lives--
  var lives = document.querySelector('.lives-num').innerText = "LIVES " + this.lives;
  if(this.lives <= 0) {
    this.restart()
  } else {
    this.reset()
  }
};

Game.prototype.refreshGrid = function (game) {
  var lives = document.querySelector('.lives-num').innerText = "LIVES: " + this.lives;
  game.walls.forEach(function (wall) {
    game.grid[wall.x][wall.y] = wall
  })
  game.enemies.forEach(function (enemy) {
    game.grid[enemy.x][enemy.y] = enemy
  })
  game.grid[game.player.x][game.player.y] = game.player
  game.grid[game.nut.x][game.nut.y] = game.nut
  game.grid[game.goal.x][game.goal.y] = game.goal
};

Game.prototype.tick = function () {
  var callbackBind = this.tick.bind(this)
  if(this.playOn){
    this.time--
    if (this.time <= 0) {
      this.time = JSON.parse(this.levelJSON).time
      this.loseLife()
    }
  }
  window.setTimeout(callbackBind, 1000)
};


module.exports = Game
