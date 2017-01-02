var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// context.fillRect(x, y, width, height)
// requestAnimationFrame(function gameLoop() {
//   requestAnimationFrame(gameLoop)
// });

function genGrid (x, y) {
  var grid = []
  var column = []
  for (var i = 0; i < y; i++) {
    column.push('X')
  }
  for (var i = 0; i < x; i++) {
    grid.push(column)
  }
  return grid
}

function Box (boxX,boxY, name) {
  this.x = boxX || 0
  this.y = boxY || 0
  this.prevX = 0
  this.prevY = 0
  this.name = name || 'Steve'
}

Box.prototype.updateGrid = function (grid) {
  var column = grid[this.prevX].slice()
  column.splice(this.prevY, 1, 'trail')
  grid.splice(this.prevX, 1, column)

  var column = grid[this.x].slice()
  column.splice(this.y, 1, this)
  grid.splice(this.x, 1, column)
};

Box.prototype.say = function () {
  console.log(`I'm a box at ${this.x}, ${this.y}. Previously at ${this.prevX}, ${this.prevY}`)
};

Box.prototype.drawMove = function () {
  context.clearRect(this.prevX*50, this.prevY*50, 50, 50)
  context.fillRect(this.x*50, this.y*50, 50, 50)
};


var grid = genGrid(8,6)
var myBox = new Box(0,0)
var stop = new Box(5, 1, 'stop')
var stop2 = new Box(2, 3, 'stop')
stop.updateGrid(grid)
stop.drawMove()
stop2.updateGrid(grid)
stop2.drawMove()

myBox.updateGrid(grid)
myBox.drawMove()

var listen = document.getElementById('body')
listen.onkeydown = function (e) {
  switch(e.key) {
    case 'ArrowRight':
      if(myBox.x < 7 && grid[myBox.x+1][myBox.y].name != 'stop') {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.x += 1
        myBox.updateGrid(grid)
        myBox.drawMove()
      }
      break
    case 'ArrowLeft':
      if (myBox.x > 0 && grid[myBox.x-1][myBox.y].name != 'stop') {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.x -= 1
        myBox.updateGrid(grid)
        myBox.drawMove()
      }
      break
    case 'ArrowUp':
      if (myBox.y > 0 && grid[myBox.x][myBox.y-1].name != 'stop') {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.y -= 1
        myBox.updateGrid(grid)
        myBox.drawMove()
      }
      break
    case 'ArrowDown':
      if (myBox.y < 5 && grid[myBox.x][myBox.y+1].name != 'stop') {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.y += 1
        myBox.updateGrid(grid)
        myBox.drawMove()
      }
      break
    case ' ':
      myBox.say()
      break
  }
}
