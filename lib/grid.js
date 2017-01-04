function genGrid (x, y) {
  var grid = [];
  var column = [];
  for (var i = 0; i < 10; i++) {
    column.push(emptyGridObject)
  }
  for (var i = 0; i < 15; i++) {
    grid.push(column)
  }
  return grid
}

module.exports = genGrid
