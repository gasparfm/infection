/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!function() {\n\t\tclass Ball {\n\t\t\t\tconstructor(x, y, dx, dy, radius, weight, type, extra={}){\n\t\t\t\t\t\tthis.x = x;\n\t\t\t\t\t\tthis.y = y;\n\n\t\t\t\t\t\tthis.radius = radius;\n\t\t\t\t\t\tthis.weight = weight;\n\t\t\t\t\t\tthis.status = type;\n\t\t\t\t\t\tthis.viral_load = extra.viral_load || 0;\n\t\t\t\t\t\tlet initialvs = ( (type=='infected') || (type=='incubating') )?1:0;\n\t\t\t\t\t\tthis.virus_step = extra.virus_step || initialvs; // How much time do we have the virus. Step is a time unit\n\t\t\t\t\t\tthis.daysInfected = 0;\n\n\t\t\t\t\t\tthis.dx = dx;\n\t\t\t\t\t\tthis.dy = dy;\n\n\t\t\t\t\t\t// mass is that of a sphere as opposed to circle\n\t\t\t\t\t\t// it *does* make a difference in how realistic it looks\n\t\t\t\t\t\tthis.mass = this.radius * this.radius * this.radius;\n\t\t\t\t\t\tthis.color = this.getColor(this.status);\n\t\t\t\t};\n\n\t\t\t\tgetColor(type) {\n\t\t\t\t\t\tswitch (type) {\n\t\t\t\t\t\tcase 'healthy': return 'rgba(121, 162, 194, 1)';\n\t\t\t\t\t\tcase 'incubating': return 'rgba(65, 114, 217, 1)';\n\t\t\t\t\t\tcase 'infected' : return 'rgba(217, 65, 114, 1)';\n\t\t\t\t\t\tcase 'healed' : return 'rgba(114, 217, 65, 1)';\n\t\t\t\t\t\tcase 'dead' : return 'rgba(0,0,0,1)';\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn 'rgba(255, 255, 255, 1)';\n\t\t\t\t}\n\n\t\t\t\tviralStep(simulationData, stepTime) {\n\t\t\t\t\t\tif ( (this.status=='infected') || (this.status=='incubating') || (this.status=='dead') )\n\t\t\t\t\t\t\t\tthis.virus_step+=stepTime;\n\t\t\t\t\t\tif ( (this.status=='incubating') && (this.virus_step/Util.stepsPerDay>=simulationData.incubationDays) )\n\t\t\t\t\t\t\t\tthis.changeStatus('infected');\n\t\t\t\t\t\telse if (this.status=='infected') {\n\t\t\t\t\t\t\t\tlet daysInfected = Math.round(this.virus_step/Util.stepsPerDay);\n\t\t\t\t\t\t\t\tif (daysInfected>this.daysInfected) {\n\t\t\t\t\t\t\t\t\t\tif (daysInfected>=simulationData.healDays)\n\t\t\t\t\t\t\t\t\t\t\t\tthis.changeStatus('healed');\n\t\t\t\t\t\t\t\t\t\telse if (Util.random(0,100)<=this.viral_load*simulationData.deathProb)\n\t\t\t\t\t\t\t\t\t\t\t\tthis.changeStatus('dead');\n\t\t\t\t\t\t\t\t\t\tthis.daysInfected = daysInfected;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else if (this.status == 'dead') {\n\t\t\t\t\t\t\t\tif (Math.round(this.virus_step) % 10 == 0) {\n\t\t\t\t\t\t\t\t\t\tthis.virus_step++;\n\t\t\t\t\t\t\t\t\t\tlet incy = Math.abs(this.dy);\n\t\t\t\t\t\t\t\t\t\tlet incx = Math.abs(this.dx);\n\t\t\t\t\t\t\t\t\t\tif ( (incy > 0) || (incx > 0 ) ) {\n\t\t\t\t\t\t\t\t\t\t\t\tif (incy>0.2)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tincy = 0.2;\n\t\t\t\t\t\t\t\t\t\t\t\tif (incx>0.2)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tincx = 0.2;\n\n\t\t\t\t\t\t\t\t\t\t\t\tthis.dy+=(this.dy>0)?-incy:incy;\n\t\t\t\t\t\t\t\t\t\t\t\tthis.dx+=(this.dx>0)?-incx:incx;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tdebugDraw(ctx, color) {\n\t\t\t\t\t\tctx.beginPath();\n\t\t\t\t\t\tctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);\n\t\t\t\t\t\tctx.fillStyle = color;\n\t\t\t\t\t\tctx.fill();\n\t\t\t\t\t\tctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';\n\t\t\t\t\t\tctx.stroke();\n\t\t\t\t\t\tctx.closePath();\n\t\t\t\t}\n\n\t\t\t\tdraw(ctx) {\n\t\t\t\t\t\tthis.color = this.getColor(this.status);\n\t\t\t\t\t\tctx.beginPath();\n\t\t\t\t\t\tctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);\n\t\t\t\t\t\tctx.fillStyle = this.color;\n\t\t\t\t\t\tctx.fill();\n\t\t\t\t\t\tctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';\n\t\t\t\t\t\tctx.stroke();\n\t\t\t\t\t\tctx.closePath();\n\t\t\t\t};\n\n\t\t\t\ttouches(x, y, x1, y1) {\n\n\t\t\t\t\t\treturn ( ( (x>=(this.x-this.radius)) && (x<=(this.x+this.radius)) ) && ( (y>=(this.y-this.radius)) && (y<=(this.y+this.radius)) ) ||\n\t\t\t\t\t\t\t\t\t\t ( (x>=(this.x-this.radius)) && (x<=(this.x+this.radius)) ) && ( (y1>=(this.y-this.radius)) && (y1<=(this.y+this.radius)) ) ||\n\t\t\t\t\t\t\t\t\t\t ( (x1>=(this.x-this.radius)) && (x1<=(this.x+this.radius)) ) && ( (y>=(this.y-this.radius)) && (y<=(this.y+this.radius)) ) ||\n\t\t\t\t\t\t\t\t\t\t ( (x1>=(this.x-this.radius)) && (x1<=(this.x+this.radius)) ) && ( (y1>=(this.y-this.radius)) && (y1<=(this.y+this.radius)) ) );\n\t\t\t\t}\n\n\t\t\t\tspeed() {\n\t\t\t\t\t\t// magnitude of velocity vector\n\t\t\t\t\t\treturn Math.sqrt(this.dx * this.dx + this.dy * this.dy);\n\t\t\t\t};\n\n\t\t\t\tsetSpeed(dx, dy) {\n\t\t\t\t\t\tthis.dx = dx;\n\t\t\t\t\t\tthis.dy = dy;\n\t\t\t\t}\n\n\t\t\t\tangle() {\n\t\t\t\t\t\t// velocity's angle with the x axis\n\t\t\t\t\t\treturn Math.atan2(this.dy, this.dx);\n\t\t\t\t};\n\n\t\t\t\tmove(dt) {\n\t\t\t\t\t\tthis.x += this.dx * dt;\n\t\t\t\t\t\tthis.y += this.dy * dt;\n\t\t\t\t}\n\n\t\t\t\twallCollision(x, y, w, h) {\n\t\t\t\t\t\tif ((this.x + this.radius) >= w) {\n\t\t\t\t\t\t\t\tthis.dx = -(this.dx);\n\t\t\t\t\t\t\t\tthis.x = w -this.radius;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif ((this.x - this.radius) <= 0) {\n\t\t\t\t\t\t\t\tthis.dx = -(this.dx);\n\t\t\t\t\t\t\t\tthis.x = this.radius;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif ((this.y + this.radius) >= h) {\n\t\t\t\t\t\t\t\tthis.dy = -(this.dy);\n\t\t\t\t\t\t\t\tthis.y = h -this.radius;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif ((this.y - this.radius) <= 0) {\n\t\t\t\t\t\t\t\tthis.dy = -(this.dy);\n\t\t\t\t\t\t\t\tthis.y = this.radius;\n\t\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tdistance(ball) {\n\t\t\t\t\t\treturn Math.sqrt((this.x - ball.x)**2 + (this.y - ball.y)**2);\n\t\t\t\t}\n\n\t\t\t\tisInfected() {\n\t\t\t\t\t\t// Step 0 is just infected\n\t\t\t\t\t\treturn ( ( (this.status=='infected') || (this.status=='incubating') ) && (this.virus_step>0) );\n\t\t\t\t}\n\n\t\t\t\tchangeStatus(newStatus) {\n\t\t\t\t\t\tswitch (newStatus) {\n\t\t\t\t\t\tcase 'incubating':\n\t\t\t\t\t\t\t\tthis.status=newStatus;\n\t\t\t\t\t\t\t\tthis.viral_load=1;\n\t\t\t\t\t\t\t\tthis.virus_step=0;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'infected':\n\t\t\t\t\t\t\t\tthis.status=newStatus;\n\t\t\t\t\t\t\t\tthis.virus_step=0.001; // Greater than 0\n\t\t\t\t\t\t\t\tthis.daysInfected = 0;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'dead':\n\t\t\t\t\t\t\t\tthis.status=newStatus;\n\t\t\t\t\t\t\t\tthis.virus_step=0;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'healed':\n\t\t\t\t\t\t\t\tthis.status=newStatus;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tinfect(otherball, viral_load_increase, transmission) {\n\t\t\t\t\t\tif (!this.isInfected())\n\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\tif (Util.random(0, 100)>transmission)\n\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\tif (otherball.isInfected())\n\t\t\t\t\t\t\t\totherball.viral_load+=viral_load_increase/100;\n\t\t\t\t\t\telse\n\t\t\t\t\t\t\t\totherball.changeStatus('incubating');\n\t\t\t\t}\n\n\t\t\t\tonGround() {\n\t\t\t\t\t\treturn (this.y + this.radius >= canvas.height)\n\t\t\t\t};\n\t\t};\n\n\t\twindow.Ball = Ball;\n}();\n\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/infection-main.js":
/*!*******************************!*\
  !*** ./src/infection-main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!function() {\n}();\n\n\n//# sourceURL=webpack:///./src/infection-main.js?");

/***/ }),

/***/ "./src/simulator.js":
/*!**************************!*\
  !*** ./src/simulator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!function(Util) {\n\t\tclass Simulator {\n\t\t\t\tconstructor(data) {\n\t\t\t\t\t\tthis.canvas = document.getElementById('infection');\n\t\t\t\t\t\tthis.ctx = this.canvas.getContext('2d');\n\t\t\t\t\t\tthis.lastUpdate = 0;\n\t\t\t\t\t\tthis.totalTime=0;\n\n\t\t\t\t\t\tthis.speed = 0;\n\t\t\t\t\t\tthis.data = data;\n\n\t\t\t\t\t\tthis.objects = [];\n\t\t\t\t\t\tthis.backgroundcolor = \"rgb(215, 225, 230)\";\n\t\t\t\t\t\tthis.playing = false;\n\n\t\t\t\t\t\tthis.generatePopulation(data);\n\t\t\t\t\t\tthis.draw()\n\t\t\t\t}\n\n\t\t\t\toverlapped(x, y, size) {\n\t\t\t\t\t\tfor (let obj in this.objects) {\n\t\t\t\t\t\t\t\tif (this.objects[obj].touches(x-size-1, y-size-1, x+size+1, y+size+1))\n\t\t\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\tgenerateBallData() {\n\t\t\t\t\t\tlet size = Util.random(5, 6);\n\t\t\t\t\t\tlet x, y;\n\t\t\t\t\t\tdo {\n\t\t\t\t\t\t\t\tx = Util.random(size+1, this.canvas.width-size-1);\n\t\t\t\t\t\t\t\ty = Util.random(size+1, this.canvas.height-size-1);\n\t\t\t\t\t\t} while (this.overlapped(x, y, size));\n\t\t\t\t\t\treturn [x, y, size];\n\t\t\t\t}\n\n\t\t\t\tgenerateSpeedData(data) {\n\t\t\t\t\t\tlet stopped = (Util.random(0,100)<=data.stoppedPopulation);\n\t\t\t\t\t\tif (!stopped) {\n\t\t\t\t\t\t\t\treturn [\n\t\t\t\t\t\t\t\t\t\tUtil.random(-7, 7),\n\t\t\t\t\t\t\t\t\t\tUtil.random(-7, 7),\n\t\t\t\t\t\t\t\t\t\t0.1\n\t\t\t\t\t\t\t\t];\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\treturn [ 0, 0, 10000 ];\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tgeneratePopulation(data) {\n\t\t\t\t\t\tfor (let i = 0; i<data.totalPopulation-data.initialInfected; i++) {\n\t\t\t\t\t\t\t\tlet balldata = this.generateBallData();\n\t\t\t\t\t\t\t\tlet speeddata = this.generateSpeedData(data);\n\n\t\t\t\t\t\t\t\tthis.objects[this.objects.length] = new window.Ball(balldata[0], balldata[1], speeddata[0], speeddata[1], balldata[2], speeddata[2], 'healthy');\n\t\t\t\t\t\t}\n\t\t\t\t\t\tfor (let i = 0; i<data.initialInfected; i++) {\n\t\t\t\t\t\t\t\tlet balldata = this.generateBallData();\n\t\t\t\t\t\t\t\tlet speeddata = this.generateSpeedData(data);\n\t\t\t\t\t\t\t\tthis.objects[this.objects.length] = new window.Ball(balldata[0], balldata[1], speeddata[0], speeddata[1], balldata[2], speeddata[2], 'infected');\n\t\t\t\t\t\t}\n\t\t\t\t\t\tthis.speed = data.speed;\n\t\t\t\t}\n\n\t\t\t\tclearCanvas() {\n\t\t\t\t}\n\n\t\t\t\tcanvasBackground() {\n\t\t\t\t}\n\n\t\t\t\tdrawObjects() {\n\t\t\t\t\t\tfor (let obj in this.objects) {\n\t\t\t\t\t\t\t\tthis.objects[obj].draw(this.ctx);\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tcanvasBackground() {\n\t\t\t\t\t\tthis.canvas.style.backgroundColor = this.backgroundColor;\n\t\t\t\t}\n\n\t\t\t\tclearCanvas() {\n\t\t\t\t\t\tthis.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\t\t\t\t}\n\n\t\t\t\tmoveBalls(dt) {\n\t\t\t\t\t\tthis.totalTime+=dt;\n\t\t\t\t\t\tfor (let obj in this.objects) {\n\t\t\t\t\t\t\t\tif (this.objects[obj].constructor.name == 'Ball')\n\t\t\t\t\t\t\t\t\t\tthis.objects[obj].viralStep(this.data, dt);\n\t\t\t\t\t\t\t\tthis.objects[obj].move(dt);\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\twallCollisions() {\n\t\t\t\t\t\tfor (let obj in this.objects) {\n\t\t\t\t\t\t\t\tthis.objects[obj].wallCollision(0, 0, this.canvas.width, this.canvas.height);\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tstaticCollision(ob1, ob2, emergency=false)\n\t\t\t\t{\n\n\t\t\t\t\t\tlet overlap = ob1.radius + ob2.radius - Math.sqrt((ob1.x+ob1.dx - ob2.x-ob2.dx)**2 + (ob1.y+ob1.dy - ob2.y-ob2.dy)**2);\n\t\t\t\t\t\tif (overlap>0) {\n\t\t\t\t\t\t\t\tob1.x+=ob1.dx/overlap;\n\t\t\t\t\t\t\t\tob1.y+=ob1.dy/overlap;\n\t\t\t\t\t\t\t\tob2.x+=ob2.dx/overlap;\n\t\t\t\t\t\t\t\tob2.y+=ob2.dy/overlap;\n\t\t\t\t\t\t\t\t//this.pause();\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// let overlap = ob1.radius + ob2.radius - ob1.distance(ob2);\n\t\t\t\t\t\t// let smallerObject = ob1.radius < ob2.radius ? ob1 : ob2;\n\t\t\t\t\t\t// let biggerObject = ob1.radius > ob2.radius ? ob1 : ob2;\n\n\t\t\t\t\t\t// // When things go normally, this line does not execute.\n\t\t\t\t\t\t// // \"Emergency\" is when staticCollision has run, but the collision\n\t\t\t\t\t\t// // still hasn't been resolved. Which implies that one of the objects\n\t\t\t\t\t\t// // is likely being jammed against a corner, so we must now move the OTHER one instead.\n\t\t\t\t\t\t// // in other words: this line basically swaps the \"little guy\" role, because\n\t\t\t\t\t\t// // the actual little guy can't be moved away due to being blocked by the wall.\n\t\t\t\t\t\t// if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject]\n\n\t\t\t\t\t\t// let theta = Math.atan2((biggerObject.y - smallerObject.y), (biggerObject.x - smallerObject.x));\n\t\t\t\t\t\t// smallerObject.x -= overlap * Math.cos(theta);\n\t\t\t\t\t\t// smallerObject.y -= overlap * Math.sin(theta);\n\n\t\t\t\t\t\t// if (ob1.distance(ob2) < ob1.radius + ob2.radius) {\n\t\t\t\t\t\t// \t\t// we don't want to be stuck in an infinite emergency.\n\t\t\t\t\t\t// \t\t// so if we have already run one emergency round; just ignore the problem.\n\t\t\t\t\t\t// \t\tif (!emergency) this.staticCollision(ob1, ob2, true)\n\t\t\t\t\t\t// }\n\t\t\t\t}\n\n\t\t\t\tinfection(ball1, ball2) {\n\t\t\t\t\t\tball1.infect(ball2, this.data.viralLoadIncrease, this.data.transmission);\n\t\t\t\t\t\tball2.infect(ball1, this.data.viralLoadIncrease, this.data.transmission);\n\t\t\t\t}\n\n\t\t\t\tcomputeCollision(ball1, ball2) {\n\t\t\t\t\t\tlet theta1 = ball1.angle();\n\t\t\t\t\t\tlet theta2 = ball2.angle();\n\t\t\t\t\t\tlet phi = Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);\n\t\t\t\t\t\tlet m1 = ball1.weight;\n\t\t\t\t\t\tlet m2 = ball2.weight;\n\t\t\t\t\t\tlet v1 = ball1.speed();\n\t\t\t\t\t\tlet v2 = ball2.speed();\n\n\t\t\t\t\t\tlet cosphi = Math.cos(phi);\n\t\t\t\t\t\tlet sinphi = Math.sin(phi);\n\t\t\t\t\t\tlet cost1p = Math.cos(theta1 - phi);\n\t\t\t\t\t\tlet cost2p = Math.cos(theta2 - phi);\n\t\t\t\t\t\tlet sint1p = Math.sin(theta1 - phi);\n\t\t\t\t\t\tlet sint2p = Math.sin(theta2 - phi);\n\t\t\t\t\t\tlet cospp2 = Math.cos(phi+Math.PI/2);\n\t\t\t\t\t\tlet sinpp2 = Math.sin(phi+Math.PI/2);\n\n\t\t\t\t\t\tlet dx1F = (v1 * cost1p * (m1-m2) + 2 * m2 * v2 * cost2p) / (m1+m2) * cosphi + v1*sint1p * cospp2;\n\t\t\t\t\t\tlet dy1F = (v1 * cost1p * (m1-m2) + 2 * m2 * v2 * cost2p) / (m1+m2) * sinphi + v1*sint1p * sinpp2;\n\t\t\t\t\t\tlet dx2F = (v2 * cost2p * (m2-m1) + 2 * m1 * v1 * cost1p) / (m1+m2) * cosphi + v2*sint2p * cospp2;\n\t\t\t\t\t\tlet dy2F = (v2 * cost2p * (m2-m1) + 2 * m1 * v1 * cost1p) / (m1+m2) * sinphi + v2*sint2p * sinpp2;\n\n\t\t\t\t\t\tball1.setSpeed(dx1F, dy1F);\n\t\t\t\t\t\tball2.setSpeed(dx2F, dy2F);\n\n\t\t\t\t\t\tthis.infection(ball1, ball2);\n\t\t\t\t\t\tthis.staticCollision(ball1, ball2)\n\t\t\t\t}\n\n\t\t\t\tballCollisions() {\n\t\t\t\t\t\tfor (let i=0; i<this.objects.length-1; i++) {\n\t\t\t\t\t\t\t\tlet ob1 = this.objects[i]\n\t\t\t\t\t\t\t\tif (ob1.constructor.name != 'Ball')\n\t\t\t\t\t\t\t\t\t\tcontinue;\n\t\t\t\t\t\t\t\tfor (let j=i+1; j<this.objects.length; j++) {\n\t\t\t\t\t\t\t\t\t\tlet ob2 = this.objects[j]\n\t\t\t\t\t\t\t\t\t\tif (ob2.constructor.name != 'Ball')\n\t\t\t\t\t\t\t\t\t\t\t\tcontinue;\n\n\t\t\t\t\t\t\t\t\t\tif ( (ob2.status == 'dead') || (ob1.status=='dead') ) // Deceased doesn't interact\n\t\t\t\t\t\t\t\t\t\t\t\tcontinue;\n\n\t\t\t\t\t\t\t\t\t\tlet dist = ob1.distance(ob2);\n\n\t\t\t\t\t\t\t\t\t\tif (dist < ob1.radius + ob2.radius)\n\t\t\t\t\t\t\t\t\t\t\t\tthis.computeCollision(ob1, ob2);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tcollisions() {\n\t\t\t\t\t\tthis.wallCollisions();\n\t\t\t\t\t\tthis.ballCollisions();\n\t\t\t\t}\n\n\t\t\t\twriteStats() {\n\t\t\t\t\t\tdocument.getElementById('sTime').innerHTML=Number.parseFloat(this.totalTime/Util.stepsPerDay).toFixed(2);\n\t\t\t\t\t\tlet stats = { 'healthy': 0, 'infected': 0, 'dead': 0, 'incubating': 0, 'healed': 0};\n\t\t\t\t\t\tfor (let i=0; i<this.objects.length; i++) {\n\t\t\t\t\t\t\t\tlet ob = this.objects[i];\n\t\t\t\t\t\t\t\tswitch (ob.status) {\n\t\t\t\t\t\t\t\tcase 'healthy':\n\t\t\t\t\t\t\t\t\t\tstats.healthy++;\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\tcase 'incubating':\n\t\t\t\t\t\t\t\t\t\tstats.incubating++;\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\tcase 'infected':\n\t\t\t\t\t\t\t\t\t\tstats.infected++;\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\tcase 'healed':\n\t\t\t\t\t\t\t\t\t\tstats.healed++;\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\tcase 'dead':\n\t\t\t\t\t\t\t\t\t\tstats.dead++;\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdocument.getElementById('sPopulation').innerHTML=this.objects.length-stats.dead;\n\t\t\t\t\t\tdocument.getElementById('sHealthy').innerHTML=stats.healthy;\n\t\t\t\t\t\tdocument.getElementById('sInfected').innerHTML=stats.infected;\n\t\t\t\t\t\tdocument.getElementById('sIncubating').innerHTML=stats.incubating;\n\t\t\t\t\t\tdocument.getElementById('sHealed').innerHTML=stats.healed;\n\t\t\t\t\t\tdocument.getElementById('sDead').innerHTML=stats.dead;\n\t\t\t\t}\n\n\t\t\t\tdraw(start=false) {\n\t\t\t\t\t\tlet currentTime = (new Date()).getTime();\n\t\t\t\t\t\tif (start)\n\t\t\t\t\t\t\t\tthis.lastUpdate = currentTime;\n\t\t\t\t\t\tlet dt = (currentTime - this.lastUpdate) / 1000; // delta time in seconds\n\t\t\t\t\t\tdt *= this.speed;\n\t\t\t\t\t\t//if (clearCanv)\n\t\t\t\t\t\t\t\tthis.clearCanvas();\n\t\t\t\t\t\tthis.canvasBackground();\n\n\t\t\t\t\t\tif (this.playing) {\n\t\t\t\t\t\t\t\tthis.moveBalls(dt);\n\t\t\t\t\t\t\t\tthis.collisions();\n\t\t\t\t\t\t\t\tthis.writeStats();\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tthis.drawObjects();\n\n\t\t\t\t\t\tthis.lastUpdate = currentTime;\n\t\t\t\t\t\tif (this.playing) {\n\t\t\t\t\t\t\t\twindow.requestAnimationFrame(function() {\n\t\t\t\t\t\t\t\t\t\tthis.draw();\n\t\t\t\t\t\t\t\t}.bind(this));\n\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tisPaused() {\n\t\t\t\t\t\treturn !this.playing;\n\t\t\t\t}\n\n\t\t\t\tisPlaying() {\n\t\t\t\t\t\treturn this.playing;\n\t\t\t\t}\n\n\t\t\t\tpause() {\n\t\t\t\t\t\tthis.playing = false;\n\t\t\t\t}\n\n\t\t\t\tplay() {\n\t\t\t\t\t\tthis.playing = true;\n\t\t\t\t\t\tthis.draw(true)\n\t\t\t\t}\n\t\t}\n\n\t\twindow.Simulator = Simulator;\n}(window.Util);\n\n\n//# sourceURL=webpack:///./src/simulator.js?");

/***/ }),

