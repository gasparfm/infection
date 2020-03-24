!function() {
		"use strict"
		const speeds = {
				1: 30,
				2: 50,
				3: 100,
		};

		class UserUI {
				constructor() {
						this.init();
				}

				generatePopulation() {
						if ( (this.simulator) && (this.simulator.isPlaying()) )
								return alert('Please stop simulation before generating a new one');

						this.simulator = new window.Simulator({
								'totalPopulation': document.getElementById('population').value,
								'initialInfected': document.getElementById('infected').value,
								'speed': speeds[document.getElementById('speed').value] || 10,
								'stoppedPopulation': document.getElementById('stopped').value,
								'incubationDays': document.getElementById('incubation').value,
								'viralLoadIncrease': document.getElementById('viralload').value,
								'transmission':  document.getElementById('transmission').value,
								'deathProb':  document.getElementById('death').value,
								'healDays':  document.getElementById('heal').value,
						});
				}

				play() {
						if (!this.simulator)
								return alert('Please generate population before playing simulation');
						else if (this.simulator.isPlaying())
								return ;

						this.simulator.play();
				}

				pause() {
						if ( (!this.simulator) || (this.simulator.isPaused()) )
								return;
						this.simulator.pause();
				}

				init() {
						this.playing=false;
						this.simulator=false;

						var wrapper = document.getElementById('infection-wrapper');
						var canvas = document.getElementById('infection');

						canvas.width=wrapper.clientWidth;
						canvas.height=screen.height/2;

						document.getElementById('generatepop').addEventListener('click', function (e) {
								this.generatePopulation()
						}.bind(this));

						document.getElementById('play').addEventListener('click', function (e) {
								this.play();
						}.bind(this));

						document.getElementById('pause').addEventListener('click', function (e) {
								this.pause();
						}.bind(this));

				}
		}
		let userUI=new UserUI();
}();
