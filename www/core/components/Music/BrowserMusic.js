/**
 * @class The music adapter to allow music to work in a browser. Follows adapter pattern and wraps 
 * around the external pluggin "SoundManager2".
 */
var BrowserMusic = new Class ( /** @lends BrowserMusic.prototype */ {
	Implements: Music,
	
	/**
	 * {boolean} indicates whether background music is currently being played.
	 */
	isPlaying: false,
	
	/**
	 * Constructor
	 */
	initialize: function () {
		soundManager.setup({
			url: 'lib/soundmanager/swf_files/',
			onready: function() {}
		});
	},

	/**
	 * Play a sound
	 * @param {string} src the sound file path
	 */
	play: function (src) {
		if(storage.get("settingSound", true) == true){
			soundManager.createSound({
				url: src,
				autoLoad: true,
				autoPlay: true
			});
		}
	},
	
	/**
	 * Play a background music. If the same background music is already playing, then do nothing.
	 * @param {string} src the sound file path
	 */
	playBackgroundMusic: function (src) {
		if(storage.get("settingMusic", true) == true){
			if(this.backgroundMusic == null || this.backgroundMusic.playState == 0 ){
				this.backgroundMusic = soundManager.createSound({
					url: src,
					autoLoad: true,
					autoPlay: true,
					loops: 999,
					onload: function() {
						this.play({volume: 20});
					}
				});
			}
		}
	},
	
	/**
	 * Pauses the background music. This should be used in devices to ensure good use of application life cycle
	 */
	pauseBackgroundMusic: function () {

	},
	
	/**
	 * Resumes the background music. This should be used in devices to ensure good use of application life cycle
	 */
	resumeBackgroundMusic: function () {

	},
	
	/**
	 * Stops the background music.
	 */
	stopBackgroundMusic: function () {
		if (this.backgroundMusic != null) {
			this.backgroundMusic.stop();
		}
	},
	
});