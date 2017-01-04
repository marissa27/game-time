var assert = require('chai').assert
var Player = require('../lib/Player.js')
var Game = require('../lib/Game.js');
var genGrid = require('../lib/grid.js');


describe('Player Object Stuff', function () {
  it('Player is an object', function () {
    squirrel = new Player()
    assert.isObject(squirrel);
  })

  it('has a name', function () {
    s = new Player('Steve')
    assert.equal(s.name, 'Steve')
  })

  it('knows current x/y position in the level', function () {
    s = new Player('Steve', 3, 4)
    assert.equal(s.x, 3)
    assert.equal(s.y, 4)
  })

  it('knows what level it is in and be able to message it', function () {
    var game = {currentLevel:1}
    s = new Player('Steve', 3, 4, game)
    assert.equal(s.game.currentLevel, 1)
  })

  it('can move right', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    s.moveRight()
    assert.equal(s.x, 4)
  })

  it('can move left', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    s.moveLeft()
    assert.equal(s.x, 2)
  })

  it('can move up', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    s.moveUp()
    assert.equal(s.y, 3)
  })

  it('can move down', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    s.moveDown()
    assert.equal(s.y, 5)
  })

  it('can update its position in the level grid when it moves', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    game.grid[s.x][s.y] = s
    s.moveDown()
    assert.equal(game.grid[s.x][s.y].y, s.y)
    s.moveRight()
    assert.equal(game.grid[s.x][s.y].x, s.x)
  })

  it('should not move if obstacle in the way', function () {
    game = new Game()
    game.grid = genGrid()
    s = new Player('Steve', 3, 4, game)
    game.grid[3][4] = s
    game.grid[3][5] = {solid:true}
    game.grid[4][4] = {solid:true}
    s.moveDown()
    assert.equal(s.y, 4)
    s.moveRight()
    assert.equal(s.x, 3)
  })
})
