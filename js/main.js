
var app = new Vue({

	el: '#clock',

	data: {

		segments: [
			'standup',
			'sitdown',
			'sitdown',
			'standup',
			'sitdown',
			'sitdown',
			'standup',
			'sitdown',
			'sitdown',
			'sitdown',
			'off',
			'off',
			'off',
			'off',
			'off',
			'off',
			'off',
			'off',
			'standup',
			'sitdown',
			'standup',
			'sitdown',
			'standup',
			'sitdown',
		],

		colors: {
			'standup': '#3bfe8f',
			'sitdown': '#5f5f5f',
			'off': '#111',
		},

		titles: {
			'standup': 'Stand up!',
			'sitdown': 'Sit down (or do whatevs)!',
			'off': 'Go home!',
		},

		meter: 0,

		activeSegment: 0,

		meterToNextStandup: 0,

		introAnim: 0

	},

	mounted: function() {

		setInterval(this.animate, 3);

	},


	methods: {

		animate: function() {

			// Place meter
			var d = new Date();

			var seconds = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * .001;

			this.meter = (seconds / 43200) % 1;
			// divisor above should be 43200

			var nextActiveSegment = parseInt(24 * this.meter);
			if (this.activeSegment != nextActiveSegment) {
				this.activeSegment = nextActiveSegment;

				if (this.segments[this.activeSegment] == 'standup') {
					var audio = new Audio('sounds/alarm.mp3');
					audio.play();
				}
			}

			// Meter to next standup
			var next = -1;
			for(var s = this.activeSegment; s <= 24 && next == -1; s++) {
				if (this.segments[s % 24] == 'standup') {
					next = s / 24;
				}
			}
			this.meterToNextStandup = next - this.meter;

			// Nice intro animation
			if (this.introAnim < .9999) {
				this.introAnim = this.introAnim + (1 - this.introAnim) / 50;
			} else {
				this.introAnim = 1;
			}

		},

	}

});

