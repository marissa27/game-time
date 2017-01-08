var Player = require('../Player.js');
var Game = require('../Game.js')
var genGrid = require('../grid.js')
var Nut = require('../Nut.js')
var Enemy = require('../Enemy')

function loadLevel2(game) {
  var maxX = game.canvas.width/50
  var maxY = game.canvas.height/50;
  game.grid = genGrid(maxX, maxY)
  //Add border walls
  for (var i = 0; i < maxX; i++) {
    game.walls.push({name:'wall', solid:true, x: i, y:0})
    game.walls.push({name:'wall', solid:true, x: i, y:maxY-1})
  }
  for(var i = 0; i < maxY; i++) {
    game.walls.push({name:'wall', solid:true, x:0, y:i})
    game.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
  }
  //Add custom walls
  for(i = 0; i < 7; i++) {
    game.walls.push({name:'wall', solid:true, x: 4, y:i})
  }
  for(i = 0; i < 7; i++) {
    game.walls.push({name:'wall', solid:true, x:i+8, y:5})
  }
  //Add enemies
  testCat = new Enemy({name:'angry cat', x:12, y:2, context:game.context, game:game})
  newCat = new Enemy({name:'angry dog', x:10, y:3, context:game.context, game:game})
  game.enemies.push(testCat)
  game.enemies.push(newCat)
  //Add player and nut
  game.player = new Player({name:'Steve', x:1, y:1, game:game, context:game.context})
  game.nut = new Nut({x:9, y:7, game:game})
  return game
}

module.exports = loadLevel2
