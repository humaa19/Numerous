/**
 * @class Class to help generate the keyboard text in the practice level
 */
var KeyboardTextsGenerator = new Class ( /** @lends KeyboardTextsGenerator.prototype */ {
	
	/**
	 * Generate the keyboard text for the practice level
	 * @param {array} texts all the texts from the pool of text (may contain correct text)
	 * @param {string} correctText the correct answer
	 * @param {integer} textsCount the number of texts to generate
	 * @returns {array} shuffled keyborad texts
	 */
	generate: function (texts, correctText, textsCount) {
		var output = [correctText];
		
		var shuffledTexts = arrayUtil.shuffleArray(texts);
		
		while(output.length != textsCount) {
			if (shuffledTexts.length == 0) {
				break;
			}
			var newText = shuffledTexts.pop();
			if (newText == correctText) {
				continue;
			} else {
				output.push(newText);
			}
		}
		
		output = arrayUtil.shuffleArray(output);
		return output;
	},
	
});

