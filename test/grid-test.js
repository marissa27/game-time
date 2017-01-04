var assert = require('chai').assert
var genGrid = require('../lib/grid.js');

describe('grid stuff', function () {
  it('generates a 15 by 10 grid by default', function () {
    grid = genGrid()
    console.log(grid);
    //grid[x][y]
    assert.equal(grid.length, 15)
    assert.equal(grid[0].length, 10)
  })
  

})
