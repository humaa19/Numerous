/**
 * @class The base music class to implement. 
 */
var Music = new Class ( /** @lends Music.prototype */ {
	
	/**
	 * Play a sound
	 * @param {string} src the sound file path
	 */
	play: function (src) {
		throw "method not implemented";
	},
	
	/**
	 * Play a background music. If the same background music is already playing, then do nothing.
	 * @param {string} src the sound file path
	 */
	playBackgroundMusic: function (src) {
		throw "method not implemented";
	},
	
	/**
	 * Pauses the background music. This should be used in devices to ensure good use of application life cycle
	 */
	pauseBackgroundMusic: function () {
		throw "method not implemented";
	},
	
	/**
	 * Resumes the background music. This should be used in devices to ensure good use of application life cycle
	 */
	resumeBackgroundMusic: function () {
		throw "method not implemented";
	},
	
	/**
	 * Stops the background music.
	 */
	stopBackgroundMusic: function () {
		throw "method not implemented";
	},
	
});
