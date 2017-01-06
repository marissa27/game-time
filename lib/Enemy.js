function Enemy (options) {
  this.name = options.name
  this.solid = true
  this.hostile = true
  this.x = options.x
  this.y = options.y
  this.context = options.context
  this.speed = 1
  this.game = options.game
}

Enemy.prototype.draw = function () {
  this.context.fillStyle = "green";
  this.context.fillRect(this.x*50, this.y*50, 50, 50)
};

Enemy.prototype.move = function () {
  if(Math.floor(this.y) === 2 ) {
    this.speed = .1
  }
  if(Math.floor(this.y) === 9) {
    this.speed = -.1
  }
  this.game.grid[Math.floor(this.x)][Math.floor(this.y)] = {name: 'empty'}
  this.y = this.y + this.speed
  this.game.grid[Math.floor(this.x)][Math.floor(this.y)] = this
};

module.exports = Enemy
