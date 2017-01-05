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
  if(this.game.grid[this.x +1][this.y].name != 'wall') {
    this.x++;
    this.game.grid[this.x][this.y] = this;
    return this;
  }
}

Player.prototype.moveUp = function() {
  if(this.game.grid[this.x][this.y -1].name != 'wall') {
    this.y--;
    this.game.grid[this.x][this.y] = this;
    return this;
  }
}

Player.prototype.moveDown = function() {
  this.y++;
  this.game.grid[this.x][this.y] = this;
  return this;
}

Player.prototype.die = function () {


};

module.exports = Player
