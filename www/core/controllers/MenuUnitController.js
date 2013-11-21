/**
 * @class The controller to control the MenuUnit
 */
var MenuUnitController = new Class( /** @lends MenuUnitController.prototype */ {

	/**
	 * Constructor
	 */
	initialize: function () {

		// Images. These will automatically be loaded
		this.images = {};
		this.images.title = "images/menu_unit1/label_title.png";
		this.images.buttonBack = "images/menu_unit1/button_back.png";
		this.images.box = "images/menu_unit1/box.png";
		
		this.images.stars = [];
		for(var i = 0; i < 4; i++) {
			this.images.stars[i] = "images/menu_unit1/star" + i + ".png";
		}
		
		// Sounds
		this.sounds = {};
		this.sounds.background = "sounds/background_music/menu.mp3";
		this.sounds.select = "sounds/menu/menu_select.mp3";
		// variables
		this.unitRecordsModel = new UnitRecordsModel(app.currentUnit);
		
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new MenuUnitView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		music.playBackgroundMusic(this.sounds.background);
		this.view.drawTitle();
		this.view.drawButtonBack();
		this.view.drawBoxes(this.unitRecordsModel);
		app.stage.draw();
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},

	/**
	 * Navigates back to the menu page
	 */
	back: function() {
		app.route("Menu");
	},

	/**
	 * Navigates into a game
	 * @param {integer} gameID the identifier of the game to navigate into
	 */
	game: function(gameID) {
		app.setCurrentGame(gameID);

		var page = app.UNIT_GAMES[app.currentUnit][app.currentGame].page;
		var params = app.UNIT_GAMES[app.currentUnit][app.currentGame].params;
		
		app.route(page, params, true);
	},
	
});
