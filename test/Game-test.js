var assert = require('chai').assert
var Game = require('../lib/Game.js');

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
    game = new Game()
    assert.isObject(game);
  });

  it('game saves the current level and lives', function() {
    game = new Game()
    assert.equal(game.currentLevel, 0)
    assert.equal(game.lives, 3)
  })

  it('has a reset function. Reset reloads the level and restarts the timer', function() {
    game = new Game()
    assert.isFunction(game.reset)
  })

  it('has a restart function. Restart goes back to level 1 and reset lives to 0', function() {
    game = new Game()
    assert.isFunction(game.restart)
    assert.equal(game.currentLevel, 0)
    assert.equal(game.lives, 3)
  })

  it('has a function to load a level/grid')


  it('can increment the level', function() {
    game = new Game()
    assert.isFunction(game.nextLevel)
    game.nextLevel()
    assert.equal(game.currentLevel, 1)
  })

  it('can decrement the lives', function() {
    game = new Game()
    assert.isFunction(game.loseLife)
    game.loseLife()
    assert.equal(game.lives, 2)
  })

  it('change to game-over when lives = 0. game.currentLevel = "game-over"', function() {
    game = new Game()
    game.lives = 1
    assert.equal(game.lives, 1)
    game.loseLife()
    assert.equal(game.lives, 'game-over')
  })

  it('manage the grid level')

  it('should keep a timer', function () {
    game = new Game()
    assert.equal(game.timer, {})
  })
});
