var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const scale = 50

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  console.log(this.player.name);
  window.requestAnimationFrame(gameLoop)
}

module.exports = gameLoop
