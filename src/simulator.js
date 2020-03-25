// Inspired by https://www.washingtonpost.com/graphics/2020/world/corona-simulator/
!function(Util) {
		class Simulator {
				constructor(data) {
						this.canvas = document.getElementById('infection');
						this.ctx = this.canvas.getContext('2d');
						this.lastUpdate = 0;
						this.totalTime=0;

						this.speed = 0;
						this.data = data;

						this.objects = [];
						this.backgroundcolor = "rgb(215, 225, 230)";
						this.playing = false;

						this.generatePopulation(data);
						this.draw()
				}

				overlapped(x, y, size) {
						for (let obj in this.objects) {
								if (this.objects[obj].touches(x-size-1, y-size-1, x+size+1, y+size+1))
										return true;
						}
						return false;
				}

				generateBallData() {
						let size = Util.random(5, 6);
						let x, y;
						do {
								x = Util.random(size+1, this.canvas.width-size-1);
								y = Util.random(size+1, this.canvas.height-size-1);
						} while (this.overlapped(x, y, size));
						return [x, y, size];
				}

				generateSpeedData(data) {
						let stopped = (Util.random(0,100)<=data.stoppedPopulation);
						if (!stopped) {
								return [
										Util.random(-7, 7),
										Util.random(-7, 7),
										0.1
								];
						} else {
								return [ 0, 0, 10000 ];
						}
				}

				generatePopulation(data) {
						for (let i = 0; i<data.totalPopulation-data.initialInfected; i++) {
								let balldata = this.generateBallData();
								let speeddata = this.generateSpeedData(data);

								this.objects[this.objects.length] = new window.Ball(balldata[0], balldata[1], speeddata[0], speeddata[1], balldata[2], speeddata[2], 'healthy');
						}
						for (let i = 0; i<data.initialInfected; i++) {
								let balldata = this.generateBallData();
								let speeddata = this.generateSpeedData(data);
								this.objects[this.objects.length] = new window.Ball(balldata[0], balldata[1], speeddata[0], speeddata[1], balldata[2], speeddata[2], 'infected');
						}
						this.speed = data.speed;
				}

				clearCanvas() {
				}

				canvasBackground() {
				}

				drawObjects() {
						for (let obj in this.objects) {
								this.objects[obj].draw(this.ctx);
						}
				}

				canvasBackground() {
						this.canvas.style.backgroundColor = this.backgroundColor;
				}

				clearCanvas() {
						this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				}

				moveBalls(dt) {
						this.totalTime+=dt;
						for (let obj in this.objects) {
								if (this.objects[obj].constructor.name == 'Ball')
										this.objects[obj].viralStep(this.data, dt);
								this.objects[obj].move(dt);
						}
				}

				wallCollisions() {
						for (let obj in this.objects) {
								this.objects[obj].wallCollision(0, 0, this.canvas.width, this.canvas.height);
						}
				}

				overlapCollision(ob1, ob2)
				{
						let overlap = ob1.radius + ob2.radius - Math.sqrt((ob1.x+ob1.dx - ob2.x-ob2.dx)**2 + (ob1.y+ob1.dy - ob2.y-ob2.dy)**2);
						if (overlap>0) {
								ob1.x+=ob1.dx/overlap;
								ob1.y+=ob1.dy/overlap;
								ob2.x+=ob2.dx/overlap;
								ob2.y+=ob2.dy/overlap;
								//this.pause();
						}
				}

				infection(ball1, ball2) {
						ball1.infect(ball2, this.data.viralLoadIncrease, this.data.transmission);
						ball2.infect(ball1, this.data.viralLoadIncrease, this.data.transmission);
				}

				// Formulas come from a physics page searching: https://www.google.com/search?q=2d+collision+formula&client=ubuntu&hs=bGY&sxsrf=ALeKk02tGJ2NcwfMDF3aLbcKware-lcp4g:1585079533268&tbm=isch&source=iu&ictx=1&fir=Vmd5u9g87LQaVM%253A%252CVsrmVL4emaSWJM%252C_&vet=1&usg=AI4_-kSxCD8MZwS18DUBUa1K_UCiDqFyFw&sa=X&ved=2ahUKEwi3oZW08bPoAhUh2-AKHSnPAYAQ9QEwEnoECAYQHg#imgrc=hVFs8ECjhWEtYM
				// and https://github.com/miskimit/miskimit.github.io
				computeCollision(ball1, ball2) {
						let theta1 = ball1.angle();
						let theta2 = ball2.angle();
						let phi = Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);
						let m1 = ball1.weight;
						let m2 = ball2.weight;
						let v1 = ball1.speed();
						let v2 = ball2.speed();

						let cosphi = Math.cos(phi);
						let sinphi = Math.sin(phi);
						let cost1p = Math.cos(theta1 - phi);
						let cost2p = Math.cos(theta2 - phi);
						let sint1p = Math.sin(theta1 - phi);
						let sint2p = Math.sin(theta2 - phi);
						let cospp2 = Math.cos(phi+Math.PI/2);
						let sinpp2 = Math.sin(phi+Math.PI/2);

						let dx1F = (v1 * cost1p * (m1-m2) + 2 * m2 * v2 * cost2p) / (m1+m2) * cosphi + v1*sint1p * cospp2;
						let dy1F = (v1 * cost1p * (m1-m2) + 2 * m2 * v2 * cost2p) / (m1+m2) * sinphi + v1*sint1p * sinpp2;
						let dx2F = (v2 * cost2p * (m2-m1) + 2 * m1 * v1 * cost1p) / (m1+m2) * cosphi + v2*sint2p * cospp2;
						let dy2F = (v2 * cost2p * (m2-m1) + 2 * m1 * v1 * cost1p) / (m1+m2) * sinphi + v2*sint2p * sinpp2;

						ball1.setSpeed(dx1F, dy1F);
						ball2.setSpeed(dx2F, dy2F);

						this.infection(ball1, ball2);
						this.overlapCollision(ball1, ball2)
				}

				ballCollisions() {
						for (let i=0; i<this.objects.length-1; i++) {
								let ob1 = this.objects[i]
								if (ob1.constructor.name != 'Ball')
										continue;
								for (let j=i+1; j<this.objects.length; j++) {
										let ob2 = this.objects[j]
										if (ob2.constructor.name != 'Ball')
												continue;

										if ( (ob2.status == 'dead') || (ob1.status=='dead') ) // Deceased doesn't interact
												continue;

										let dist = ob1.distance(ob2);

										if (dist < ob1.radius + ob2.radius)
												this.computeCollision(ob1, ob2);
								}
						}
				}

				collisions() {
						this.wallCollisions();
						this.ballCollisions();
				}

				writeStats() {
						document.getElementById('sTime').innerHTML=Number.parseFloat(this.totalTime/Util.stepsPerDay).toFixed(2);
						let stats = { 'healthy': 0, 'infected': 0, 'dead': 0, 'incubating': 0, 'healed': 0};
						for (let i=0; i<this.objects.length; i++) {
								let ob = this.objects[i];
								switch (ob.status) {
								case 'healthy':
										stats.healthy++;
										break;
								case 'incubating':
										stats.incubating++;
										break;
								case 'infected':
										stats.infected++;
										break;
								case 'healed':
										stats.healed++;
										break;
								case 'dead':
										stats.dead++;
										break;
								}
						}
						document.getElementById('sPopulation').innerHTML=this.objects.length-stats.dead;
						document.getElementById('sHealthy').innerHTML=stats.healthy;
						document.getElementById('sInfected').innerHTML=stats.infected;
						document.getElementById('sIncubating').innerHTML=stats.incubating;
						document.getElementById('sHealed').innerHTML=stats.healed;
						document.getElementById('sDead').innerHTML=stats.dead;
				}

				draw(start=false) {
						let currentTime = (new Date()).getTime();
						if (start)
								this.lastUpdate = currentTime;
						let dt = (currentTime - this.lastUpdate) / 1000; // delta time in seconds
						dt *= this.speed;
						//if (clearCanv)
								this.clearCanvas();
						this.canvasBackground();

						if (this.playing) {
								this.moveBalls(dt);
								this.collisions();
								this.writeStats();
						}

						this.drawObjects();

						this.lastUpdate = currentTime;
						if (this.playing) {
								window.requestAnimationFrame(function() {
										this.draw();
								}.bind(this));
						}
				}

				isPaused() {
						return !this.playing;
				}

				isPlaying() {
						return this.playing;
				}

				pause() {
						this.playing = false;
				}

				play() {
						this.playing = true;
						this.draw(true)
				}
		}

		window.Simulator = Simulator;
}(window.Util);
