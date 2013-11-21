/**
 * @class The controller to control the MenuView
 */
var MenuController = new Class ( /** @lends MenuController.prototype */ {

	/**
	 * Constructor
	 */
	initialize: function () {

		// Images. These will automatically be loaded
		this.images = {};
		this.images.numerousTitle = "images/widgets/numerous_title.png";
		this.images.arrowLeft = "images/widgets/arrow_left.png";
		this.images.arrowRight = "images/widgets/arrow_right.png";
		this.images.homeButton = "images/widgets/button_back_to_home.png";
		
		this.images.unitLabels = [];
		this.images.unitPlayButtons = [];
		for(var i = 0; i < app.UNIT_GAMES.length; i++){
			this.images.unitLabels[i] = "images/widgets/label_unit" + i + ".png";
			this.images.unitPlayButtons[i] = "images/widgets/button_unit" + i + "_play.png";
		}
		
		// Sounds
		this.sounds = {};
		this.sounds.select = "sounds/menu/menu_select.mp3";
		
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new MenuView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		this.view.draw();
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},

	/**
	 * Navigate to the main menu
	 */
	play: function () {
		
	},

	/**
	 * Navigate back to the home page
	 */
	home: function () {
		app.route("Home");
	},

	/**
	 * Navigate to a unit page
	 * @param {integer} unit the unit to navigate into
	 */
	unitSelect: function(unit) {
		app.setCurrentUnit(unit);
		app.route("MenuUnit");
	},
	
});