var Player = require('../Player.js');
var Game = require('../Game.js')
var genGrid = require('../grid.js')
var Nut = require('../Nut.js')
var Enemy = require('../Enemy')
var Goal = require('../Goal')

var maxX = 16
var maxY = 12

var level1 = {
  grid: genGrid(maxX, maxY),
  walls: [],
  canvas: {},
  context: {},
  enemies: [],
  player: {name: 'Steve'},
  goal: {},
  currentLevel: 1
}

for (var i = 0; i < maxX; i++) {
  level1.walls.push({name:'wall', solid:true, x: i, y:0})
  level1.walls.push({name:'wall', solid:true, x: i, y:maxY-1})
}
for(var i = 0; i < maxY; i++) {
  level1.walls.push({name:'wall', solid:true, x:0, y:i})
  level1.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
}

testCat = new Enemy({name:'angry cat', x:12, y:2, context:level1.context, game:game})
newCat = new Enemy({name:'angry dog', x:10, y:3, context:level1.context, game:game})
level1.enemies.push(testCat)
level1.enemies.push(newCat)

level1.player = new Player({name:'Steve', x:5, y:4, game:game, context:game.context})
level1.nut = new Nut({x:9, y:7, game:game})
level1.grid[level1.nut.x][level1.nut.y] = level1.nut

// Add goal
level1.goal = new Goal({x:2, y:9, game:game})

module.exports = JSON.stringify(level1)
