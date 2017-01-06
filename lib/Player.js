function Player (options) {
  this.name = options.name || "Steve";
  this.x = options.x || x;
  this.y = options.y || y;
  this.game = options.game;
  this.context = options.context;
}

Player.prototype.draw = function() {
  var image = new Image()
  image.src = "lib/images/steve.png"
    this.context.drawImage(image, this.x*50, this.y*50);
    // this.context.fillRect(this.x*50, this.y*50, 50, 50)
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

Player.prototype.moveLeft = function() {
  var dir = 'left'
  var target = this.next(dir)
  if(target.hostile) {
    this.game.lives--
    console.log(this.game.lives)
  }
  if(target.name === 'Nut') {
    console.log('nut!')
    nutTarget = target.next(dir)
    if(!nutTarget.solid) {
      this.game.grid[target.x][target.y] = {name: 'empty'}
      target.x--
      this.game.grid[target.x][target.y] = target
      target = this.next(dir)
    }
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.x--
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveRight = function() {
  var dir = 'right'
  var target = this.next(dir)
  if(target.hostile) {
    this.game.lives--
    console.log(this.game.lives)
  }
  if(target.name === 'Nut') {
    console.log('nut!')
    nutTarget = target.next(dir)
    if(!nutTarget.solid) {
      this.game.grid[target.x][target.y] = {name: 'empty'}
      target.x++
      this.game.grid[target.x][target.y] = target
      target = this.next(dir)
    }
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.x++
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveUp = function() {
  var dir = 'up'
  var target = this.next(dir)
  if(target.hostile) {
    this.game.lives--
    console.log(this.game.lives)
  }
  if(target.name === 'Nut') {
    console.log('nut!')
    nutTarget = target.next(dir)
    if(!nutTarget.solid) {
      this.game.grid[target.x][target.y] = {name: 'empty'}
      target.y--
      this.game.grid[target.x][target.y] = target
      target = this.next(dir)
    }
  }
  if(!target.solid) {
    this.game.grid[this.x][this.y] = {name: 'empty'}
    this.y--
    this.game.grid[this.x][this.y] = this
  }
  return this;
}

Player.prototype.moveDown = function() {
  var dir = 'down'
  var target = this.next(dir)
  if(target.hostile) {
    this.game.lives--
    console.log(this.game.lives)
  }
  if(target.name === 'Nut') {
    console.log('nut!')
    nutTarget = target.next(dir)
    if(!nutTarget.solid) {
      this.game.grid[target.x][target.y] = {name: 'empty'}
      target.y++
      this.game.grid[target.x][target.y] = target
      target = this.next(dir)
    }
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
