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
}

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
  console.log(game.walls);
  game.walls.forEach(function (wall) {
    console.log(wall);
    console.log(game.grid[wall.x][wall.y]);

    game.grid[wall.x][wall.y] = wall
  })
  game.enemies.forEach(function (enemy) {
    game.grid[enemy.x][enemy.y] = enemy
  })
  game.grid[game.player.x][game.player.y] = game.player
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
