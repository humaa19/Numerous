/**
 * @class The controller to control the UnitStatisticsView
 */
var Unit2StatisticsController = new Class ( /** @lends Unit2StatisticsController.prototype */ {

	/**
	 * Constructor
	 */
	initialize: function () {

		this.currentUnit = 1;
		
		// Images. These will automatically be loaded
		this.images = {};
		this.images.buttonBack = "images/menu_unit1/button_back.png";
		this.images.blackBoard = "images/grouping_game/practice/black_board.png";
		this.images.statisticsHeading = "images/options_screen/button_statistics.png";
		this.images.unitLabel = "images/widgets/label_unit" + this.currentUnit + ".png";
		
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new UnitStatisticsView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		
		this.view.drawButtonBack();
		this.view.drawTitle();
		this.view.drawBlackBoard();
		this.view.drawOverallStatistics();
		app.stage.draw();

	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},
	
	back: function() {
		app.route("Statistics");
	},
	
});