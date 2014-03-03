/**
 * @class The controller to control the StatisticsView
 */
var StatisticsController = new Class ( /** @lends StatisticsController.prototype */ {

	/**
	 * Constructor
	 */
	initialize: function () {

		// Images. These will automatically be loaded
		this.images = {};
		this.images.buttonBack = "images/menu_unit1/button_back.png";
		this.images.blackBoard = "images/grouping_game/practice/black_board.png";
		this.images.unitLabels = [];
		for(var i = 0; i < app.UNIT_GAMES.length; i++){
			this.images.unitLabels[i] = "images/widgets/label_unit" + i + ".png";
		}
		
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new StatisticsView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		
		this.view.drawButtonBack();
		this.view.drawUnitButtons();
		this.view.drawStatisticsText();
		app.stage.draw();

	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},
	
	back: function() {
		app.route("Options");
	},
	
	unitOne: function() {
		app.route("Unit1Statistics");
	},
	
	unitTwo: function() {
		app.route("Unit2Statistics");
	}, 
	
	unitThree: function() {
		app.route("Unit3Statistics");
	}, 
});