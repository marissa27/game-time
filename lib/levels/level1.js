var genGrid = require('../grid.js')

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

cat1 = {name:'angry cat', x:12, y:2}
cat2 = {name:'angry dog', x:10, y:3}
level1.enemies.push(cat1)
level1.enemies.push(cat2)

level1.player = {name:'Steve', x:5, y:4}
level1.nut = {x:9, y:7}
level1.goal = {x:2, y:9, game:game}

module.exports = JSON.stringify(level1)
