var assert = require('chai').assert
var Player = require('../lib/Player.js')


describe('Player Object Stuff', function () {
  it('Player is an object', function () {
    squirrel = new Player()
    assert.isObject(squirrel);
  })


  it('Move up, down, left right', function () {
      s = new Player(4,5)
      s.moveLeft()
      assert.equal(s.x, 3)
  })
})
