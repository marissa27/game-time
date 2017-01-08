var loadLevel1 = require('./levels/level1')
var loadLevel2 = require('./levels/level2')

var Player = require('../lib/Player.js');
var genGrid = require('./grid.js')
var Nut = require('../lib/Nut.js')
var Enemy = require('./Enemy')
var Goal = require('./Goal')


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
  this.player = new Player(origin.player)
  this.player.context = this.context
  this.player.game = this
  console.log(this.player)

  this.walls = origin.walls
  this.goal = new Goal(origin.goal)
  this.nut = new Nut(origin.nut)

  this.nut.context = this.context
  this.nut.game = this
  this.goal.context = this.context
  this.goal.game = this

  for (i=0; i < origin.enemies.length; i++) {
    this.enemies[i] = new Enemy(origin.enemies[i])
    this.enemies[i].context = this.context
    this.enemies[i].game = this
  }
  this.refreshGrid(this)
};

Game.prototype.reset = function () {
  console.log('reset level')
  console.log(this.grid);
  var origin = JSON.parse(this.levelJSON)
  var clear =[]
  if (this.player.x != origin.player.x || this.player.y != origin.player.y){
    console.log('move steve');
    clear.push({x:this.player.x, y:this.player.y})
    this.player.x = origin.player.x
    this.player.y = origin.player.y
  }
  if (this.nut.x != origin.nut.x || this.nut.y != origin.nut.y) {
    console.log('move nut');
    clear.push({x:this.nut.x, y:this.nut.y})
    this.nut.x = origin.nut.x
    this.nut.y = origin.nut.y
  }
  this.refreshGrid(this)
  for (i = 0; i < clear.length; i++) {
    this.grid[clear[i].x][clear[i].y] = {name:'empty'}
  }
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
