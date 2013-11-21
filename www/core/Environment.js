/**
 * @class The class is used to give information to the application about its current environment.
 */
var Env = new Class ( /** @lends Env.prototype */ {
	
	/**
	 * {integer} The screen width of the device or browser
	 */
	screenWidth: window.innerWidth,
	
	/**
	 * {integer} The screen height of the device or browser
	 */
	screenHeight: window.innerHeight,
	
	/**
	 * {integer} The width of the canvas (the playing area). This could be changed in 
	 the future so that it does not exactly match the screen size of the device.
	 */
	width: window.innerWidth,
	
	/**
	 * {integer} The height of the canvas (the playing area).
	 */
	height: window.innerHeight,

	/**
	 * {boolean} A variable to change to debug mode to log extra information
	 */
	debug: false,
	
	/**
	 * {boolean} Whether the application is run on the device(true) or browser(false).
	 */
	phoneGap: null,
	
	/**
	 * Constructor
	 */
	initialize: function () {
		if (document.URL.indexOf('file:') === 0) {
			this.phoneGap = true;
		} else {
			this.phoneGap = false;
		}
	},
});

var env = new Env();
