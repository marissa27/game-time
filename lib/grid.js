function genGrid (x, y) {
  var grid = []
  var column = []
  for (var i = 0; i < 10; i++) {
    column.push('x')
  }
  for (var i = 0; i < 15; i++) {
    grid.push(column.slice())
  }
  return grid
}


module.exports = genGrid