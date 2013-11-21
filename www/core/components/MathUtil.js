/**
 * @class Class to codify numbers to words, words to numbers, get floor, get remainder and random number
 */
var MathUtil = new Class ( /** @lends MathUtil.prototype */ {

	/**
	 * map of words with key of numbers
	 */
	NUMBER_TO_WORDS_MAP: [],
	
	/**
	 * Constructor
	 */
	initialize: function () {
		this.NUMBER_TO_WORDS_MAP[0] = "ZERO";
		this.NUMBER_TO_WORDS_MAP[1] = "ONE";
		this.NUMBER_TO_WORDS_MAP[2] = "TWO";
		this.NUMBER_TO_WORDS_MAP[3] = "THREE";
		this.NUMBER_TO_WORDS_MAP[4] = "FOUR";
		this.NUMBER_TO_WORDS_MAP[5] = "FIVE";
		this.NUMBER_TO_WORDS_MAP[6] = "SIX";
		this.NUMBER_TO_WORDS_MAP[7] = "SEVEN";
		this.NUMBER_TO_WORDS_MAP[8] = "EIGHT";
		this.NUMBER_TO_WORDS_MAP[9] = "NINE";
		this.NUMBER_TO_WORDS_MAP[10] = "TEN";
		this.NUMBER_TO_WORDS_MAP[11] = "ELEVEN";
		this.NUMBER_TO_WORDS_MAP[12] = "TWELVE";
		this.NUMBER_TO_WORDS_MAP[13] = "THIRTEEN";
		this.NUMBER_TO_WORDS_MAP[14] = "FOURTEEN";
		this.NUMBER_TO_WORDS_MAP[15] = "FIFTEEN";
		this.NUMBER_TO_WORDS_MAP[16] = "SIXTEEN";
		this.NUMBER_TO_WORDS_MAP[17] = "SEVENTEEN";
		this.NUMBER_TO_WORDS_MAP[18] = "EIGHTEEN";
		this.NUMBER_TO_WORDS_MAP[19] = "NINETEEN";
		this.NUMBER_TO_WORDS_MAP[20] = "TWENTY";
		this.NUMBER_TO_WORDS_MAP[21] = "TWENTY-ONE";
		this.NUMBER_TO_WORDS_MAP[22] = "TWENTY-TWO";
		this.NUMBER_TO_WORDS_MAP[23] = "TWENTY-THREE";
		this.NUMBER_TO_WORDS_MAP[24] = "TWENTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[25] = "TWENTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[26] = "TWENTY-SIX";
		this.NUMBER_TO_WORDS_MAP[27] = "TWENTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[28] = "TWENTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[29] = "TWENTY-NINE";
		this.NUMBER_TO_WORDS_MAP[30] = "THIRTY";
		this.NUMBER_TO_WORDS_MAP[31] = "THIRTY-ONE";
		this.NUMBER_TO_WORDS_MAP[32] = "THIRTY-TWO";
		this.NUMBER_TO_WORDS_MAP[33] = "THIRTY-THREE";
		this.NUMBER_TO_WORDS_MAP[34] = "THIRTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[35] = "THIRTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[36] = "THIRTY-SIX";
		this.NUMBER_TO_WORDS_MAP[37] = "THIRTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[38] = "THIRTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[39] = "THIRTY-NINE";
		this.NUMBER_TO_WORDS_MAP[40] = "FORTY";
		this.NUMBER_TO_WORDS_MAP[41] = "FORTY-ONE";
		this.NUMBER_TO_WORDS_MAP[42] = "FORTY-TWO";
		this.NUMBER_TO_WORDS_MAP[43] = "FORTY-THREE";
		this.NUMBER_TO_WORDS_MAP[44] = "FORTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[45] = "FORTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[46] = "FORTY-SIX";
		this.NUMBER_TO_WORDS_MAP[47] = "FORTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[48] = "FORTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[49] = "FORTY-NINE";
		this.NUMBER_TO_WORDS_MAP[50] = "FIFTY";
		this.NUMBER_TO_WORDS_MAP[51] = "FIFTY-ONE";
		this.NUMBER_TO_WORDS_MAP[52] = "FIFTY-TWO";
		this.NUMBER_TO_WORDS_MAP[53] = "FIFTY-THREE";
		this.NUMBER_TO_WORDS_MAP[54] = "FIFTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[55] = "FIFTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[56] = "FIFTY-SIX";
		this.NUMBER_TO_WORDS_MAP[57] = "FIFTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[58] = "FIFTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[59] = "FIFTY-NINE";
		this.NUMBER_TO_WORDS_MAP[60] = "SIXTY";
		this.NUMBER_TO_WORDS_MAP[61] = "SIXTY-ONE";
		this.NUMBER_TO_WORDS_MAP[62] = "SIXTY-TWO";
		this.NUMBER_TO_WORDS_MAP[63] = "SIXTY-THREE";
		this.NUMBER_TO_WORDS_MAP[64] = "SIXTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[65] = "SIXTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[66] = "SIXTY-SIX";
		this.NUMBER_TO_WORDS_MAP[67] = "SIXTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[68] = "SIXTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[69] = "SIXTY-NINE";
		this.NUMBER_TO_WORDS_MAP[70] = "SEVENTY";
		this.NUMBER_TO_WORDS_MAP[71] = "SEVENTY-ONE";
		this.NUMBER_TO_WORDS_MAP[72] = "SEVENTY-TWO";
		this.NUMBER_TO_WORDS_MAP[73] = "SEVENTY-THREE";
		this.NUMBER_TO_WORDS_MAP[74] = "SEVENTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[75] = "SEVENTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[76] = "SEVENTY-SIX";
		this.NUMBER_TO_WORDS_MAP[77] = "SEVENTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[78] = "SEVENTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[79] = "SEVENTY-NINE";
		this.NUMBER_TO_WORDS_MAP[80] = "EIGHTY";
		this.NUMBER_TO_WORDS_MAP[81] = "EIGHTY-ONE";
		this.NUMBER_TO_WORDS_MAP[82] = "EIGHTY-TWO";
		this.NUMBER_TO_WORDS_MAP[83] = "EIGHTY-THREE";
		this.NUMBER_TO_WORDS_MAP[84] = "EIGHTY-FOUR";
		this.NUMBER_TO_WORDS_MAP[85] = "EIGHTY-FIVE";
		this.NUMBER_TO_WORDS_MAP[86] = "EIGHTY-SIX";
		this.NUMBER_TO_WORDS_MAP[87] = "EIGHTY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[88] = "EIGHTY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[89] = "EIGHTY-NINE";
		this.NUMBER_TO_WORDS_MAP[90] = "NINETY";
		this.NUMBER_TO_WORDS_MAP[91] = "NINETY-ONE";
		this.NUMBER_TO_WORDS_MAP[92] = "NINETY-TWO";
		this.NUMBER_TO_WORDS_MAP[93] = "NINETY-THREE";
		this.NUMBER_TO_WORDS_MAP[94] = "NINETY-FOUR";
		this.NUMBER_TO_WORDS_MAP[95] = "NINETY-FIVE";
		this.NUMBER_TO_WORDS_MAP[96] = "NINETY-SIX";
		this.NUMBER_TO_WORDS_MAP[97] = "NINETY-SEVEN";
		this.NUMBER_TO_WORDS_MAP[98] = "NINETY-EIGHT";
		this.NUMBER_TO_WORDS_MAP[99] = "NINETY-NINE";
		this.NUMBER_TO_WORDS_MAP[100] = "ONE-HUNDRED";
	},

	/**
	 * generate random number
	 * @param {integer} min minimum number of range
	 * @param {integer} max maximum number of range
	 * @returns {integer} random number generated within the specified range
	 */
	random: function(min, max) {
		return Math.floor(min + Math.random()*(max-min+1));
	},
	
	/**
	 * get the ones part of a number
	 * @param {integer} number that you want to get the ones
	 * @returns {integer} the ones part of the input number
	 */
	getOnes: function (number) {
		return (number % 10);
	},
	
	/**
	 * get the tens part of a number
	 * @param {integer} number the number that want to process
	 * @returns {integer} the tens part of the input number
	 */
	getTens: function (number) {
		return Math.floor(number / 10);
	},
	
	/**
	 * get a word from a number
	 * @param {integer} number a number that want to get its word
	 * @returns {string} the word of the input number
	 */
	convertNumberToWord: function(number) {
		return this.NUMBER_TO_WORDS_MAP[number];
	},
	
});
