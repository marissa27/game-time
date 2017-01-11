function Nut (options) {
  this.x = options.x
  this.y = options.y
  this.name = options.name || 'Nut'
  this.game = options.game
  this.context = options.context
  this.solid = true
  this.goal = options.goal
  this.image = new Image()
  this.image.src = "lib/images/nut-sprite.svg"
  this.frame = 1
}

Nut.prototype.draw = function() {
this.context.drawImage(
  this.image,
  this.frame * 50,
  0,
  50,
  50,
  (this.x*50),
  // -this.buffer,
  this.y*50,
  50,
  50);
// this.context.drawImage(this.image, this.x*50, this.y*50);
return this;
}

Nut.prototype.next = function (direction) {
  if(this.frame === 7) {
    this.frame = 0
  } else {
    this.frame++
  }
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
