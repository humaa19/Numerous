/**
 * @class Template view that should be copied when creating a new view
 */
var TemplateView = new Class ( /** @lends TemplateView.prototype */ {
	Extends: View,

	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function(controller) {
		this.controller = controller;
	},
	
	/**
	 * Destructor(is automatically called when you leave the page)
	 */
	finalize: function() {
	
	},

});

