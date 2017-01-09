var Player = require('./Player.js');
var Nut = require('./Nut.js')
var Enemy = require('./Enemy.js')
var Goal = require('./Goal.js')


function Game (options) {
  this.currentLevel = 0
  this.grid = [[]]
  this.player = {name:"default"}
  this.lives = 3
  this.enemies = []
  this.walls = []
  this.context = options.context
  this.canvas = options.canvas
  this.goal = {}
  this.nut = {}
  this.levelJSON = ''
}

Game.prototype.load = function (level) {
  this.levelJSON = level
  origin = JSON.parse(this.levelJSON)
  this.currentLevel = origin.currentLevel
  this.grid = origin.grid
  this.walls = origin.walls

  this.player = new Player(origin.player)
  this.player.context = this.context
  this.player.game = this

  this.goal = new Goal(origin.goal)
  this.goal.context = this.context
  this.goal.game = this

  this.nut = new Nut(origin.nut)
  this.nut.context = this.context
  this.nut.game = this

  for (i=0; i < origin.enemies.length; i++) {
    this.enemies[i] = new Enemy(origin.enemies[i])
    this.enemies[i].context = this.context
    this.enemies[i].game = this
  }
  this.refreshGrid(this)
};

Game.prototype.reset = function () {
  console.log('reset level')
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
  console.log(this.lives);
};

Game.prototype.restart = function () {
  this.currentLevel = 0
  this.lives = 3
};

Game.prototype.nextLevel = function () {
  this.currentLevel++
};

Game.prototype.loseLife = function () {
  this.lives--;
  if(this.lives == 0) {
    return this.lives = 'game-over';
  }
};

Game.prototype.refreshGrid = function (game) {
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



Game.prototype.createCountDown = function(tRemain) {
	var startTime = Date.now();
	this.timeRemaining = function() {
		return tRemain - ( Date.now() - startTime );
	}
}
// var currentCountDown = createCountDown(60000);

module.exports = Game
