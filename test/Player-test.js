var assert = require('chai').assert
var Player = require('../lib/Player.js')
var Game = require('../lib/Game.js');
var genGrid = require('../lib/grid.js');
var goal = require('../lib/Goal.js')
var levelBox = require('../lib/levelBox.js')

function returnFake(x,y) {
  var game = new Game({context:{}, levelBox: levelBox})
  game.grid = genGrid()
  game.player = new Player({x: x, y: y, game: game})
  game.grid[game.player.x][game.player.y] = game.player
  return game.player
}

describe('Player Object Stuff', function () {
  it('Player is an object', function () {
    squirrel = returnFake(1,1)
    assert.isObject(squirrel);
  })

  it('has a name', function () {
    var s = returnFake(3,4)
    assert.equal(s.name, 'Steve')
  })

  it('knows current x/y position in the level', function () {
    var s = returnFake(3,4)
    assert.equal(s.x, 3)
    assert.equal(s.y, 4)
  })

  it('knows what level it is in and be able to message it', function () {
    var s = returnFake(3,4)
    assert.equal(s.game.currentLevel, 0)
    s.moveRight()
    assert.equal(s.x, 4)
  })

  it('can move right', function () {
    var s = returnFake(3,4)
    s.moveRight()
    assert.equal(s.x, 4)
  })

  it('can move left', function () {
    var s = returnFake(3,4)
    s.moveLeft()
    assert.equal(s.x, 2)
  })

  it('can move up', function () {
    var s = returnFake(3,4)
    s.moveUp()
    assert.equal(s.y, 3)
  })

  it('can move down', function () {
    var s = returnFake(3,4)
    s.moveDown()
    assert.equal(s.y, 5)
  })

  it('update position in the level grid when it moves Up', function () {
    var s = returnFake(3,4)
    s.moveUp()
    assert.equal(s.y, 3)
  })

  it('update position in the level grid when it moves Down', function () {
    var s = returnFake(3,4)
    s.moveDown()
    assert.equal(s.y, 5)
  })

  it('update position in the level grid when it moves Right', function () {
    var s = returnFake(3,4)
    s.moveRight()
    assert.equal(s.x, 4)
  })

  it('update position in the level grid when it moves Left', function () {
    var s = returnFake(3,4)
    s.moveLeft()
    assert.equal(s.x, 2)
  })

  it('will clear itself from the level grid after it moves down', function () {
    var s = returnFake(3,4)
    s.moveDown()
    assert.equal(s.game.grid[3][5].name, 'Steve')
    assert.equal(s.game.grid[3][4].name, 'empty')
  })

  it('will clear itself from the level grid after it moves up', function () {
    var s = returnFake(3,4)
    s.moveUp()
    assert.equal(s.game.grid[3][3].name, 'Steve')
    assert.equal(s.game.grid[3][4].name, 'empty')
  })

  it('will clear itself from the level grid after it moves left', function () {
    var s = returnFake(3,4)
    s.moveLeft()
    assert.equal(s.game.grid[2][4].name, 'Steve')
    assert.equal(s.game.grid[3][4].name, 'empty')
  })

  it('will clear itself from the level grid after it moves right', function () {
    var s = returnFake(3,4)
    s.moveRight()
    assert.equal(s.game.grid[4][4].name, 'Steve')
    assert.equal(s.game.grid[3][4].name, 'empty')
  })

  it('can move all over the place', function () {
    var s = returnFake(3,4)
    s.moveLeft()
    s.moveRight()
    s.moveUp()
    s.moveDown()
    s.moveRight()
    assert.equal(s.game.grid[3][4].name, 'empty')
    s.moveDown()
    s.moveDown()
    assert.equal(s.game.grid[4][4].name, 'empty')
    assert.equal(s.game.grid[4][5].name, 'empty')
    assert.equal(s.game.grid[4][6].name, 'Steve')
  })

  it('will not move if obstacle in the way', function () {
    var s = returnFake(2,2)
    s.game.grid[2][1] = {name: 'wall', solid: true}
    s.game.grid[2][3] = {name: 'wall', solid: true}
    s.game.grid[1][2] = {name: 'wall', solid: true}
    s.game.grid[3][2] = {name: 'wall', solid: true}
    s.moveUp()
    assert.equal(s.game.grid[2][2].name, 'Steve')
    s.moveRight()
    assert.equal(s.game.grid[2][2].name, 'Steve')
    s.moveLeft()
    assert.equal(s.game.grid[2][2].name, 'Steve')
    s.moveDown()
    assert.equal(s.game.grid[2][2].name, 'Steve')
  })
})
