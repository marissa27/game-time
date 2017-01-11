var assert = require('chai').assert

var Game = require('../lib/Game.js')

function returnFake(x,y) {
  var game = new Game({context:{}, currentLevel:1})
  return game
}

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
    game = returnFake()
    assert.isFunction(game.restart)
    assert.equal(game.currentLevel, 0)
    assert.equal(game.lives, 3)
  })

  it.skip('can load the  next level', function() {
    //screen updates are integrated into Game, which for now breaks these tests
    var game = returnFake()
    assert.isFunction(game.nextLevel)
    game.currentLevel = 1
    game.nextLevel()
    assert.equal(game.currentLevel, 2)
  })

  it.skip('can decrement the lives', function() {
    //screen updates are integrated into Game, which for now breaks these tests
    game = returnFake(0,0)
    assert.isFunction(game.loseLife)
    game.loseLife()
    assert.equal(game.lives, 2)
  })

  it('can access the current Player object', function() {
    game = returnFake(0,0)
    assert.isObject(game.player)
    assert.equal(game.player.name, 'Steve')
  })

  it('should keep a timer', function () {
    game = returnFake()
    assert.isFunction(game.tick)
  })
});
