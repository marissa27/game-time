function Enemy (options) {
  this.name = options.name
  this.solid = true
  this.hostile = true
  this.x = options.x
  this.y = options.y
  this.context = options.context
  this.speed = options.speed || .1
  this.game = options.game
  this.direction = 'down'
  this.rangeTop = options.rangeTop || 2
  this.rangeBottom = options.rangeBottom || 8
}

Enemy.prototype.draw = function () {
  this.context.fillStyle = "green";
  this.context.fillRect(this.x*50, this.y*50, 50, 50)
};

Enemy.prototype.move = function () {
  if(Math.floor(this.y) === this.rangeTop-1 ) {
    this.speed = -this.speed
    this.direction = 'down'
  }
  if(Math.floor(this.y) === this.rangeBottom) {
    this.speed = -this.speed
    this.direction = 'up'
  }
  var target = this.next(this.direction)
  if(target.name === "Steve") {
    console.log('kill steve')
    this.game.loseLife()
  } else if(target.name === "Nut") {
    this.game.reset()
  }
  this.game.grid[Math.round(this.x)][Math.round(this.y)] = {name: 'empty'}
  this.y = this.y + this.speed
  this.game.grid[Math.round(this.x)][Math.round(this.y)] = this
};

Enemy.prototype.next = function (direction) {
  switch (direction) {
    case 'up':
      return this.game.grid[Math.round(this.x)][Math.round(this.y) - 1]
      break
    case 'down':
      return this.game.grid[Math.round(this.x)][Math.round(this.y) + 1]
      break
    case 'left':
      return this.game.grid[Math.round(this.x) - 1][Math.round(this.y)]
      break
    case 'right':
      return this.game.grid[Math.round(this.x) + 1][Math.round(this.y)]
      break
  }
};


module.exports = Enemy
