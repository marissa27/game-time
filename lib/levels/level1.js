var genGrid = require('../grid.js')

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

cat1 = {name:'angry cat', x:12, y:2}
cat2 = {name:'angry dog', x:10, y:3}
level.enemies.push(cat1)
level.enemies.push(cat2)

level.player = {name:'Steve', x:5, y:4}
level.nut = {x:9, y:7}
level.goal = {x:2, y:9, game:game}

module.exports = JSON.stringify(level)
