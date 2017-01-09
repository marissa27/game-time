function Player (options) {
  this.name = options.name || "Steve";
  this.x = options.x || x;
  this.y = options.y || y;
  this.game = options.game;
  this.context = options.context;
  this.image = new Image()
  this.image.src = "lib/images/steve-sprite-l.png"
  this.frame = 1
}

Player.prototype.draw = function() {
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

Player.prototype.move = function (dir) {

  if(this.frame === 3) {
    this.frame = 0
  } else {
    this.frame++
  }
  var target = this.next(dir)
  if(target.hostile) {
    this.game.lives--
    this.game.reset()
  }
  if(target.name === 'Nut') {
    nutTarget = target.next(dir)
    if(nutTarget.hostile) {
      this.game.reset()
    }
    if(nutTarget.name === 'winner') {
      // load new level function
      alert('Level Completed')
    }
    if(!nutTarget.solid) {
      this.game.grid[target.x][target.y] = {name: 'empty'}
      switch (dir) {
        case 'left':
          target.x--
          break;
        case 'right':
          target.x++
          break
        case 'up':
          target.y--
          break
        case 'down':
          target.y++
          break
      }
      this.game.grid[target.x][target.y] = target
      target = this.next(dir)
    }
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    switch (dir) {
      case 'left':
        this.x--
        break;
      case 'right':
        this.x++
        break
      case 'up':
        this.y--
        break
      case 'down':
        this.y++
        break
    }
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveLeft = function() {
  this.image.src = "lib/images/steve-sprite-l.png"
  this.move('left')
  return this;
}

Player.prototype.moveRight = function() {
  this.image.src = "lib/images/steve-sprite-r.png"
  this.move('right')
  return this;
}

Player.prototype.moveUp = function() {
  this.move('up')
  return this;
}

Player.prototype.moveDown = function() {
  this.move('down')
  return this;
}

module.exports = Player
