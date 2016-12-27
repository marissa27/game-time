var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// context.fillRect(x, y, width, height)
// requestAnimationFrame(function gameLoop() {
//
//   requestAnimationFrame(gameLoop)
// });
function genGrid (x, y) {
  var grid = []
  var column = []
  for (var i = 0; i < y; i++) {
    column.push(' ')
  }
  for (var i = 0; i < x; i++) {
    grid.push(column)
  }
  return grid
}
var grid = genGrid(7,5)
grid[0][0] = 'box'

console.log(grid);

function Box (boxX,boxY) {
  this.x = boxX
  this.y = boxY
  this.spot = [this.x,this.y]
}

var myBox = new Box(0,0)
console.log(myBox.spot[0])

var x = 0
var y = 0
var prevX
var prevY


//Movement
context.fillRect(x, y, 50, 50)

function move() {
  context.clearRect(prevX, prevY, 50, 50)
  context.fillRect(x, y, 50, 50)
}

var listen = document.getElementById('body')
listen.onkeydown = function (e) {
  prevX = x
  prevY = y
  switch(e.key) {
    case 'ArrowRight':
      if(myBox.x < 7) {
        //check grid for obstacle
        myBox.x += 1
        x += 50
        move()
      }
      break
    case 'ArrowLeft':
      if (myBox.x > 0) {
        myBox.x -= 1
        x -= 50
        move()
      }
      break
    case 'ArrowUp':
      if (myBox.y > 0) {
        myBox.y -= 1
        y -= 50
        move()
      }
      break
    case 'ArrowDown':
      if (myBox.y < 5) {
        myBox.y += 1
        y += 50
        move()
      }
      break
  }
  console.log(myBox.x, myBox.y)
}
