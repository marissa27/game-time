function Player (options) {
  this.name = options.name || "Steve";
  this.x = options.x || x;
  this.y = options.y || y;
  this.game = options.game;
}

Player.prototype.next = function (direction) {
  switch (direction) {
    case 'up':
      return this.game.grid[this.x][this.y - 1]
      break
    case 'down':
      return this.game.grid[this.x][this.y + 1]
      break
    case 'left':
      return this.game.grid[this.x - 1][this.y]
      break
    case 'right':
      return this.game.grid[this.x + 1][this.y]
      break
  }
};

Player.prototype.moveLeft = function() {
  var target = this.next('left')
  if(target.hostile) {
    this.game.lives--
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.x--
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveRight = function() {
  var target = this.next('right')
  if(target.hostile) {
    this.game.lives--
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.x++
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveUp = function() {
  var target = this.next('up')
  if(target.hostile) {
    this.game.lives--
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.y--
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveDown = function() {
  var target = this.next('down')
  if(target.hostile) {
    this.game.lives--
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.y++
    this.game.grid[this.x][this.y] = this
  }
  return this;
}



Player.prototype.die = function () {

};

module.exports = Player
