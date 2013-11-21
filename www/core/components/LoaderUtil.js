/**
 * @class Class to load images into memory using PxLoader
 */
var LoaderUtil = new Class ( /** @lends LoaderUtil.prototype */ {

	/**
	 * Loads the images into memory.
	 * @param {object} images a object containing strings of images. This can be nested to contain objects containings strings of images
	 * @param {function} callback to call ones all the images have finished loading into memory
	 */
	load: function(images, callback) {
		var loader = new PxLoader();
	
		for(var key in images) {
			if (typeof images[key] == "string") {
				images[key] = loader.addImage(images[key]);
			} else if (images[key] instanceof Array) {
				for(var i = 0; i < images[key].length; i++) {
					images[key][i] = loader.addImage(images[key][i]);
				}
			} else if (images[key] instanceof Object) {
				this.load(images[key]);
			}
		}
		
		loader.addCompletionListener(callback);
		loader.start();	
	},

	/**
	 * Unload images
	 * @param {object} images the objects of images to unload
	 */
	unload: function(images) {
		for(var key in images) {
		
			if (images[key] instanceof Array) {
				for(var i = 0; i < images[key].length; i++) {
					delete images[key][i];
				}
			} else {
				delete images[key];
			}
		}
	},
	
});

