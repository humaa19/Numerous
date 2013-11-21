/**
 * @class The music adapter to allow music to work on devices. Follows adapter pattern and wraps 
 * around the phonegap module "Media".
 */
var PhonegapMusic = new Class ( /** @lends PhonegapMusic.prototype */ {
	Implements: Music,

	/**
	 * {boolean} indicates whether background music is currently being played.
	 */
	isPlaying: false,
		
	/**
	 * Play a sound
	 * @param {string} src the sound file path
	 */
	play: function (src) {
		if(storage.get("settingSound", true) == true){
			var myMedia = new Media(src);
			myMedia.play({ playAudioWhenScreenIsLocked: false });
		}
	},
	
	/**
	 * Is a callback specific to phonegap's Media module to call back on any errors that occur.
	 */
	onError: function(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
	},

	/**
	 * Play a background music. If the same background music is already playing, then do nothing.
	 * @param {string} src the sound file path
	 */
	playBackgroundMusic: function (src) {
		if(storage.get("settingMusic", true) == true){
			if(this.isPlaying == false){
				this.backgroundMusic = new Media(
					src,
					function() {
						
					},
					function (error) {
						alert('code: ' + error.code + ' ||  message: ' + error.message);
					}
				);
				this.backgroundMusic.setVolume(0.2);
				this.isPlaying = true;
				this.backgroundMusic.play({ numberOfLoops: 999, playAudioWhenScreenIsLocked : false});
			}
		}
	},
	
	/**
	 * Pauses the background music. This should be used in devices to ensure good use of application life cycle
	 */
	pauseBackgroundMusic: function () {
		if (this.isPlaying) {
			this.backgroundMusic.pause();
			this.isPlaying = false;
		}
	},
	
	/**
	 * Resumes the background music. This should be used in devices to ensure good use of application life cycle
	 */
	resumeBackgroundMusic: function () {
		if (!this.isPlaying) {
			this.backgroundMusic.play({ numberOfLoops: 999});
			this.isPlaying = true;
		}
	},
	
	/**
	 * Stops the background music.
	 */
	stopBackgroundMusic: function () {
		if (this.isPlaying == true) {
			if (this.backgroundMusic) {
				this.backgroundMusic.stop();
				this.isPlaying = false;
			}
		}
	},
	
});
