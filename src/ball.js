!function() {
		class Ball {
				constructor(x, y, dx, dy, radius, weight, type, extra={}){
						this.x = x;
						this.y = y;

						this.radius = radius;
						this.weight = weight;
						this.status = type;
						this.viral_load = extra.viral_load || 0;
						let initialvs = ( (type=='infected') || (type=='incubating') )?1:0;
						this.virus_step = extra.virus_step || initialvs; // How much time do we have the virus. Step is a time unit
						this.daysInfected = 0;

						this.dx = dx;
						this.dy = dy;

						// mass is that of a sphere as opposed to circle
						// it *does* make a difference in how realistic it looks
						this.mass = this.radius * this.radius * this.radius;
						this.color = this.getColor(this.status);
				};

				getColor(type) {
						switch (type) {
						case 'healthy': return 'rgba(121, 162, 194, 1)';
						case 'incubating': return 'rgba(65, 114, 217, 1)';
						case 'infected' : return 'rgba(217, 65, 114, 1)';
						case 'healed' : return 'rgba(114, 217, 65, 1)';
						case 'dead' : return 'rgba(0,0,0,1)';
						}
						return 'rgba(255, 255, 255, 1)';
				}

				viralStep(simulationData, stepTime) {
						if ( (this.status=='infected') || (this.status=='incubating') || (this.status=='dead') )
								this.virus_step+=stepTime;
						if ( (this.status=='incubating') && (this.virus_step/Util.stepsPerDay>=simulationData.incubationDays) )
								this.changeStatus('infected');
						else if (this.status=='infected') {
								let daysInfected = Math.round(this.virus_step/Util.stepsPerDay);
								if (daysInfected>this.daysInfected) {
										if (daysInfected>=simulationData.healDays)
												this.changeStatus('healed');
										else if (Util.random(0,100)<=this.viral_load*simulationData.deathProb)
												this.changeStatus('dead');
										this.daysInfected = daysInfected;
								}
						} else if (this.status == 'dead') {
								if (Math.round(this.virus_step) % 10 == 0) {
										this.virus_step++;
										let incy = Math.abs(this.dy);
										let incx = Math.abs(this.dx);
										if ( (incy > 0) || (incx > 0 ) ) {
												if (incy>0.2)
														incy = 0.2;
												if (incx>0.2)
														incx = 0.2;

												this.dy+=(this.dy>0)?-incy:incy;
												this.dx+=(this.dx>0)?-incx:incx;
										}
								}
						}
				}

				debugDraw(ctx, color) {
						ctx.beginPath();
						ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
						ctx.stroke();
						ctx.closePath();
				}

				draw(ctx) {
						this.color = this.getColor(this.status);
						ctx.beginPath();
						ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
						ctx.fillStyle = this.color;
						ctx.fill();
						ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
						ctx.stroke();
						ctx.closePath();
				};

				touches(x, y, x1, y1) {

						return ( ( (x>=(this.x-this.radius)) && (x<=(this.x+this.radius)) ) && ( (y>=(this.y-this.radius)) && (y<=(this.y+this.radius)) ) ||
										 ( (x>=(this.x-this.radius)) && (x<=(this.x+this.radius)) ) && ( (y1>=(this.y-this.radius)) && (y1<=(this.y+this.radius)) ) ||
										 ( (x1>=(this.x-this.radius)) && (x1<=(this.x+this.radius)) ) && ( (y>=(this.y-this.radius)) && (y<=(this.y+this.radius)) ) ||
										 ( (x1>=(this.x-this.radius)) && (x1<=(this.x+this.radius)) ) && ( (y1>=(this.y-this.radius)) && (y1<=(this.y+this.radius)) ) );
				}

				speed() {
						// magnitude of velocity vector
						return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
				};

				setSpeed(dx, dy) {
						this.dx = dx;
						this.dy = dy;
				}

				angle() {
						// velocity's angle with the x axis
						return Math.atan2(this.dy, this.dx);
				};

				move(dt) {
						this.x += this.dx * dt;
						this.y += this.dy * dt;
				}

				wallCollision(x, y, w, h) {
						if ((this.x + this.radius) >= w) {
								this.dx = -(this.dx);
								this.x = w -this.radius;
						}

						if ((this.x - this.radius) <= 0) {
								this.dx = -(this.dx);
								this.x = this.radius;
						}

						if ((this.y + this.radius) >= h) {
								this.dy = -(this.dy);
								this.y = h -this.radius;
						}

						if ((this.y - this.radius) <= 0) {
								this.dy = -(this.dy);
								this.y = this.radius;
						}

				}

				distance(ball) {
						return Math.sqrt((this.x - ball.x)**2 + (this.y - ball.y)**2);
				}

				isInfected() {
						// Step 0 is just infected
						return ( ( (this.status=='infected') || (this.status=='incubating') ) && (this.virus_step>0) );
				}

				changeStatus(newStatus) {
						switch (newStatus) {
						case 'incubating':
								this.status=newStatus;
								this.viral_load=1;
								this.virus_step=0;
								break;
						case 'infected':
								this.status=newStatus;
								this.virus_step=0.001; // Greater than 0
								this.daysInfected = 0;
								break;
						case 'dead':
								this.status=newStatus;
								this.virus_step=0;
								break;
						case 'healed':
								this.status=newStatus;
								break;
						}
				}

				infect(otherball, viral_load_increase, transmission) {
						if (!this.isInfected())
								return false;
						if (Util.random(0, 100)>transmission)
								return false;
						if (otherball.isInfected())
								otherball.viral_load+=viral_load_increase/100;
						else
								otherball.changeStatus('incubating');
				}

				onGround() {
						return (this.y + this.radius >= canvas.height)
				};
		};

		window.Ball = Ball;
}();
