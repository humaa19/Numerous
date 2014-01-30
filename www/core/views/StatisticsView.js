/**
 * @class Class to help coordinate the view of the statistics menu screen
 */
var StatisticsView = new Class( /** @lends StatisticsView.prototype */ {
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
		this.percentComplete = 0;
		this.percent1Star = 0;
		this.percent2Stars = 0;
		this.percent3Stars = 0;
		this.percentAttempted = 0;
		this.percentNotAttempted = 0;
		this.averageAttempts = 0;
		this.averageTime = 0;
		this.maxErrorString = null;
		
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
	
	/**
	 * Draw the buttons for each unit
	 */
	drawUnitButtons: function() {
		
		//Will have to be manually extended if more units are added...
		var unit1Button = new Kinetic.Image({image: this.images.unitLabels[0]});
		widgetUtil.glue(unit1Button, {
			width:0.28,
			height:0.10,
			dx:0.07,
			dy:0.35
		});
		app.layer.add(unit1Button);
		
		unit1Button.on('click tap', function () {
			music.play(app.view.sounds.select);
			//new view
			app.controller.unitOne();
		});
		
		var unit2Button = new Kinetic.Image({image: this.images.unitLabels[1]});
		widgetUtil.glue(unit2Button, {
			width:0.28,
			height:0.10,
			dx:0.07,
			dy:0.50
		});
		app.layer.add(unit2Button);
		
		unit2Button.on('click tap', function () {
			music.play(app.view.sounds.select);
			//new view
			app.controller.unitTwo();
		});
		
		var unit3Button = new Kinetic.Image({image: this.images.unitLabels[2]});
		widgetUtil.glue(unit3Button, {
			width:0.28,
			height:0.10,
			dx:0.07,
			dy:0.65
		});
		app.layer.add(unit3Button);
		
		unit3Button.on('click tap', function () {
			music.play(app.view.sounds.select);
			//new view
			app.controller.unitThree();
		});
		
		var chooseUnitText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.01),
			y: dimensionUtil.decimalToActualHeight(0.25),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "Select a Unit",
			fontSize: 40,
			fontFamily: 'mainFont',
			fontStyle: 'bold',
			fill: 'black',
			align: 'center'
		});
		app.layer.add(chooseUnitText);
	},
	
	calculateStatistics: function() {
		
		var starsForLevel;
		var attemptsForLevel;
		var timeForLevel;
		var totalNumberOfGames = 0;
		var unitRecordsModel;
		var numberComplete = 0;
		var numberWith1Star = 0;
		var numberWith2Stars = 0;
		var numberWith3Stars = 0;
		var numberAttempted = 0;
		var totalAttempts = 0;
		var numberNotAttempted = 0;
		var totalTime = 0;
		
		//Retrieving statistics from persistent storage for each level
		for(var i = 0; i < app.UNIT_GAMES.length; i++) {
			unitRecordsModel = new UnitRecordsModel(i);
		
			for (var j=0; j < app.UNIT_GAMES[i].length; j++) {
					
				starsForLevel = unitRecordsModel.getStars(j);
				attemptsForLevel = unitRecordsModel.getAttempts(j);
				timeForLevel = unitRecordsModel.getTime(j);
				
				totalAttempts = totalAttempts + attemptsForLevel;
				totalTime = totalTime + timeForLevel;
				
				switch (starsForLevel) {
					case 0:
						if (attemptsForLevel != 0) {
							numberAttempted++;
						}
						else {
							numberNotAttempted++;
						}
					break;
					case 1:
						numberWith1Star++;
						numberComplete++;
					break;
					case 2:
						numberWith2Stars++;
						numberComplete++;
					break;			
					case 3:
						numberWith3Stars++;
						numberComplete++;
					break;	
				}
				totalNumberOfGames++;
			}
		}
		
		//Calculating overall statistics
		if (numberComplete != 0) {
			this.percentComplete = Math.round((numberComplete/totalNumberOfGames)*100);
			this.percent1Star = Math.round((numberWith1Star/numberComplete)*100);
			this.percent2Stars = Math.round((numberWith2Stars/numberComplete)*100);
			this.percent3Stars =  Math.round((numberWith3Stars/numberComplete)*100);
			this.averageTime = Math.round((totalTime/(numberComplete+numberAttempted)));
			this.averageAttempts = Math.round((totalAttempts/(numberComplete+numberAttempted)));
		}
		
		if (numberAttempted != 0) {
			this.percentAttempted = Math.round((numberAttempted/totalNumberOfGames)*100);
		}
		
		if (numberNotAttempted != 0) {
			this.percentNotAttempted = Math.round((numberNotAttempted/totalNumberOfGames)*100);
		}
		
		
		var errorsForLevel;
		var totalErrors;
		var errorTypes = new Array();
		errorTypes[0] = 0; //dragToTens //Grouping and Addition: 0
		errorTypes[1] = 0; //incorrectDone //Grouping: 1, addition: 4
		errorTypes[2] = 0; //exceededGoalWithEggs //Grouping: 2 
		errorTypes[3] = 0; //packDragToOnes //Grouping: 3, addition: 2
		errorTypes[4] = 0; //exceededGoalWithPacks //Grouping: 4
		errorTypes[5] = 0; //dragEggToHundreds = 0; //Addition: 1
		errorTypes[6] = 0; //dragPackToHundreds = 0; //Addition: 3
		
		//Overall error statistics - excluding practise questions
		for(var i = 0; i < app.UNIT_GAMES.length; i++) {
			unitRecordsModel = new UnitRecordsModel(i);
		
			for (var j=0; j < (app.UNIT_GAMES[i].length - 1); j++) {
				
				errorsForLevel = unitRecordsModel.getErrors(j);
				
				if (errorsForLevel) {
					console.log("Errors for level: " + errorsForLevel)
					console.log("Result of searching for 0: " + errorsForLevel.search("0"));
				
				
					//Errors for grouping games
					if (i == 0 ||  i == 1) {
					
						if (errorsForLevel.search("0") != -1){
							errorTypes[0]++;
							totalErrors++
							console.log("Error found");
						}
						if (errorsForLevel.search("1") != -1){
							errorTypes[1]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("2") != -1){
							errorTypes[2]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("3") != -1){
							errorTypes[3]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("4") != -1){
							errorTypes[4]++;
							totalErrors++;
							console.log("Error found");
						}
					}
					
					//Errors for addition games
					if (i == 2) {
					
						if (errorsForLevel.search("0") != -1){
							errorTypes[0]++;
							totalErrors++
							console.log("Error found");
						}
						if (errorsForLevel.search("1") != -1){
							errorTypes[5]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("2") != -1){
							errorTypes[3]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("3") != -1){
							errorTypes[6]++;
							totalErrors++;
							console.log("Error found");
						}
						if (errorsForLevel.search("4") != -1){
							errorTypes[1]++;
							totalErrors++;
							console.log("Error found");
						}
					}
				}
			}
		}
		
		//Finding the most frequent error made overall
		var maxNumberOfErrors = errorTypes[0];
		var	maxErrorType = 0; 	
		for (var i=1; i < errorTypes.length; i++) {
			if (errorTypes[i] > maxNumberOfErrors) {
				maxErrorType = i;
				maxNumberOfErrors = errorTypes[i];
			}
		} 
		
		if (maxNumberOfErrors == 0) {
			this.maxErrorString = "No errors made";
		}
		else if (maxErrorType == 0) {
			this.maxErrorString = "Most frequent error made: Dragging an egg to the tens section";
		}
		else if (maxErrorType == 1) {
			this.maxErrorString = "Most frequent error made: Incorrect number done";
		}
		else if (maxErrorType == 2) {
			this.maxErrorString = "Most frequent error made: Exceeded the goal number with the number of eggs";
		}
		else if (maxErrorType == 3) {
			this.maxErrorString = "Most frequent error made: Dragging an egg to the tens section";
		}
		else if (maxErrorType == 4) {
			this.maxErrorString = "Most frequent error made: Exceeded the goal number with the number of packs";
		}
		else if (maxErrorType == 5) {
			this.maxErrorString = "Most frequent error made: Dragging an egg to the hundreds section";
		}
		else if (maxErrorType == 6) {
			this.maxErrorString = "Most frequent error made: Dragging a pack to the hundreds section";
		}
		
	},
	
	drawStatisticsText: function() {
		
		this.calculateStatistics();
		
		var averageTimeMin = Math.floor(this.averageTime/60000);
		var averageTimeSec = Math.round(((this.averageTime - averageTimeMin*60000)/1000))
		
		console.log("Completed: " + this.percentComplete + "%");
		console.log("1 star: " + this.percent1Star + "%");
		console.log("2 stars: " + this.percent2Stars + "%");
		console.log("3 stars: " + this.percent3Stars + "%");
		console.log("Attempted: " + this.percentAttempted + "%");
		console.log("Not Attempted: " + this.percentNotAttempted + "%");
		console.log("Average attempts: " + this.averageAttempts);
		console.log("Average time spent on a level: " + this.averageTime + "ms");
		var minutes = Math.floor(this.averageTime/60000);
		console.log("Average time spent on a level: " + minutes + " minutes " + Math.round(((this.averageTime - minutes*60000)/1000)) + " seconds");
		
		// blackBoard
		var blackBoard = new Kinetic.Image({image: this.images.blackBoard});
		widgetUtil.glue(blackBoard, {
			width: 0.62,
			height: 0.65,
			dx: 0.37,
			dy: 0.20
		});
		
		app.layer.add(blackBoard);
		
		var title = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.48),
			y: dimensionUtil.decimalToActualHeight(0.30),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "Overall Statistics",
			fontSize: 30,
			fontFamily: 'mainFont',
			fontStyle: 'bold',
			fill: 'white',
			align: 'center'
		});
		
		app.layer.add(title);
		
		var completeText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.42),
			y: dimensionUtil.decimalToActualHeight(0.37),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percentComplete + "% Complete",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(completeText);
		
		var oneStarText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.45),
			y: dimensionUtil.decimalToActualHeight(0.41),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percent1Star + "% with 1 star",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(oneStarText);
		
		var twoStarsText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.45),
			y: dimensionUtil.decimalToActualHeight(0.45),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percent2Stars + "% with 2 stars",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(twoStarsText);
		
		var threeStarsText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.45),
			y: dimensionUtil.decimalToActualHeight(0.49),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percent3Stars + "% with 3 stars",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(threeStarsText);
		
		var attemptsText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.42),
			y: dimensionUtil.decimalToActualHeight(0.56),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percentAttempted + "% Attempted",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(attemptsText);
		
		var notAttemptedText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.42),
			y: dimensionUtil.decimalToActualHeight(0.60),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.percentNotAttempted + "% Not Attempted",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(notAttemptedText);
		
		var averageAttemptsText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.42),
			y: dimensionUtil.decimalToActualHeight(0.64),
			width: dimensionUtil.decimalToActualWidth(0.4 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "Average no. of attempts: " + this.averageAttempts,
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(averageAttemptsText);
		
		var averageTimeText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.68),
			y: dimensionUtil.decimalToActualHeight(0.37),
			width: dimensionUtil.decimalToActualWidth(0.28 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "Average time spent on a level: " + averageTimeMin + " minutes " + averageTimeSec + " seconds",
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(averageTimeText);
		
		var maxErrorText = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.68),
			y: dimensionUtil.decimalToActualHeight(0.50),
			width: dimensionUtil.decimalToActualWidth(0.28 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: this.maxErrorString,
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'white',
			align: 'left'
		});
		
		app.layer.add(maxErrorText);
	},
	
});