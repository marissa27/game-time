function Goal (options) {
  this.solid = false;
  this.hostile = false;
  this.x = options.x;
  this.y = options.y;
  this.context = options.context;
  this.game = options.game;
  this.name = 'winner';
  this.image = new Image();
  this.solid = true
  this.image.src = "lib/images/target.png"

}

Goal.prototype.draw = function () {
  this.context.drawImage(this.image, this.x*50, this.y*50);
};

module.exports = Goal;
