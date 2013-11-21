/**
 * @class The controller to control the OptionsView
 */
var OptionsController = new Class( /** @lends OptionsController.prototype */ {

	/**
	 * Constructor
	 */
	initialize: function () {
		// Images. These will automatically be loaded
		this.images = {};
		
		this.images.titleOptions = "images/options_screen/option_title.png";
		
		this.images.buttonStatistics = "images/options_screen/button_statistics.png";
		this.images.buttonLock = "images/options_screen/button_lock.png";
		this.images.buttonUnlock = "images/options_screen/button_unlock.png";
		this.images.buttonReset = "images/options_screen/button_reset.png";
		this.images.buttonAbout = "images/options_screen/button_about.png";
		
		this.images.iconMusic = "images/options_screen/icon_music.png";
		this.images.iconSound = "images/options_screen/icon_sound.png";
		this.images.iconCross = "images/options_screen/icon_cross.png";
		this.images.iconLock = "images/options_screen/icon_lock.png";
		
		this.images.buttonHome = "images/widgets/button_back_to_home.png";
		
		// sounds
		this.sounds = {};
		this.sounds.select = "sounds/menu/menu_select.mp3";
		this.sounds.background = "sounds/background_music/menu.mp3";
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new OptionsView(this);
		app.view = this.view;
		
		//______________________________________________________________
		//FOLLOWING THREE VARIABLES SHOULD BE RECORDED IN DATABASE
		//______________________________________________________________
		//app.view.soundOn = storage.get("settingSound", true);
		//app.view.musicOn = storage.get("settingMusic", true);
		//app.view.levelLocked = storage.get("lockLevel", false);;
		
		//dimensions
		app.view.viewVars = {};
		app.view.viewVars.homeButtonDimensions = {x:0.05, y:0.05, width:0.11, height:0.12};
		app.view.viewVars.titleDimensions = {x:0.34, y:0.1, width:0.3, height:0.11};
		app.view.viewVars.iconSoundDimensions = {x:0.38, y:0.27, width:0.08, height:0.10};
		app.view.viewVars.iconSoundCrossDimensions = {x:0.44, y:0.32, width:0.045, height:0.06};
		app.view.viewVars.iconMusicDimensions = {x:0.53, y:0.27, width:0.06, height:0.10};
		app.view.viewVars.iconMusicCrossDimensions = {x:0.58, y:0.32, width:0.045, height:0.06};
		app.view.viewVars.buttonStatisticsDimensions = {x:0.32, y:0.40, width:0.35, height:0.07};
		app.view.viewVars.buttonLockDimensions = {x:0.32, y:0.51, width:0.35, height:0.07};
		app.view.viewVars.buttonUnlockDimensions = {x:0.32, y:0.51, width:0.35, height:0.07};
		app.view.viewVars.iconLockDimensions = {x:0.66, y:0.53, width:0.04, height:0.06};
		app.view.viewVars.buttonResetDimensions = {x:0.32, y:0.62, width:0.35, height:0.07};
		app.view.viewVars.buttonAboutDimensions = {x:0.32, y:0.73, width:0.35, height:0.07};
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		this.view.drawTitle();
		this.view.drawSoundButtons();
		this.view.drawOptionsButtons();
		this.view.drawHomeButton();
		app.stage.draw();
	},

	/**
	 * Navigate back to the home page
	 */
	home: function () {
		app.route("Home");
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},

});
