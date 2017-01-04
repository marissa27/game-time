function genGrid (x, y) {
  var grid = []
  var column = []
  for (var i = 0; i < y; i++) {
    column.push(emptyGridObject)
  }
  for (var i = 0; i < x; i++) {
    grid.push(column)
  }
  return grid
}

module.exports = genGrid
