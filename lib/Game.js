function Game () {
  this.currentLevel = 0
  this.grid = [[]] //level loading function
  this.timer = true
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

Game.prototype.createCountDown = function(tRemain) {
  var startTime = Date.now();
  this.timer = function() {
    return tRemain - ( Date.now() - startTime );
  }
}

module.exports = Game
