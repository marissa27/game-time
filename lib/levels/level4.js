var genGrid = require('../grid.js')

function newWall(options) {
  var x = options.startX || 1
  var y = options.startY || 1
  var length = options.length || 5
  var direction = options.direction || 'H' //'H' 'V' 'D'?
  switch (direction) {
    case 'H':
      for (var i = 0; i < length; i++) {
        level.walls.push({name: 'wall', solid: true, x: i + x, y: y})
      }
      break;
    case 'V':
      for (var i = 0; i < length; i++) {
        level.walls.push({name: 'wall', solid: true, x: x, y: i + y})
      }
      break;
    case 'D':
      for (var i = 0; i < length; i++) {
        level.walls.push({name: 'wall', solid: true, x: i + x, y: i + y})
      }
      break;
  }
}

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
  currentLevel: 4,
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

newWall({
  startX:1,
  startY:1,
  length:2,
  direction:'V'
})

newWall({
  startX:1,
  startY:2,
  length:2,
  direction:'V'
})

newWall({
  startX:3,
  startY:9,
  length:3,
  direction:'H'
})

newWall({
  startX:7,
  startY:3,
  length:8,
  direction:'V'
})

newWall({
  startX:7,
  startY:1,
  length:3,
  direction:'H'
})

newWall({
  startX:1,
  startY:5,
  length:3,
  direction:'H'
})

newWall({
  startX:14,
  startY:4,
  length:8,
  direction:'V'
})

newWall({
  startX:14,
  startY:1,
  length:2,
  direction:'V'
})

newWall({
  startX:3,
  startY:1,
  length:2,
  direction:'V'
})

level.walls.push({name:'wall', solid:true, x:7, y:10})
level.walls.push({name:'wall', solid:true, x:4, y:10})
level.walls.push({name:'wall', solid:true, x:4, y:9})
level.walls.push({name:'wall', solid:true, x:4, y:7})

level.player = {name:'Steve', x:14, y:3}
level.nut = {x:9, y:2}
level.goal = {x:2, y:10}

level.enemies.push({name:'Near Start', x:6, y:6, rangeTop:3, rangeBottom:10, speed:.02})
level.enemies.push({name:'Nutty McNutface', x:8, y:4, rangeTop:3, rangeBottom:10, speed:.05})
level.enemies.push({name:'Nutty McNutface', x:10, y:2, rangeTop:1, rangeBottom:9, speed:.03})
level.enemies.push({name:'Nutty McNutface', x:12, y:6, rangeTop:1, rangeBottom:9, speed:.03})
level.enemies.push({name:'Nutty McNutface', x:13, y:6, rangeTop:1, rangeBottom:9, speed:.06})



module.exports = JSON.stringify(level)
