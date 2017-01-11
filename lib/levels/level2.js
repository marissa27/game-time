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
  currentLevel: 2,
  time: 60
}

for (var i = 0; i < maxX; i++) {
  level.walls.push({name:'wall', solid:true, x: i, y:0})
  level.walls.push({name:'wall', solid:true, x: i, y:maxY-1})
}
for(var i = 0; i < maxY; i++) {
  level.walls.push({name:'wall', solid:true, x:0, y:i})
  level.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
}
for(i = 0; i < 6; i++) {
  level.walls.push({name:'wall', solid:true, x: 4, y:i+5})
}
for(i = 0; i < 5; i++) {
  level.walls.push({name:'wall', solid:true, x: 9, y:i+3})
}
level.walls.push({name:'wall', solid:true, x: 7, y:1})
level.walls.push({name:'wall', solid:true, x: 6, y:1})

for(i = 0; i < 5; i++) {
  level.walls.push({name:'wall', solid:true, x:i, y:5})
}

for(i = 0; i < 7; i++) {
  level.walls.push({name:'wall', solid:true, x:i+8, y:5})
}

level.player = {name:'Steve', x:2, y:3}
level.nut = {x:13, y:3}
level.goal = {x:13, y:9}

level.enemies.push({name:'angry cat', x:6, y:2, rangeTop:2, rangeBottom:10})
// level.enemies.push({name:'angry dog', x:10, y:3, rangeTop:1, rangeBottom:4, speed:.05})
// level.enemies.push({name:'angry bug', x:10, y:7, rangeTop:6, rangeBottom:10, speed:.06})
// level.enemies.push({name:'angry dog', x:2, y:8, rangeTop:5, rangeBottom:10, speed:.3})

module.exports = JSON.stringify(level)
