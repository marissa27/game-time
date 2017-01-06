function Game (timer) {
  this.currentLevel = 0
  this.grid = [[]] //level loading function
  this.player = {name:"default"}
  this.timer = timer
  this.lives = 3
  this.enemies = []
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
  if(game.lives == 0) {
    return game.lives = 'game-over';
  }
};




Game.prototype.createCountDown = function(tRemain) {
	var startTime = Date.now();
	this.timeRemaining = function() {
		return tRemain - ( Date.now() - startTime );
	}
}
// var currentCountDown = createCountDown(60000);

module.exports = Game
