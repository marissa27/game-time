var Loop = require('../lib/renderLoop')
var assert = require('chai').assert
var Player = require('../lib/Player.js')
var Game = require('../lib/Game.js');
var genGrid = require('../lib/grid');

function returnFake(x,y) {
  var game = new Game()
  game.grid = genGrid()
  game.player = new Player('Steve', x, y, game)
  game.grid[game.player.x][game.player.y] = game.player
  return game
}
// Loop()
describe('RenderLoop tests', function () {
  it('will loop', function () {
    // Loop()
  })
})
