var assert = require('chai').assert
var Player = require('../lib/Player.js')



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
    s = new Player('Steve', 3, 4)
      s.moveRight()
      assert.equal(s.x, 4)
  })

  it('can move left', function () {
    s = new Player('Steve', 3, 4)
      s.moveLeft()
      assert.equal(s.x, 2)
  })

  it('can move up', function () {
    s = new Player('Steve', 3, 4)
      s.moveUp()
      assert.equal(s.y, 5)
  })

  it('can move down', function () {
    s = new Player('Steve', 3, 4)
      s.moveDown()
      assert.equal(s.y, 3)
  })



  it('')
})
