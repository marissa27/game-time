function Player (name, x, y, game) {
  this.name = "Steve";
  this.x = x;
  this.y = y;
  this.game = game;
}

Player.prototype.moveLeft = function() {
  this.x--;
  return this;
}

Player.prototype.moveRight = function() {
  this.x++;
  return this;
}

Player.prototype.moveUp = function() {
  this.y--;
  return this;
}

Player.prototype.moveDown = function() {
  this.y++;
  this.game.grid[this.x][this.y] = this;
  return this;
}

Player.prototype.die = function () {


};

module.exports = Player
