var Player = require('../Player.js');
var Game = require('../Game.js')
var genGrid = require('../grid.js')
var Nut = require('../Nut.js')
var Enemy = require('../Enemy')
var Goal = require('../Goal')

var maxX = 16
var maxY = 12

var level = {
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
  level.walls.push({name:'wall', solid:true, x: i, y:0})
  level.walls.push({name:'wall', solid:true, x: i, y:maxY-1})
}
for(var i = 0; i < maxY; i++) {
  level.walls.push({name:'wall', solid:true, x:0, y:i})
  level.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
}

for(i = 0; i < 7; i++) {
  level.walls.push({name:'wall', solid:true, x: 4, y:i})
}
for(i = 0; i < 7; i++) {
  level.walls.push({name:'wall', solid:true, x:i+8, y:5})
}

testCat = {name:'angry cat', x:6, y:2}
newCat = {name:'angry dog', x:10, y:3}
level.enemies.push(testCat)
level.enemies.push(newCat)

level.player = {name:'Steve', x:2, y:3}
level.nut = {x:13, y:4}

// Add goal
level.goal = {x:13, y:9}

module.exports = JSON.stringify(level)
