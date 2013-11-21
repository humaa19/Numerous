/**
 * @class Class to convert dimensions to and from decimal (e.g. "0.43") and real dimensions (e.g. "420" pixels, which depends on screen size)
 */
var DimensionUtil = new Class ( /** @lends DimensionUtil.prototype */ {

	/**
	 * Represents the width of the canvas
	 */
	width: env.width,
	
	/**
	 * Represents the height of the canvas
	 */
	height: env.height,
	
	/**
	 * Convert decimal height to the actual height
	 * @param {float} h decimal height
	 * @returns {double} actual height
	 */
	decimalToActualHeight: function (h) {
		return h * this.height;
	},
	
	/**
	 * Convert actual height to the decimal height
	 * @param {double} h actual height
	 * @returns {float} decimal height
	 */
	actualToDecimalHeight: function(h) {
		return h / this.height;
	},
	
	/**
	 * Convert decimal width to the actual width
	 * @param {float} w decimal width
	 * @returns {double} actual width
	 */
	decimalToActualWidth: function (w) {
		return w * this.width;
	},
	
	/**
	 * Convert actual width to the decimal width
	 * @param {double} w actual width
	 * @returns {float} decimal width
	 */
	actualToDecimalWidth: function(w) {
		return w / this.width;
	},
	
});


