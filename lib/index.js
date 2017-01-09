var canvas = document.getElementById('game');
var context = canvas.getContext('2d')

var Game = require('./Game.js')




var game = new Game({canvas:canvas, context:context})

game.run()

function loop() {

  context.clearRect(0, 0, canvas.width, canvas.height)


  game.walls.forEach(function(wall) {
    context.fillStyle = "orange";
    context.fillRect(wall.x*50, wall.y*50, 50, 50)
  })
  game.enemies.forEach(function(enemy) {
    enemy.move()
    enemy.draw()
  })
  game.player.draw()
  game.nut.draw()
  game.goal.draw()
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

var myBox = game.player

var listen = document.getElementById('body')
listen.onkeydown = function (e) {
  switch(e.key) {
    case 'ArrowRight':
      if(myBox.x < canvas.width/50 ) {
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
      if (myBox.y < canvas.height/50 ) {
        myBox.moveDown()
      }
      break
  }
}

var clickListen = document.getElementById('game')
clickListen.onclick = function (e) {
  game.reset()
  // console.log(e);
  // var x = Math.floor(e.clientX/50)
  // var y = Math.floor(e.clientY/50)
  // console.log(x,y);
  // console.log(game.grid[x][y].name);
  // if (game.grid[x][y].name === 'empty') {
  //   game.walls.push({name:'wall', solid:true, x: x, y:y})
  // }
  // game.walls.forEach(function (wall) {
  //   game.grid[wall.x][wall.y] = wall
  // })
}
