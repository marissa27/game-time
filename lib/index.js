var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Game = require('./Game.js');
var wallImage = new Image();

wallImage.src = "lib/images/tree.png";

var pauseButton = document.getElementById('pause')

var game = new Game({canvas:canvas, context:context, pause:pauseButton})

game.run();
console.log(game);

function loop() {

  game.logTimer()
  var timer = document.querySelector('.timer-num').innerText = "TIMER: " + game.timeRemaining;
  context.clearRect(0, 0, canvas.width, canvas.height)
  game.walls.forEach(function(wall) {
    context.drawImage(wallImage, wall.x*50, wall.y*50);
  })
  game.enemies.forEach(function(enemy) {
    enemy.move();
    enemy.draw();
  })

  game.player.draw()
  game.nut.draw()
  game.goal.draw()
  if(game.playOn){
    requestAnimationFrame(loop)
  }
}

requestAnimationFrame(loop);

var myBox = game.player;

var listen = document.getElementById('body');
listen.onkeydown = function (e) {

  if(game.playOn){
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
  } else {
    pauseButton.click()
  }
}

var resetListen = document.getElementById('reset')
resetListen.onclick = function () {
  game.loseLife()
}

pauseButton.onclick = function () {
  if (!game.playOn) {
    requestAnimationFrame(loop)
  }
  game.playOn = !game.playOn
}
