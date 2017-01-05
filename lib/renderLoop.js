var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const scale = 50

function gameLoop(game) {
  context.clearRect(0, 0, canvas.width, canvas.height)
  console.log(game.player.name);
  window.requestAnimationFrame(gameLoop(game))
}

module.exports = gameLoop
