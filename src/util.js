!function() {
		class Util {
				constructor() {
						this.stepsPerDay = 24;
				}

				random(min,max) {
						const num = Math.floor(Math.random()*(max-min)) + min;
						return num;
				}

		}

		window.Util = new Util();
}();
