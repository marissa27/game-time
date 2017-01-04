var assert = require('chai').assert
var Player = require('../lib/Player.js')



describe('Player Object Stuff', function () {
  it('Player is an object', function () {
    squirrel = new Player()
    assert.isObject(squirrel);
  })

  it('should have a name', function () {
    s = new Player('Steve')
    assert.equal(s.name, 'Steve')
  })

  it('know current x/y position in the level', function () {
    s = new Player('Steve', 3, 4)
    assert.equal(s.x, 3)
    assert.equal(s.y, 4)
  })

  it('should know what level it is in and be able to message it', function () {
    var game = {currentLevel:1}
    s = new Player('Steve', 3, 4, game)
    assert.equal(s.game.currentLevel, 1)
  })

  it('Move up, down, left right', function () {
      s = new Player(4,5)
      s.moveLeft()
      assert.equal(s.x, 3)
  })

  it('')
})
