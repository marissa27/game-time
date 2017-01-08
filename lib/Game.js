var loadLevel1 = require('./levels/level1')
var loadLevel2 = require('./levels/level2')
var genGrid = require('./grid.js')

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
}

Game.prototype.load = function (level) {
  this.currentLevel = level.currentLevel
  this.grid = level.grid
  this.player = level.player
  this.enemies = level.enemies
  this.walls = level.walls
  this.goal = level.goal
  this.nut = level.nut

  this.player.context = this.context
  this.player.game = this
  this.nut.context = this.context
  this.nut.game = this
  this.goal.context = this.context
  this.goal.game = this
  for (i=0; i < this.enemies.length; i++) {
    this.enemies[i].context = this.context
    this.enemies[i].game = this
  }
};

Game.prototype.reset = function () {

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
  console.log(game)
  game.walls.forEach(function (wall) {
    game.grid[wall.x][wall.y] = wall
  })
  game.enemies.forEach(function (enemy) {
    game.grid[enemy.x][enemy.y] = enemy
  })
  game.grid[game.player.x][game.player.y] = game.player
  console.log(game.player.x, game.player.y)
  game.grid[game.nut.x][game.nut.y] = game.nut
  // console.log(game.goal)
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
