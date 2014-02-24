/**
 * @class The controller to control the practive view for unit 3
 */
var Practice3Controller = new Class( /** @lends Practice3Controller.prototype */ {
		
	/**
	 * Constructor
	 */
	initialize: function () {

		// Images. These will automatically be loaded
		this.images = {};
		
		this.images.rabbitBody = "images/grouping_game/practice/rabbit_body.png";
		this.images.rabbitHead = "images/grouping_game/practice/rabbit_head.png";
		this.images.blackBoard = "images/grouping_game/practice/black_board.png";
		
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
		this.images.buttonNextBig = "images/grouping_game/practice/button_next_big.png";
		
		this.images.eggs = [
			"images/grouping_game/practice/egg1.png",
			"images/grouping_game/practice/egg2.png",
			"images/grouping_game/practice/egg3.png",
			"images/grouping_game/practice/egg4.png",
			"images/grouping_game/practice/egg5.png",
			"images/grouping_game/practice/egg6.png",
			"images/grouping_game/practice/egg7.png",
			"images/grouping_game/practice/egg8.png",
			"images/grouping_game/practice/egg9.png"
		];
		this.images.placeHolderEgg = "images/grouping_game/practice/egg0.png";
		
		// sounds
		this.sounds = {};
		this.sounds.acceptEgg = "sounds/grouping_game/accept_egg.mp3";
		this.sounds.declineEgg = "sounds/grouping_game/reject_egg.mp3";
		this.sounds.select = "sounds/menu/menu_select.mp3";
		this.sounds.next = "sounds/grouping_game/done.mp3";
		this.sounds.background = "sounds/background_music/game.mp3";
		//view.draw();
	},

	/**
	 * Callback that is called when all images are loaded.
	 * So that the controller can tell the view to start presenting
	 */
	start: function () {
		this.view = new PracticeView(this);
		app.view = this.view;
		
		//dimensions
		app.view.viewVars = {};
		app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
		
		this.keyboardTexts = this.createKeyboardTexts(); 
		
		// variables
		this.mistakesCount = 0;
		this.activitiesEnabled = true;
		this.keyboardEnabled = true;
		
		//score
		app.view.allowableErrorsCount = 6;
		app.view.errorsMade = 0;
		app.view.errorsRange = 2;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		if(storage.get("settingMusic") == true){
			music.stopBackgroundMusic();
			music.playBackgroundMusic(this.sounds.background);
		}
		
		this.view.drawBlackBoard();
		this.view.drawRabbit();
		this.view.drawQuestion();
		this.view.drawKeyboard();
		this.view.drawPauseWidgets();
		this.view.drawButtonNextBig();
		//this.view.questionCallback();
		
		app.stage.draw();
		
		this.pickQuestions();
		
		this.currentQuestion = -1;
		this.nextQuestion();
	},

	/**
	 * Destructor
	 */
	finalize: function() {
		
	},

	/**
	 * Presents the next quesiton
	 */
	nextQuestion: function() {
		this.currentQuestion++;
		if (this.currentQuestion >= this.gameQuestions.length) {
			return false;
		}
		
		var questionObject = this.gameQuestions[this.currentQuestion];
		
		var progressText = "" + (this.currentQuestion+1) + " / " + this.gameQuestions.length;
		var questionText = questionObject.questionText;
		var keyboardTexts = questionObject.keyboardTexts;
		var correctAnswerId = questionObject.correctAnswerId;
		
		this.view.presentNextQuestion(questionText, progressText, keyboardTexts, correctAnswerId);
		
		
		return true;
	},

	/**
	 * Restart the game
	 * @param {boolean} sameNumber to indicate if restart should restart with the same number
	 */
	restart: function(sameNumber) {
		app.route("Practice3", null, true);
	},
	
	/**
	 * Navigates into the main menu
	 */
	menu: function() {
		
		app.route("MenuUnit", null, true);
	},

	/**
	 * Picks the set of questions for this practice and stores it into this.gameQuestions field.
	 */
	pickQuestions: function() {
		this.gameQuestions = [];
		
		var list = [];
		for(var i = 21; i < 100; i++) {
			list.push(i);
		}
		
		list = arrayUtil.shuffleArray(list);
		
		// first set
		for(var questionNumber = 0; questionNumber < 17; questionNumber++) {
			
			// skip these questions
			if (questionNumber >= 4 && questionNumber <= 8) continue;
		
			var num = list.pop();
			var ones = mathUtil.getOnes(num);
			var tens = mathUtil.getTens(num);
			var onesWord = mathUtil.convertNumberToWord(ones);
			var tensWord = mathUtil.convertNumberToWord(tens);
			var word = mathUtil.convertNumberToWord(num);
			var gameQuestion = {};

			
			var q = additionGameHelper.generateQuestion(questionNumber);
			gameQuestion.questionText = "" + q.left + " + " + q.right + " = ___";
			
			switch(questionNumber) {
				case 0:
				case 1:
				case 2:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(0,20,1), q.answer, 9);
				break;
				case 3:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(10,30,1), q.answer, 9);
				break;
				case 9:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(50,70,1), q.answer, 9);
				break;
				case 10:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(0,100,10), q.answer, 9);
				break;
				case 11:
				case 12:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(90,110,1), q.answer, 9);
				break;
				case 13:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(0,190,10), q.answer, 9);
				break;
				case 14:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(110,130,1), q.answer, 9);
				break;
				case 15:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(120,140,1), q.answer, 9);
				break;
				case 16:
					gameQuestion.keyboardTexts = keyboardTextsGenerator.generate(arrayUtil.generateNumberArray(100,199,1), q.answer, 9);
				break;
			}
			
			gameQuestion.correctAnswerId = gameQuestion.keyboardTexts.indexOf(q.answer);
			
			this.gameQuestions.push(gameQuestion);
		}
		
		
	},

	/**
	 * Record an increase in the number of mistakes made
	 */
	mistakeMade: function() {
		this.mistakesCount++;
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
	
	/**
	 * Creates the keyboard for the current game
	 * @returns {array} a array of text representing the keyboard
	 */
	createKeyboardTexts: function() {
		var output = [];
		output.push(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
		
		var numberList = [];
		var wordList = [];
		for(var i = 21; i < 100; i++) {
			numberList.push(i.toString());
			wordList.push(mathUtil.convertNumberToWord(i));
		}
		
		output.push(wordList);
		output.push(numberList);
		
		return output;
	},
	
});