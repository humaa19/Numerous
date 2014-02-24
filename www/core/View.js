/**
 * @class The base view class that other view classes should extend
 */
var View = new Class ( /** @lends View.prototype */ {
	
	/**
	 * {object} to hold resources of all image resouces belonging to a view
	 */
	images: null,
	
	/**
	 * {object} to hold resources of all sounds resouces belonging to a view
	 */
	sounds: null,
	
	/**
	 * Setter for images
	 * @param {object} images the images to set
	 */
	setImages: function (images) {
		this.images = images;
	},

	/**
	 * Setter for sounds
	 * @param {object} sounds the sounds to set
	 */
	setSounds: function (sounds) {
		this.sounds = sounds;
	},
	
});