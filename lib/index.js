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
  grid[this.prevX][this.prevY] = ' '
  grid[this.x][this.y] = this
};

Box.prototype.say = function () {
  console.log(`I'm a box at ${this.x}, ${this.y}. Previously at ${this.prevX}, ${this.prevY}`)
};

Box.prototype.drawMove = function () {
  context.clearRect(this.prevX*50, this.prevY*50, 50, 50)
  context.fillRect(this.x*50, this.y*50, 50, 50)
};



var myBox = new Box(0,0)
myBox.drawMove()

var grid = genGrid(8,5)
console.log(grid);

var colTemp = grid[0].slice()
console.log(colTemp)
colTemp.fill(myBox, 0, 1)
console.log(colTemp);
grid.splice(0, 1, colTemp)



console.log(grid)


var listen = document.getElementById('body')
listen.onkeydown = function (e) {
  switch(e.key) {
    case 'ArrowRight':
      if(myBox.x < 7) {
        //check grid for obstacle
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.x += 1
        myBox.updateGrid(grid)
        myBox.drawMove()

      }
      break
    case 'ArrowLeft':
      if (myBox.x > 0) {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.x -= 1
        myBox.updateGrid(grid)
        myBox.drawMove()

      }
      break
    case 'ArrowUp':
      if (myBox.y > 0) {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.y -= 1
        myBox.updateGrid(grid)
        myBox.drawMove()

      }
      break
    case 'ArrowDown':
      if (myBox.y < 5) {
        myBox.prevX = myBox.x
        myBox.prevY = myBox.y
        myBox.y += 1
        myBox.updateGrid(grid)
        myBox.drawMove()
      }
      break
    case ' ':
      myBox.say()
  }
  console.log(grid);
}
