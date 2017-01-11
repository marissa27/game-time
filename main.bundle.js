/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var Game = __webpack_require__(1);
	var wallImage = new Image();
	wallImage.src = "lib/images/tree.png";

	var pauseButton = document.getElementById('pause');
	var listen = document.getElementById('body');

	window.onload = function () {
	  setTimeout(function () {
	    pauseButton.click();
	    canvas.focus();
	  }, 10);
	};

	var game = new Game({ canvas: canvas, context: context, pause: pauseButton });
	game.run();

	function loop() {
	  var timer = document.querySelector('.timer-num').innerText = "TIMER: " + game.time;
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  game.walls.forEach(function (wall) {
	    context.drawImage(wallImage, wall.x * 50, wall.y * 50);
	  });
	  game.enemies.forEach(function (enemy) {
	    enemy.move();
	    enemy.draw();
	  });
	  game.player.draw();
	  game.nut.draw();
	  game.goal.draw();
	  if (game.playOn) {
	    requestAnimationFrame(loop);
	  }
	}
	requestAnimationFrame(loop);

	var myBox = game.player;
	listen.onkeydown = function (e) {
	  if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
	    if (game.playOn) {
	      e.preventDefault();
	      switch (e.key) {
	        case 'ArrowRight':
	          if (myBox.x < canvas.width / 50) {
	            myBox.moveRight();
	          }
	          break;
	        case 'ArrowLeft':
	          if (myBox.x > 0) {
	            myBox.moveLeft();
	          }
	          break;
	        case 'ArrowUp':
	          if (myBox.y > 0) {
	            myBox.moveUp();
	          }
	          break;
	        case 'ArrowDown':
	          if (myBox.y < canvas.height / 50) {
	            myBox.moveDown();
	          }
	          break;
	        case ' ':
	          pauseButton.click();
	          break;
	      }
	    } else {
	      pauseButton.click();
	    }
	  }
	};

	var resetListen = document.getElementById('reset');
	resetListen.onclick = function () {
	  game.loseLife();
	};

	pauseButton.onclick = function () {
	  if (!game.playOn) {
	    requestAnimationFrame(loop);
	  }
	  game.playOn = !game.playOn;
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Nut = __webpack_require__(3);
	var Enemy = __webpack_require__(4);
	var Goal = __webpack_require__(5);
	var levelBox = __webpack_require__(6);

	function Game(options) {
	  this.context = options.context;
	  this.canvas = options.canvas;
	  this.pauseButton = options.pause;
	  this.time = options.time || 60;
	  this.lives = 3;
	  this.grid = [[]];
	  this.levelJSON = '';
	  this.levelBox = levelBox;
	  this.currentLevel = 0;
	  this.player = new Player({ game: this, context: this.context });
	  this.goal = new Goal({ game: this, context: this.context });
	  this.nut = new Nut({ game: this, context: this.context });
	  this.enemies = [];
	  this.walls = [];
	  this.playOn = true;
	}

	Game.prototype.pause = function () {
	  this.pauseButton.click();
	};

	Game.prototype.run = function () {
	  this.tick();
	  this.load(this.levelBox[1]);
	};

	Game.prototype.load = function (levelJSON) {
	  this.levelJSON = levelJSON;
	  origin = JSON.parse(this.levelJSON);
	  this.currentLevel = origin.currentLevel;
	  this.time = origin.time || 10000;
	  this.grid = origin.grid;
	  this.walls = origin.walls;

	  var level = document.querySelector('.level-num').innerText = "LEVEL: " + this.currentLevel;

	  this.player.x = origin.player.x;
	  this.player.y = origin.player.y;

	  this.nut.x = origin.nut.x;
	  this.nut.y = origin.nut.y;

	  this.goal.x = origin.goal.x;
	  this.goal.y = origin.goal.y;

	  this.enemies = [];
	  for (i = 0; i < origin.enemies.length; i++) {
	    this.enemies[i] = new Enemy(origin.enemies[i]);
	    this.enemies[i].context = this.context;
	    this.enemies[i].game = this;
	  }
	  this.refreshGrid(this);
	};

	Game.prototype.reset = function () {
	  var origin = JSON.parse(this.levelJSON);
	  var clear = [];
	  if (this.player.x != origin.player.x || this.player.y != origin.player.y) {
	    clear.push({ x: this.player.x, y: this.player.y });
	    this.player.x = origin.player.x;
	    this.player.y = origin.player.y;
	  }
	  if (this.nut.x != origin.nut.x || this.nut.y != origin.nut.y) {
	    clear.push({ x: this.nut.x, y: this.nut.y });
	    this.nut.x = origin.nut.x;
	    this.nut.y = origin.nut.y;
	  }
	  this.refreshGrid(this);
	  for (i = 0; i < clear.length; i++) {
	    this.grid[clear[i].x][clear[i].y] = { name: 'empty' };
	  }
	  this.time = origin.time;
	  this.pause();
	};

	Game.prototype.restart = function () {
	  this.lives = 3;
	  this.load(this.levelBox[1]);
	  this.pause();
	};

	Game.prototype.nextLevel = function () {
	  this.load(this.levelBox[this.currentLevel + 1]);
	  this.pause();
	};

	Game.prototype.loseLife = function () {
	  this.lives--;
	  var lives = document.querySelector('.lives-num').innerText = "LIVES " + this.lives;
	  if (this.lives <= 0) {
	    this.restart();
	  } else {
	    this.reset();
	  }
	};

	Game.prototype.refreshGrid = function (game) {
	  var lives = document.querySelector('.lives-num').innerText = "LIVES: " + this.lives;
	  game.walls.forEach(function (wall) {
	    game.grid[wall.x][wall.y] = wall;
	  });
	  game.enemies.forEach(function (enemy) {
	    game.grid[enemy.x][enemy.y] = enemy;
	  });
	  game.grid[game.player.x][game.player.y] = game.player;
	  game.grid[game.nut.x][game.nut.y] = game.nut;
	  game.grid[game.goal.x][game.goal.y] = game.goal;
	};

	Game.prototype.tick = function () {
	  var callbackBind = this.tick.bind(this);
	  if (this.playOn) {
	    this.time--;
	    if (this.time <= 0) {
	      this.time = JSON.parse(this.levelJSON).time;
	      this.loseLife();
	    }
	  }
	  window.setTimeout(callbackBind, 1000);
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Player(options) {
	  this.name = options.name || "Steve";
	  this.x = options.x;
	  this.y = options.y;
	  this.game = options.game;
	  this.context = options.context;
	  this.image = new Image();
	  this.image.src = "lib/images/steve-sprite-l-8.png";
	  this.frame = 1;
	}

	Player.prototype.draw = function () {
	  this.context.drawImage(this.image, this.frame * 50, 0, 50, 50, this.x * 50, this.y * 50, 50, 50);
	  return this;
	};

	Player.prototype.next = function (direction) {
	  switch (direction) {
	    case 'up':
	      return this.game.grid[this.x][this.y - 1];
	      break;
	    case 'down':
	      return this.game.grid[this.x][this.y + 1];
	      break;
	    case 'left':
	      return this.game.grid[this.x - 1][this.y];
	      break;
	    case 'right':
	      return this.game.grid[this.x + 1][this.y];
	      break;
	  }
	};

	Player.prototype.move = function (dir) {
	  if (this.frame === 3) {
	    this.frame = 0;
	  } else {
	    this.frame++;
	  }
	  var target = this.next(dir);
	  if (target.hostile) {
	    this.game.loseLife();
	  }
	  if (target.name === 'Nut') {
	    nutTarget = target.next(dir);
	    if (nutTarget.hostile) {
	      this.game.reset();
	    }
	    if (nutTarget.name === 'winner') {
	      this.game.nextLevel();
	    }
	    if (!nutTarget.solid) {
	      this.game.grid[target.x][target.y] = { name: 'empty' };
	      switch (dir) {
	        case 'left':
	          target.x--;
	          break;
	        case 'right':
	          target.x++;
	          break;
	        case 'up':
	          target.y--;
	          break;
	        case 'down':
	          target.y++;
	          break;
	      }
	      this.game.grid[target.x][target.y] = target;
	      target = this.next(dir);
	    }
	  }
	  if (!target.solid) {
	    this.game.grid[this.x][this.y] = { name: 'empty' };
	    switch (dir) {
	      case 'left':
	        this.x--;
	        break;
	      case 'right':
	        this.x++;
	        break;
	      case 'up':
	        this.y--;
	        break;
	      case 'down':
	        this.y++;
	        break;
	    }
	    this.game.grid[this.x][this.y] = this;
	  }
	  return this;
	};

	Player.prototype.moveLeft = function () {
	  this.image.src = "lib/images/steve-sprite-l-8.png";
	  this.move('left');
	  return this;
	};

	Player.prototype.moveRight = function () {
	  this.image.src = "lib/images/steve-sprite-r-8.png";
	  this.move('right');
	  return this;
	};

	Player.prototype.moveUp = function () {
	  this.move('up');
	  return this;
	};

	Player.prototype.moveDown = function () {
	  this.move('down');
	  return this;
	};

	module.exports = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Nut(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.name = options.name || 'Nut';
	  this.game = options.game;
	  this.context = options.context;
	  this.solid = true;
	  this.goal = options.goal;
	  this.image = new Image();
	  this.image.src = "lib/images/nut-sprite.png";
	  this.frame = 1;
	}

	Nut.prototype.draw = function () {
	  this.context.drawImage(this.image, this.frame * 50, 0, 50, 50, this.x * 50, this.y * 50, 50, 50);
	  return this;
	};

	Nut.prototype.next = function (direction) {
	  if (this.frame === 7) {
	    this.frame = 0;
	  } else {
	    this.frame++;
	  }
	  switch (direction) {
	    case 'up':
	      return this.game.grid[this.x][this.y - 1];
	      break;
	    case 'down':
	      return this.game.grid[this.x][this.y + 1];
	      break;
	    case 'left':
	      return this.game.grid[this.x - 1][this.y];
	      break;
	    case 'right':
	      return this.game.grid[this.x + 1][this.y];
	      break;
	  }
	};

	module.exports = Nut;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Enemy(options) {
	  this.name = options.name;
	  this.solid = true;
	  this.hostile = true;
	  this.x = options.x;
	  this.y = options.y;
	  this.context = options.context;
	  this.speed = options.speed || .1;
	  this.game = options.game;
	  this.direction = 'down';
	  this.rangeTop = options.rangeTop || 2;
	  this.rangeBottom = options.rangeBottom || 8;
	  this.image = new Image();
	  this.image.src = "lib/images/nutcracker.png";
	}

	Enemy.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x * 50, this.y * 50);
	};

	Enemy.prototype.move = function () {
	  if (Math.floor(this.y) === this.rangeTop - 1) {
	    this.speed = -this.speed;
	    this.direction = 'down';
	  }
	  if (Math.floor(this.y) === this.rangeBottom) {
	    this.speed = -this.speed;
	    this.direction = 'up';
	  }
	  var target = this.next(this.direction);
	  if (target.name === "Steve") {
	    console.log('kill steve');
	    this.game.loseLife();
	  } else if (target.name === "Nut") {
	    this.game.reset();
	  }
	  this.game.grid[Math.round(this.x)][Math.round(this.y)] = { name: 'empty' };
	  this.y = this.y + this.speed;
	  this.game.grid[Math.round(this.x)][Math.round(this.y)] = this;
	};

	Enemy.prototype.next = function (direction) {
	  switch (direction) {
	    case 'up':
	      return this.game.grid[Math.round(this.x)][Math.round(this.y) - 1];
	      break;
	    case 'down':
	      return this.game.grid[Math.round(this.x)][Math.round(this.y) + 1];
	      break;
	    case 'left':
	      return this.game.grid[Math.round(this.x) - 1][Math.round(this.y)];
	      break;
	    case 'right':
	      return this.game.grid[Math.round(this.x) + 1][Math.round(this.y)];
	      break;
	  }
	};

	module.exports = Enemy;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Goal(options) {
	  this.solid = false;
	  this.hostile = false;
	  this.x = options.x;
	  this.y = options.y;
	  this.context = options.context;
	  this.game = options.game;
	  this.name = 'winner';
	  this.image = new Image();
	  this.solid = true;
	  this.image.src = "lib/images/target.png";
	}

	Goal.prototype.draw = function () {
	  this.context.drawImage(this.image, this.x * 50, this.y * 50);
	};

	module.exports = Goal;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var end = __webpack_require__(7);
	var level1 = __webpack_require__(9);
	var level2 = __webpack_require__(10);
	var level3 = __webpack_require__(11);
	var level4 = __webpack_require__(12);
	var level5 = __webpack_require__(13);

	var levelBox = {
	  1: level1,
	  2: level2,
	  3: level3,
	  4: level4,
	  5: level5,
	  6: end
	};

	module.exports = levelBox;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	var maxX = 16;
	var maxY = 12;

	var end = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 0
	};

	function newWall(options) {
	  var x = options.startX || 1;
	  var y = options.startY || 1;
	  var length = options.length || 5;
	  var direction = options.direction || 'H'; //'H' 'V' 'D'?
	  switch (direction) {
	    case 'H':
	      for (var i = 0; i < length; i++) {
	        end.walls.push({ name: 'wall', solid: true, x: i + x, y: y });
	      }
	      break;
	    case 'V':
	      for (var i = 0; i < length; i++) {
	        end.walls.push({ name: 'wall', solid: true, x: x, y: i + y });
	      }
	      break;
	    case 'D':
	      for (var i = 0; i < length; i++) {
	        end.walls.push({ name: 'wall', solid: true, x: i + x, y: i + y });
	      }
	      break;
	  }
	}

	end.walls.push({ name: 'wall', solid: true, x: 0, y: 10 });
	end.walls.push({ name: 'wall', solid: true, x: 0, y: 9 });

	for (var i = 0; i < maxX; i++) {
	  end.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  end.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	// for(var i = 0; i < maxY; i++) {
	//   end.walls.push({name:'wall', solid:true, x:0, y:i})
	//   end.walls.push({name:'wall', solid:true, x:maxX-1, y:i})
	// }

	newWall({
	  startX: 1,
	  startY: 9,
	  length: 15,
	  direction: 'H'
	});

	//W
	newWall({
	  startX: 1,
	  startY: 2,
	  length: 6,
	  direction: 'V'
	});
	newWall({
	  startX: 3,
	  startY: 5,
	  length: 3,
	  direction: 'V'
	});
	newWall({
	  startX: 5,
	  startY: 2,
	  length: 6,
	  direction: 'V'
	});
	newWall({
	  startX: 1,
	  startY: 7,
	  length: 5,
	  direction: 'H'
	});
	//I
	newWall({
	  startX: 7,
	  startY: 2,
	  length: 6,
	  direction: 'V'
	});
	//N
	newWall({
	  startX: 9,
	  startY: 2,
	  length: 6,
	  direction: 'V'
	});
	newWall({
	  startX: 14,
	  startY: 2,
	  length: 6,
	  direction: 'V'
	});

	newWall({
	  startX: 9,
	  startY: 2,
	  length: 6,
	  direction: 'D'
	});

	end.player = { name: 'Steve', x: 5, y: 10 };
	end.nut = { x: 6, y: 10 };
	end.goal = { x: 14, y: 10 };

	module.exports = JSON.stringify(end);

/***/ },
/* 8 */
/***/ function(module, exports) {

	function genGrid(x, y) {
	  var x = x || 15;
	  var y = y || 10;
	  var grid = [];
	  var column = [];
	  for (var i = 0; i < y; i++) {
	    column.push({ name: 'empty' });
	  }
	  for (var i = 0; i < x; i++) {
	    grid.push(column.slice());
	  }
	  return grid;
	}

	module.exports = genGrid;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	var maxX = 16;
	var maxY = 12;

	var level = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 1,
	  time: 60
	};

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < maxY; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 0, y: i });
	  level.walls.push({ name: 'wall', solid: true, x: maxX - 1, y: i });
	}

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < 11; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 5 });
	}

	level.player = { name: 'Steve', x: 5, y: 3 };
	level.nut = { x: 7, y: 3 };
	level.goal = { x: 1, y: 10 };

	cat1 = { name: 'angry cat', x: 12, y: 2 };
	level.enemies.push(cat1);

	module.exports = JSON.stringify(level);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	var maxX = 16;
	var maxY = 12;

	var level = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 2,
	  time: 60
	};

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < maxY; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 0, y: i });
	  level.walls.push({ name: 'wall', solid: true, x: maxX - 1, y: i });
	}
	for (i = 0; i < 6; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 4, y: i + 5 });
	}
	for (i = 0; i < 5; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 9, y: i + 3 });
	}
	level.walls.push({ name: 'wall', solid: true, x: 7, y: 1 });
	level.walls.push({ name: 'wall', solid: true, x: 6, y: 1 });

	for (i = 0; i < 5; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 5 });
	}

	for (i = 0; i < 7; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i + 8, y: 5 });
	}

	level.player = { name: 'Steve', x: 2, y: 3 };
	level.nut = { x: 13, y: 3 };
	level.goal = { x: 13, y: 9 };

	level.enemies.push({ name: 'angry cat', x: 6, y: 2, rangeTop: 2, rangeBottom: 10 });
	// level.enemies.push({name:'angry dog', x:10, y:3, rangeTop:1, rangeBottom:4, speed:.05})
	// level.enemies.push({name:'angry bug', x:10, y:7, rangeTop:6, rangeBottom:10, speed:.06})
	// level.enemies.push({name:'angry dog', x:2, y:8, rangeTop:5, rangeBottom:10, speed:.3})

	module.exports = JSON.stringify(level);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	var maxX = 16;
	var maxY = 12;

	var level = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 3,
	  time: 60
	};

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < maxY; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 0, y: i });
	  level.walls.push({ name: 'wall', solid: true, x: maxX - 1, y: i });
	}

	for (i = 0; i < 7; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 4, y: i });
	}
	for (i = 0; i < 7; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i + 8, y: 5 });
	}

	level.player = { name: 'Steve', x: 2, y: 3 };
	level.nut = { x: 13, y: 4 };
	level.goal = { x: 13, y: 9 };

	level.enemies.push({ name: 'angry cat', x: 6, y: 2, rangeTop: 1, rangeBottom: 10 });
	level.enemies.push({ name: 'angry dog', x: 10, y: 3, rangeTop: 1, rangeBottom: 4, speed: .05 });
	level.enemies.push({ name: 'angry bug', x: 10, y: 7, rangeTop: 6, rangeBottom: 10, speed: .06 });
	level.enemies.push({ name: 'angry dog', x: 2, y: 8, rangeTop: 5, rangeBottom: 10, speed: .3 });

	module.exports = JSON.stringify(level);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	function newWall(options) {
	  var x = options.startX || 1;
	  var y = options.startY || 1;
	  var length = options.length || 5;
	  var direction = options.direction || 'H'; //'H' 'V' 'D'?
	  switch (direction) {
	    case 'H':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: i + x, y: y });
	      }
	      break;
	    case 'V':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: x, y: i + y });
	      }
	      break;
	    case 'D':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: i + x, y: i + y });
	      }
	      break;
	  }
	}

	var maxX = 16;
	var maxY = 12;

	var level = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 4,
	  time: 60
	};

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < maxY; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 0, y: i });
	  level.walls.push({ name: 'wall', solid: true, x: maxX - 1, y: i });
	}

	newWall({
	  startX: 1,
	  startY: 1,
	  length: 2,
	  direction: 'V'
	});

	newWall({
	  startX: 1,
	  startY: 2,
	  length: 2,
	  direction: 'V'
	});

	newWall({
	  startX: 3,
	  startY: 9,
	  length: 3,
	  direction: 'H'
	});

	newWall({
	  startX: 7,
	  startY: 3,
	  length: 8,
	  direction: 'V'
	});

	newWall({
	  startX: 7,
	  startY: 1,
	  length: 3,
	  direction: 'H'
	});

	newWall({
	  startX: 1,
	  startY: 5,
	  length: 3,
	  direction: 'H'
	});

	newWall({
	  startX: 14,
	  startY: 4,
	  length: 8,
	  direction: 'V'
	});

	newWall({
	  startX: 14,
	  startY: 1,
	  length: 2,
	  direction: 'V'
	});

	newWall({
	  startX: 3,
	  startY: 1,
	  length: 2,
	  direction: 'V'
	});

	level.walls.push({ name: 'wall', solid: true, x: 7, y: 10 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 10 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 9 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 7 });

	level.player = { name: 'Steve', x: 14, y: 3 };
	level.nut = { x: 9, y: 2 };
	level.goal = { x: 2, y: 10 };

	level.enemies.push({ name: 'Near Start', x: 6, y: 6, rangeTop: 3, rangeBottom: 10, speed: .02 });
	level.enemies.push({ name: 'Nutty McNutface', x: 8, y: 4, rangeTop: 3, rangeBottom: 10, speed: .05 });
	level.enemies.push({ name: 'Nutty McNutface', x: 10, y: 2, rangeTop: 1, rangeBottom: 9, speed: .03 });
	level.enemies.push({ name: 'Nutty McNutface', x: 12, y: 6, rangeTop: 1, rangeBottom: 9, speed: .03 });
	level.enemies.push({ name: 'Nutty McNutface', x: 13, y: 6, rangeTop: 1, rangeBottom: 9, speed: .06 });

	module.exports = JSON.stringify(level);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var genGrid = __webpack_require__(8);

	function newWall(options) {
	  var x = options.startX || 1;
	  var y = options.startY || 1;
	  var length = options.length || 5;
	  var direction = options.direction || 'H'; //'H' 'V' 'D'?
	  switch (direction) {
	    case 'H':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: i + x, y: y });
	      }
	      break;
	    case 'V':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: x, y: i + y });
	      }
	      break;
	    case 'D':
	      for (var i = 0; i < length; i++) {
	        level.walls.push({ name: 'wall', solid: true, x: i + x, y: i + y });
	      }
	      break;
	  }
	}

	var maxX = 16;
	var maxY = 12;

	var level = {
	  grid: genGrid(maxX, maxY),
	  walls: [],
	  canvas: {},
	  context: {},
	  enemies: [],
	  player: { name: 'Steve' },
	  goal: {},
	  currentLevel: 5,
	  time: 60
	};

	for (var i = 0; i < maxX; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: i, y: 0 });
	  level.walls.push({ name: 'wall', solid: true, x: i, y: maxY - 1 });
	}
	for (var i = 0; i < maxY; i++) {
	  level.walls.push({ name: 'wall', solid: true, x: 0, y: i });
	  level.walls.push({ name: 'wall', solid: true, x: maxX - 1, y: i });
	}

	newWall({
	  startX: 2,
	  startY: 4,
	  length: 5,
	  direction: 'H'
	});

	newWall({
	  startX: 1,
	  startY: 6,
	  length: 5,
	  direction: 'H'
	});

	newWall({
	  startX: 8,
	  startY: 6,
	  length: 5,
	  direction: 'H'
	});

	newWall({
	  startX: 7,
	  startY: 6,
	  length: 3,
	  direction: 'V'
	});

	newWall({
	  startX: 7,
	  startY: 2,
	  length: 3,
	  direction: 'V'
	});

	newWall({
	  startX: 8,
	  startY: 2,
	  length: 4,
	  direction: 'V'
	});

	newWall({
	  startX: 11,
	  startY: 3,
	  length: 4,
	  direction: 'H'
	});

	newWall({
	  startX: 12,
	  startY: 8,
	  length: 2,
	  direction: 'V'
	});

	level.walls.push({ name: 'wall', solid: true, x: 7, y: 10 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 10 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 9 });
	level.walls.push({ name: 'wall', solid: true, x: 4, y: 7 });

	level.player = { name: 'Steve', x: 7, y: 5 };
	level.nut = { x: 2, y: 9 };
	level.goal = { x: 1, y: 1 };

	level.enemies.push({ name: 'Near Start', x: 6, y: 6, rangeTop: 5, rangeBottom: 10, speed: .02 });
	level.enemies.push({ name: 'Nutty McNutface', x: 9, y: 8, rangeTop: 7, rangeBottom: 10, speed: .02 });
	level.enemies.push({ name: 'Nutty McNutface', x: 10, y: 2, rangeTop: 1, rangeBottom: 5, speed: .02 });
	level.enemies.push({ name: 'Nutty McNutface', x: 5, y: 2, rangeTop: 1, rangeBottom: 3, speed: .02 });

	module.exports = JSON.stringify(level);

/***/ }
/******/ ]);