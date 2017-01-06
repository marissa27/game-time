function genGrid (x, y) {
  var x = x || 15
  var y = y || 10
  var grid = []
  var column = []
  for (var i = 0; i < y; i++) {
    column.push({name:'empty'})
  }
  for (var i = 0; i < x; i++) {
    grid.push(column.slice())
  }
  return grid
}


module.exports = genGrid
