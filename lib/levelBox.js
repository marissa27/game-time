var end = require('./levels/end')
var level1 = require('./levels/level1')
var level2 = require('./levels/level2')
var level3 = require('./levels/level3')
var level4 = require('./levels/level4')


var levelBox = {
  1:level1,
  2:level2,
  3:level3,
  4:level4,
  5:end
}


module.exports = levelBox
