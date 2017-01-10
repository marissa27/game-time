var assert = require('chai').assert
var Game = require('../lib/Game.js');
var Player = require('../lib/Player.js')
var genGrid = require('../lib/grid.js');

function returnFake(x,y) {
  var game = new Game()
  game.grid = genGrid(canvas.width/50, canvas.height/50)
  game.player = new Player({name:'Steve', x:x, y:y, game:game})
  game.grid[game.player.x][game.player.y] = game.player
  game.nut = new Nut({x:4, y:4, solid:true, name:'Nut'})
  game.grid[game.nut.x][game.nut.y] = game.nut
  game.canvas = canvas
  game.context = context
  return game
}
