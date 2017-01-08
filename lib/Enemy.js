function Enemy (options) {
  this.name = options.name
  this.solid = true
  this.hostile = true
  this.x = options.x
  this.y = options.y
  this.context = options.context
  this.speed = .1
  this.game = options.game
  this.direction = 'down'
}

Enemy.prototype.draw = function () {
  this.context.fillStyle = "green";
  this.context.fillRect(this.x*50, this.y*50, 50, 50)
};

Enemy.prototype.move = function () {
  if(Math.round(this.y) === 2 ) {
    this.speed = .1
    this.direction = 'down'
  }
  if(Math.round(this.y) === 8) {
    this.speed = -.1
    this.direction = 'up'
  }
  var target = this.next(this.direction)
  if(target.name === "Steve") {
    console.log('kill steve')
    this.game.lifes--
    this.game.reset()
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
