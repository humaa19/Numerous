/**
 * @class The controller to control GroupingGameView for the second half of the first unit
 */
var GroupingGame2Controller = new Class ( /** @lends GroupingGame2Controller.prototype */ {	

	/**
	 * Constructor
	 */
	initialize: function () {
		
		// Image that are automatically loaded
		this.images = {};

		this.images.rabbit = "images/grouping_game/rabbit.png";
		this.images.rabbitHead = "images/grouping_game/rabbit_head.png";
		this.images.rabbitBody = "images/grouping_game/rabbit_body.png";
		this.images.thinkCloud = "images/widgets/think_cloud.png";
		this.images.belts = "images/grouping_game/belts.png";
		this.images.coverFront = "images/grouping_game/cover_front.png";
		this.images.coverBack = "images/grouping_game/cover_back.png";
		this.images.tray = "images/grouping_game/tray.png";
		this.images.pack = "images/grouping_game/pack.png";
		
		this.images.star1 = "images/widgets/star1.png";
		this.images.star2 = "images/widgets/star2.png";
		this.images.star3 = "images/widgets/star3.png";

		this.images.labelPaused = "images/widgets/label_paused.png";
		this.images.labelTryAgain = "images/widgets/label_try_again.png";
		this.images.labelPerfect = "images/widgets/label_perfect.png";
		this.images.labelGood = "images/widgets/label_good.png";
		this.images.labelExcellent = "images/widgets/label_excellent.png";

		this.images.buttonPause = "images/widgets/button_pause.png";
		this.images.buttonMenu = "images/widgets/button_menu.png";
		this.images.buttonRestart = "images/widgets/button_restart.png";
		this.images.buttonResume = "images/widgets/button_resume.png";
		this.images.buttonDone = "images/widgets/button_done.png";
		this.images.buttonRetry = "images/widgets/button_retry.png";
		this.images.buttonNext = "images/widgets/button_next.png";

		this.images.eggs = [
			"images/grouping_game/eggs/egg1.png",
			"images/grouping_game/eggs/egg2.png",
			"images/grouping_game/eggs/egg3.png",
			"images/grouping_game/eggs/egg4.png",
			"images/grouping_game/eggs/egg5.png",
			"images/grouping_game/eggs/egg6.png",
			"images/grouping_game/eggs/egg7.png",
			"images/grouping_game/eggs/egg8.png",
			"images/grouping_game/eggs/egg9.png"
		];
		
		// sounds
		this.sounds = {};
		this.sounds.acceptEgg = "sounds/grouping_game/accept_egg.mp3";
		this.sounds.declineEgg = "sounds/grouping_game/reject_egg.mp3";
		this.sounds.select = "sounds/menu/menu_select.mp3";
		this.sounds.wrapUp = "sounds/grouping_game/wrap_up.mp3";
		this.sounds.done = "sounds/grouping_game/done.mp3";
		this.sounds.background = "sounds/background_music/game.mp3";
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function() {
		this.view = new GroupingGameView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		// ==================================================
		// SETTING VIEW VARIABLES
		// ==================================================
		app.view.viewVars = {};
		
		// Number of packs at the origin at the beginning
		app.view.viewVars.initialPackCount = 3;
		
		// Number of eggs at the origin at the beginning
		app.view.viewVars.initialEggCount = 18;
		
		// The areas of the 'ones' belts that accepts the egg
		app.view.viewVars.beltOnesArea = {};
		app.view.viewVars.beltOnesArea.X_ARRAY =      [0.54, 0.48, 0.42, 0.36];
		app.view.viewVars.beltOnesArea.Y_ARRAY =      [0.56, 0.64, 0.72, 0.80];
		app.view.viewVars.beltOnesArea.RADIUS_ARRAY = [0.11, 0.11, 0.11, 0.11];

		// The areas of the 'tens' belts that accepts the egg
		app.view.viewVars.beltTensArea = {};
		app.view.viewVars.beltTensArea.X_ARRAY =      [0.24, 0.18, 0.12];
		app.view.viewVars.beltTensArea.Y_ARRAY =      [0.56, 0.64, 0.72];
		app.view.viewVars.beltTensArea.RADIUS_ARRAY = [0.11, 0.11, 0.11];

		// widgets
		app.view.viewVars.rabbitHeadDimensions = {x:0.830, y:0.67, width:0.25, height:0.37};
		app.view.viewVars.rabbitBodyDimensions = {x:0.69, y:0.63, width:0.265, height:0.35};
		//app.view.viewVars.rabbitDimensions = {x:0.69, y:0.25, width:0.265, height:0.75};
		app.view.viewVars.beltDimensions = {x:0, y:0.187, width:0.68, height:0.813};
		app.view.viewVars.thinkCloudDimensions = {x:0.62, y:-0.02, width:0.41, height:0.45};
		app.view.viewVars.thinkCloudTextLocation = {x:0.68, y:0.08};
		app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
		app.view.viewVars.numberWidgetDimensions = {onesX: 0.52, onesY: 0.28, tensX: 0.26, tensY: 0.28};
		app.view.viewVars.doneButtonDimensions = {x:0.02, y:0.25, width:0.15, height:0.2};
		
		// Tray and cover sizes and positions
		app.view.viewVars.traySize = {width:0.395, height:0.42};
		app.view.viewVars.trayCurrentPosition = {x:0.25, y:0.415};
		app.view.viewVars.trayNextPosition = {x:0.05, y:0.71};
		app.view.viewVars.trayBelowNextPosition = {x:-0.15, y:1.005};
		app.view.viewVars.initialCoverPosition = {x:0.25, y:-0.415};

		// Initial egg positions
		app.view.viewVars.initialEggRectangle = {x:0.70, y:0.72, width:0.2, height:0.01};
		app.view.viewVars.initialEggSize = {width:0.075, height:0.116};
		
		// Initial pack positions
		app.view.viewVars.initialPackRectangle = {x:0.59, y:0.80, width:0.2, height:0.05};
		app.view.viewVars.initialPackSize = {width:0.2, height:0.2};
		app.view.viewVars.packDestinationLocations = [{x: 0.08, y: 0.485}];
		
		// The destination locations where eggs will be locked in to
		app.view.viewVars.eggDestinationLocations = [
			{x:0.462, y: 0.450},
			{x:0.526, y: 0.452},
			
			{x:0.425, y: 0.502},
			{x:0.487, y: 0.506},
			
			{x:0.386, y: 0.562},
			{x:0.447, y: 0.566},
			
			{x:0.346, y: 0.617},
			{x:0.411, y: 0.623},
			
			{x:0.307, y: 0.678},
			{x:0.368, y: 0.677},
		];
		
		// complements
		app.view.viewVars.compliments = [
			"Good work!",
			"Well done!",
			"Great job!",
			"Nice going!",
			"Great!",
			"Perfect!",
			"Awesome!",
			"Looks good!",
			"Brilliant",
			"Good!",
			"Super!",
			"Superb!"
		];	
		
		// determines whether packs are being used.
		app.view.viewVars.usePacks = true;
		
		if(storage.get("settingMusic") == true){
			music.stopBackgroundMusic();
			music.playBackgroundMusic(this.sounds.background);
		}
		
		this.goalNumber = app.UNIT_GAMES[app.currentUnit][app.currentGame].goalNumber;
		var title = mathUtil.convertNumberToWord(this.goalNumber);
		
		this.view.drawRabbit();
		this.view.drawThinkCloud();
		this.view.drawBelts();
		this.view.drawTrays();
		this.view.drawPauseWidgets();	
		this.view.drawDoneButton();
		this.view.drawEggs();
		this.view.drawNumbers();
		this.view.drawPacks();
		this.view.drawTitle(title);	
		
		app.stage.draw();
		speechUtil.sayNumber(this.goalNumber);
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},
	
	/**
	 * Restart the game
	 * @param {boolean} sameNumber to indicate if restart should restart with the same number
	 */
	restart: function(sameNumber) {
		app.view.titleAnim.stop();
		app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
	},

	/**
	 * Navigate to main menu
	 */
	menu: function() {
		app.view.titleAnim.stop();
		app.route("MenuUnit", null, true);
	},

	/**
	 * Navigate to the next game
	 */
	nextGame: function() {
		app.view.titleAnim.stop();
		if (app.nextGame()) {
			app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
		} else {
			app.route("MenuUnit", null, true);
		}
	},

	/**
	 * Saves the stars achieved by the user to persistent storage
	 * @param {integer} starsCount the number of stars achieved by the user
	 */
	achievedStars: function (starsCount) {
		var unitRecordsModel = new UnitRecordsModel(app.currentUnit);
		if (unitRecordsModel.getStars(app.currentGame) < starsCount) {
			unitRecordsModel.setStars(app.currentGame, starsCount);
		}
	},
	
});
