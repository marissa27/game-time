var canvas = document.getElementById('game');
var context = canvas.getContext('2d')
var Player = require('../lib/Player.js');
var Game = require('./Game.js')
var genGrid = require('./grid.js')
// var Loop = require('./renderLoop.js')

function returnFake(x,y) {
  var game = new Game()
  game.grid = genGrid()
  game.player = new Player({name:'Steve', x:x, y:y, game:game})
  game.grid[game.player.x][game.player.y] = game.player
  game.canvas = canvas
  game.context = canvas.getContext('2d')
  // game.loop = Loop
  return game
}

var game = returnFake(3,4)

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillRect(game.player.x*50, game.player.y*50, 50, 50)
  console.log('hi')
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

console.log('past the loop')

var myBox = game.player

var listen = document.getElementById('body')
listen.onkeydown = function (e) {
  console.log('key!')
  switch(e.key) {
    case 'ArrowRight':
      if(myBox.x < 7 ) {
        myBox.moveRight()
      }
      break
    case 'ArrowLeft':
      if (myBox.x > 0 ) {
        myBox.moveLeft()
      }
      break
    case 'ArrowUp':
      if (myBox.y > 0 ) {
        myBox.moveUp()
      }
      break
    case 'ArrowDown':
      if (myBox.y < 5 ) {
        myBox.moveDown()
      }
      break
  }
}


// var Squirrel  = new Player()
// Game object
// grid loader/storage

// function Game() = {
//   this.currentLevel = 1
//   this.timer = 0
//   this.lives = 0
// }
//
// Game.prototype.reset = function () {
//   // reload current grid
// };
//
// Game.prototype.nextLevel = function () {
//   // load the next grid
//   // reset the timer
// };
//
// Game.prototype.loseLife = function () {
//   this.lives--
// };
//
// Game.prototype.setLife = function (l) {
//   this.lives = 1
// };

// function genGrid (x, y) {
//   var grid = []
//   var column = []
//   for (var i = 0; i < y; i++) {
//     column.push(emptyGridObject)
//   }
//   for (var i = 0; i < x; i++) {
//     grid.push(column)
//   }
//   return grid
// }
//
//
// function Box (boxX,boxY, name) {
//   this.x = boxX || 0
//   this.y = boxY || 0
//   this.prevX = 0
//   this.prevY = 0
//   this.name = name || 'Steve'
// }
//
// Box.prototype.say = function () {
//   console.log(`I'm a box at ${this.x}, ${this.y}. Previously at ${this.prevX}, ${this.prevY}`)
// };
//
// Box.prototype.addToGrid = function (grid) {
//   var column = grid[this.x].slice()
//   column.splice(this.y, 1, this)
//   grid.splice(this.x, 1, column)
// };
//
// Box.prototype.removeFromGrid = function (grid) {
//   var column = grid[this.prevX].slice()
//   column.splice(this.prevY, 1, 'trail')
//   grid.splice(this.prevX, 1, column)
// };
//
// var kill = function (grid) {
//   var column = grid[this.x].slice()
//   column.splice(this.y, 1, 'trail')
//   grid.splice(this.x, 1, column)
//
//   context.clearRect(this.x*50, this.y*50, 50, 50)
// };
//
// Box.prototype.updateGrid = function (grid) {
//   this.removeFromGrid(grid)
//   this.addToGrid(grid)
// };
//
// Box.prototype.storeLocation = function () {
//   myBox.prevX = myBox.x
//   myBox.prevY = myBox.y
// };
//
// Box.prototype.draw = function () {
//   context.clearRect(this.prevX*50, this.prevY*50, 50, 50)
//   context.fillRect(this.x*50, this.y*50, 50, 50)
// };
//
//
// var grid = genGrid(8,6)
// console.log(grid);
// var myBox = new Box(1,1)
// var stop = new Box(5, 1, 'stop')
// var stop2 = new Box(2, 3, 'stop')
// stop.addToGrid(grid)
// stop.draw()
// stop2.addToGrid(grid)
// stop2.draw()
//
// myBox.addToGrid(grid)
// myBox.draw()
//
//
// var listen = document.getElementById('body')
// listen.onkeydown = function (e) {
//   switch(e.key) {
//     case 'ArrowRight':
//       if(myBox.x < 7 && grid[myBox.x+1][myBox.y].name != 'stop') {
//         myBox.storeLocation()
//         myBox.x += 1
//         myBox.updateGrid(grid)
//         myBox.draw()
//       }
//       break
//     case 'ArrowLeft':
//       if (myBox.x > 0 && grid[myBox.x-1][myBox.y].name != 'stop') {
//         myBox.storeLocation()
//         myBox.x -= 1
//         myBox.updateGrid(grid)
//         myBox.draw()
//       }
//       break
//     case 'ArrowUp':
//       if (myBox.y > 0 && grid[myBox.x][myBox.y-1].name != 'stop') {
//         myBox.storeLocation()
//         myBox.y -= 1
//         myBox.updateGrid(grid)
//         myBox.draw()
//       }
//       break
//     case 'ArrowDown':
//       if (myBox.y < 5 && grid[myBox.x][myBox.y+1].name != 'stop') {
//         myBox.storeLocation()
//         myBox.y += 1
//         myBox.updateGrid(grid)
//         myBox.draw()
//       }
//       break
//     case ' ':
//       myBox.say()
//       console.log(grid);
//       break
//   }
// }
//
// var clickListen = document.getElementById('game')
// clickListen.onclick = function (e) {
//   console.log(e);
//   var x = Math.floor(e.clientX/50)
//   var y = Math.floor(e.clientY/50)
//   console.log(x,y);
//   console.log(grid[x][y].name);
//   if (!grid[x][y].name) {
//     var newBox = new Box(x,y,'stop')
//     newBox.addToGrid(grid)
//     newBox.draw()
//   } else if (grid[x][y].name === 'stop') {
//     kill.call(grid[x][y], grid)
//   } else if (grid[x][y].name === 'Steve') {
//     console.log('steve iss dead');
//     kill.call(grid[x][y], grid)
//   }
//   console.log(grid);
// }
