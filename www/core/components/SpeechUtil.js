/**
 * @class Class to speak out a number
 */
var SpeechUtil = new Class ( /** @lends SpeechUtil.prototype */ {

	/**
	 * speak out a number
	 * @param {string} number the word of a number you want the system to say
	 */
	sayNumber: function(number) {
		music.play("sounds/numbers/" + number + ".mp3");
	},
	
});
