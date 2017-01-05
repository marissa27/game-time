var assert = require('chai').assert
var Player = require('../lib/Player.js')
var Game = require('../lib/Game.js');
var genGrid = require('../lib/grid.js');

function returnFake(x,y) {
//NOTE this version returns the player object, NOT the game object. Use s.game instead
  var game = new Game()
  game.grid = genGrid()
  game.player = new Player('Steve', x, y, game)
  game.grid[game.player.x][game.player.y] = game.player
  return game.player
}

describe('Player Object Stuff', function () {
  it('Player is an object', function () {
    squirrel = new Player()
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
    s.game.nextLevel()
    assert.equal(s.game.currentLevel, 1)
    s.game.player.game.player.moveRight()
    var g = s.game
    g.player.moveRight()
    assert.equal(s.x, 5)
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

  it('will clear itself from the level grid after it moves', function () {
    var s = returnFake(3,4)
    s.moveDown()
    assert.equal(s.game.grid[3][5].name, 'Steve')
    assert.equal(s.game.grid[3][4].name, 'empty')
  })

  it('will not move if obstacle in the way', function () {
    var s = returnFake(3,4)
    s.game.grid[3][3] = {name: 'wall'}
    s.game.grid[4][4] = {name: 'wall'}
    s.moveUp()
    assert.equal(s.y, 4)
    s.moveRight()
    assert.equal(s.x, 3)
  })

  it('will tigger a loss of live when it colides with an enemy', function () {
    var s = returnFake(3,4)
    s.game.grid[4][4] = {name:'angry cat', hostile:true}
    s.moveRight()
    assert.equal(s.game.lives, 2)
  })

  it('has a way to die', function () {
    var s = returnFake(3,4)
    //trigger a game state change to update lives, reset level, etc
  })
})
