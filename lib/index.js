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
game.walls = []
game.walls.push({name:'wall', solid:true, x: 2, y:2})

game.enemies = []
game.enemies.push({name:'angry cat', solid:true, hostile:true, x:4, y:1})

game.walls.forEach(function (wall) {
  game.grid[wall.x][wall.y] = wall
})

game.enemies.forEach(function (enemy) {
  game.grid[enemy.x][enemy.y] = enemy
})

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = "blue"
  context.fillRect(game.player.x*50, game.player.y*50, 50, 50)
  game.walls.forEach(function(wall) {
    context.fillStyle = "orange";
    context.fillRect(wall.x*50, wall.y*50, 50, 50)
  })
  game.enemies.forEach(function(wall) {
    context.fillStyle = "green";
    context.fillRect(wall.x*50, wall.y*50, 50, 50)
  })
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)


var myBox = game.player

var listen = document.getElementById('body')
listen.onkeydown = function (e) {
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



var clickListen = document.getElementById('game')
clickListen.onclick = function (e) {
  console.log(e);
  var x = Math.floor(e.clientX/50)
  var y = Math.floor(e.clientY/50)
  console.log(x,y);
  console.log(game.grid[x][y].name);
  if (game.grid[x][y].name === 'empty') {
    game.walls.push({name:'wall', solid:true, x: x, y:y})
  }
  game.walls.forEach(function (wall) {
    game.grid[wall.x][wall.y] = wall
  })
}
