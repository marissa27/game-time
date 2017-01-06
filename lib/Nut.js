

function Nut (options) {
  this.x = options.x
  this.y = options.y
  this.name = options.name || 'Nut'
  this.game = options.game
  this.solid = true
}

Nut.prototype.next = function (direction) {
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


module.exports = Nut
