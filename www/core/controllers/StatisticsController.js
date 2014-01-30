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
		this.images.stars = [];
		for(var i = 0; i < 4; i++) {
			this.images.stars[i] = "images/menu_unit1/star" + i + ".png";
		}
		
		this.images.unitLabels = [];
		for(var i = 0; i < app.UNIT_GAMES.length; i++){
			this.images.unitLabels[i] = "images/widgets/label_unit" + i + ".png";
		}
		
		// Sounds
		this.sounds = {};
		this.sounds.select = "sounds/menu/menu_select.mp3";
		
		console.log("Initialise stats controller");
		
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new StatisticsView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		music.playBackgroundMusic(this.sounds.background);
		this.view.drawButtonBack();
		this.view.drawUnitButtons();
		this.view.drawStatisticsText();
		app.stage.draw();
		
		//this.view.calculateStatistics();

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