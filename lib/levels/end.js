var genGrid = require('../grid.js')

var maxX = 16
var maxY = 12

var end = {
  grid: genGrid(maxX, maxY),
  walls: [],
  canvas: {},
  context: {},
  enemies: [],
  player: {name: 'Steve'},
  goal: {},
  currentLevel: 0
}

function newWall(options) {
  var x = options.startX || 1
  var y = options.startY || 1
  var length = options.length || 5
  var direction = options.direction || 'H' //'H' 'V' 'D'?
  switch (direction) {
    case 'H':
      for (var i = 0; i < length; i++) {
        end.walls.push({name: 'wall', solid: true, x: i + x, y: y})
      }
      break;
    case 'V':
      for (var i = 0; i < length; i++) {
        end.walls.push({name: 'wall', solid: true, x: x, y: i + y})
      }
      break;
    case 'D':
      for (var i = 0; i < length; i++) {
        end.walls.push({name: 'wall', solid: true, x: i + x, y: i + y})
      }
      break;
  }
}

end.walls.push({name:'wall', solid:true, x: 0, y: 10})
end.walls.push({name:'wall', solid:true, x: 0, y: 9})

for (var i = 0; i < maxX; i++) {
  end.walls.push({name:'wall', solid:true, x: i, y:0})
  end.walls.push({name:'wall', solid:true, x: i, y:maxY-1})
}
// for(var i = 0; i < maxY; i++) {
//   end.walls.push({name:'wall', solid:true, x:0, y:i})
//   end.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
// }

newWall({
  startX: 1,
  startY: 9,
  length: 15,
  direction: 'H'
})


//W
newWall({
  startX: 1,
  startY: 2,
  length: 6,
  direction: 'V'
})
newWall({
  startX: 3,
  startY: 5,
  length: 3,
  direction: 'V'
})
newWall({
  startX: 5,
  startY: 2,
  length: 6,
  direction: 'V'
})
newWall({
  startX: 1,
  startY: 7,
  length: 5,
  direction: 'H'
})
//I
newWall({
  startX: 7,
  startY: 2,
  length: 6,
  direction: 'V'
})
//N
newWall({
  startX: 9,
  startY: 2,
  length: 6,
  direction: 'V'
})
newWall({
  startX: 14,
  startY: 2,
  length: 6,
  direction: 'V'
})

newWall({
  startX: 9,
  startY: 2,
  length: 6,
  direction: 'D'
})

end.player = {name:'Steve', x:5, y:10}
end.nut = {x:6, y:10}
end.goal = {x:14, y:10}



module.exports = JSON.stringify(end)