/***/ "./src/userui.js":
/*!***********************!*\
  !*** ./src/userui.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!function() {\n\t\t\"use strict\"\n\t\tconst speeds = {\n\t\t\t\t1: 30,\n\t\t\t\t2: 50,\n\t\t\t\t3: 100,\n\t\t};\n\n\t\tclass UserUI {\n\t\t\t\tconstructor() {\n\t\t\t\t\t\tthis.init();\n\t\t\t\t}\n\n\t\t\t\tgeneratePopulation() {\n\t\t\t\t\t\tif ( (this.simulator) && (this.simulator.isPlaying()) )\n\t\t\t\t\t\t\t\treturn alert('Please stop simulation before generating a new one');\n\n\t\t\t\t\t\tthis.simulator = new window.Simulator({\n\t\t\t\t\t\t\t\t'totalPopulation': document.getElementById('population').value,\n\t\t\t\t\t\t\t\t'initialInfected': document.getElementById('infected').value,\n\t\t\t\t\t\t\t\t'speed': speeds[document.getElementById('speed').value] || 10,\n\t\t\t\t\t\t\t\t'stoppedPopulation': document.getElementById('stopped').value,\n\t\t\t\t\t\t\t\t'incubationDays': document.getElementById('incubation').value,\n\t\t\t\t\t\t\t\t'viralLoadIncrease': document.getElementById('viralload').value,\n\t\t\t\t\t\t\t\t'transmission':  document.getElementById('transmission').value,\n\t\t\t\t\t\t\t\t'deathProb':  document.getElementById('death').value,\n\t\t\t\t\t\t\t\t'healDays':  document.getElementById('heal').value,\n\t\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\tplay() {\n\t\t\t\t\t\tif (!this.simulator)\n\t\t\t\t\t\t\t\treturn alert('Please generate population before playing simulation');\n\t\t\t\t\t\telse if (this.simulator.isPlaying())\n\t\t\t\t\t\t\t\treturn ;\n\n\t\t\t\t\t\tthis.simulator.play();\n\t\t\t\t}\n\n\t\t\t\tpause() {\n\t\t\t\t\t\tif ( (!this.simulator) || (this.simulator.isPaused()) )\n\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\tthis.simulator.pause();\n\t\t\t\t}\n\n\t\t\t\tinit() {\n\t\t\t\t\t\tthis.playing=false;\n\t\t\t\t\t\tthis.simulator=false;\n\n\t\t\t\t\t\tvar wrapper = document.getElementById('infection-wrapper');\n\t\t\t\t\t\tvar canvas = document.getElementById('infection');\n\n\t\t\t\t\t\tcanvas.width=wrapper.clientWidth;\n\t\t\t\t\t\tcanvas.height=screen.height/2;\n\n\t\t\t\t\t\tdocument.getElementById('generatepop').addEventListener('click', function (e) {\n\t\t\t\t\t\t\t\tthis.generatePopulation()\n\t\t\t\t\t\t}.bind(this));\n\n\t\t\t\t\t\tdocument.getElementById('play').addEventListener('click', function (e) {\n\t\t\t\t\t\t\t\tthis.play();\n\t\t\t\t\t\t}.bind(this));\n\n\t\t\t\t\t\tdocument.getElementById('pause').addEventListener('click', function (e) {\n\t\t\t\t\t\t\t\tthis.pause();\n\t\t\t\t\t\t}.bind(this));\n\n\t\t\t\t}\n\t\t}\n\t\tlet userUI=new UserUI();\n}();\n\n\n//# sourceURL=webpack:///./src/userui.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("!function() {\n\t\tclass Util {\n\t\t\t\tconstructor() {\n\t\t\t\t\t\tthis.stepsPerDay = 24;\n\t\t\t\t}\n\n\t\t\t\trandom(min,max) {\n\t\t\t\t\t\tconst num = Math.floor(Math.random()*(max-min)) + min;\n\t\t\t\t\t\treturn num;\n\t\t\t\t}\n\n\t\t}\n\n\t\twindow.Util = new Util();\n}();\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ }),

/***/ 0:
/*!****************************************************************************************************!*\
  !*** multi ./src/util.js ./src/simulator.js ./src/ball.js ./src/userui.js ./src/infection-main.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /home/gaspy/covid/infection/src/util.js */\"./src/util.js\");\n__webpack_require__(/*! /home/gaspy/covid/infection/src/simulator.js */\"./src/simulator.js\");\n__webpack_require__(/*! /home/gaspy/covid/infection/src/ball.js */\"./src/ball.js\");\n__webpack_require__(/*! /home/gaspy/covid/infection/src/userui.js */\"./src/userui.js\");\nmodule.exports = __webpack_require__(/*! /home/gaspy/covid/infection/src/infection-main.js */\"./src/infection-main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/util.js_./src/simulator.js_./src/ball.js_./src/userui.js_./src/infection-main.js?");

/***/ })

/******/ });