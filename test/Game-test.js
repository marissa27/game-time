var assert = require('chai').assert
var Game = require('../lib/Game.js');
var Player = require('../lib/Player.js')
var genGrid = require('../lib/grid.js');

function returnFake(x,y) {
  var game = new Game()
  game.grid = genGrid()
  var s = new Player('Steve', x, y, game)
  s.game.grid[s.x][s.y] = s
  return game
}

// Game:
//
// - can load grid(aka: levels)
// - stores current state: current level, lives, time
// - can reset level
// - can trigger game-over state if lives hit 0
// - can render grid/level onto the canvas
// - can trigger the Squirrels death (suicide)

describe('Game Object Stuff', function () {

  it('game is an object', function () {
    game = returnFake(0,0)
    assert.isObject(game);
  });

  it('game saves the current level and lives', function() {
    game = returnFake(0,0)
    assert.equal(game.currentLevel, 0)
    assert.equal(game.lives, 3)
  })

  it('has a reset function. Reset reloads the level and restarts the timer', function() {
    game = returnFake(0,0)
    assert.isFunction(game.reset)
  })

  it('has a restart function. Restart goes back to level 1 and reset lives to 0', function() {
    game = returnFake(0,0)
    assert.isFunction(game.restart)
    assert.equal(game.currentLevel, 0)
    assert.equal(game.lives, 3)
  })

  it('can increment the level', function() {
    game = returnFake(0,0)
    assert.isFunction(game.nextLevel)
    game.nextLevel()
    assert.equal(game.currentLevel, 1)
  })

  it('can decrement the lives', function() {
    game = returnFake(0,0)
    assert.isFunction(game.loseLife)
    game.loseLife()
    assert.equal(game.lives, 2)
  })

  it('change to game-over when lives = 0. game.currentLevel = "game-over"', function() {
    game = returnFake(0,0)
    game.lives = 1
    assert.equal(game.lives, 1)
    game.loseLife()
    assert.equal(game.lives, 'game-over')
  })

  it('can return the current Player object', function() {
    game = returnFake(0,0)
    assert.equal(game.player.name, 'Steve')
  })

  it('manage the grid level')

  it('has a function to load a level/grid')

  it('should keep a timer', function () {
    game = new Game()
    assert.equal(game.timer, {})
  })
});
