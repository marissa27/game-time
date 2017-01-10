var Player = require('./Player.js');
var Game = require('./Game.js')
var genGrid = require('./grid.js')
var Nut = require('./Nut.js')

function returnFake(op) {
  var game = new Game()
  game.grid = genGrid(op.maxX, op.maxY)
  game.player = new Player({name:'Steve', x:5, y:4, game:game, context:op.context})
  game.nut = new Nut({x:9, y:7, game:game})
  game.canvas = op.canvas
  game.context = op.context
  game.enemies = []
  game.walls = []
  for (var i = 0; i < op.maxX; i++) {
    game.walls.push({name:'wall', solid:true, x: i, y:0})
    game.walls.push({name:'wall', solid:true, x: i, y:op.maxY-1})
  }
  for(var i = 0; i < op.maxY; i++) {
    game.walls.push({name:'wall', solid:true, x:0, y:i})
    game.walls.push({name:'wall', solid:true, x:op.maxX-1, y:i})
  }
  return game
}

module.exports = returnFake
