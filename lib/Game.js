function Game () {
  this.currentLevel = 0
  this.grid = [[]] //level loading function
  this.timer = {}
  this.player = {name:"default"}
  this.lives = 3
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
  this.lives--
};

module.exports = Game
