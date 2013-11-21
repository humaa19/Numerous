/**
 * @class Template class to copy when creating a new controller
 */
var TemplateController = new Class ( /** @lends TemplateController.prototype */ {
	
	/**
	 * Constructor
	 */
	initialize: function () {
		// Images. These will automatically be loaded
		this.images = {};
		
		view.draw();
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		// this.view = new ExampleView(this);
		// app.view = this.view;
		
		// this.view.setImages(this.images);
		// this.view.draw();
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},
	
});

