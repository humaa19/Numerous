/**
 * @class Class to help coordinate the view of the statistics screen for each unit
 */
var UnitStatisticsView = new Class( /** @lends UnitStatisticsView.prototype */ {
	Extends: View,
	
	/**
	 * Controller that controls this view
	 */
	controller: null,
	
	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function (controller) {
		this.controller = controller;
		//this.percentComplete = 0;
		//this.percent1Star = 0;
		//this.percent2Stars = 0;
		//this.percent3Stars = 0;
		//this.percentAttempted = 0;
		//this.percentNotAttempted = 0;
		//this.averageAttempts = 0;
		//his.averageTime = 0;
		//this.maxErrorString = null;
		
	},

	/**
	 * Destructor
	 */
	finalize: function () {
	},
	
	/**
	 * Draw the back button
	 */
	drawButtonBack: function() {
		console.log("drawing back button");
		var	buttonBack = new Kinetic.Image({image: this.images.buttonBack});
		widgetUtil.glue(buttonBack, {
			width: 0.10,
			height: 0.17,
			dx: 0.05,
			dy: 0.03
		});
		app.layer.add(buttonBack);
		
		buttonBack.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.back();
		});
	},
	
	drawLevelStatistics: function() {
		
	},
	
	drawOverallStatistics: function() {
	
	}
});