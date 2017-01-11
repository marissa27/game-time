var assert = require('chai').assert
var genGrid = require('../lib/grid.js');

describe('grid stuff', function () {
  it('generates a 15 by 10 grid by default', function () {
    grid = genGrid()
    assert.equal(grid.length, 15)
    assert.equal(grid[0].length, 10)
  })
  
  it('accepts an x and y and returns a grid', function () {
    grid = genGrid(5,7)
    assert.equal(grid.length, 5)
    assert.equal(grid[0].length, 7)
  })
})
