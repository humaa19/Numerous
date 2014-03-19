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
		this.percentComplete = 0;
		this.percent1Star = 0;
		this.percent2Stars = 0;
		this.percent3Stars = 0;
		this.percentAttempted = 0;
		this.averageAttempts = 0;
		this.averageTime = 0;
		this.practiseAttempts = 0;
		
		this.totalErrors = 0;
		this.dragToTens = 0; //Grouping and Addition: 0
		this.incorrectDone = 0; //Grouping: 1, addition: 4
		this.exceededGoalWithEggs = 0; //Grouping: 2 
		this.packDragToOnes = 0; //Grouping: 3, addition: 2
		this.exceededGoalWithPacks = 0; //Grouping: 4
		this.dragEggToHundreds = 0; //Addition: 1
		this.dragPackToHundreds = 0; //Addition: 3
		this.practiseMistakes = 0;
		
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
		var	buttonBack = new Kinetic.Image({image: this.images.buttonBack});
		widgetUtil.glue(buttonBack, {
			width: 0.10,
			height: 0.17,
			dx: 0.05,
			dy: 0.03
		});
		app.layer.add(buttonBack);
		
		buttonBack.on('click tap', function () {
			app.controller.back();
		});
	},
	
	drawTitle: function() {
		
		var	unitLabel = new Kinetic.Image({image: this.images.unitLabel});
		widgetUtil.glue(unitLabel, {
			width:0.28,
			height:0.10,
			dx: 0.35,
			dy: 0.06
		});
		app.layer.add(unitLabel);
		
		var statisticsHeading = new Kinetic.Image({image: this.images.statisticsHeading});
		widgetUtil.glue(statisticsHeading, {
			width:0.35, 
			height:0.07,
			dx: 0.32,
			dy: 0.18
		});
		app.layer.add(statisticsHeading);
		
	},
	
	drawBlackBoard: function() {
		
		var blackBoard = new Kinetic.Image({image: this.images.blackBoard});
		widgetUtil.glue(blackBoard, {
			width: 0.80,
			height: 0.76,
			dx: 0.10,
			dy: 0.25
		});
		
		app.layer.add(blackBoard);
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
		unitRecordsModel = new UnitRecordsModel(app.controller.currentUnit);
	
		for (var j=0; j < app.UNIT_GAMES[app.controller.currentUnit].length; j++) {
				
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
		
		this.practiseAttempts = unitRecordsModel.getAttempts(app.UNIT_GAMES[app.controller.currentUnit].length - 1);
		
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
			this.averageAttempts = Math.round((totalAttempts/(numberAttempted)));
			this.averageTime = Math.round((totalTime/(numberAttempted)));
		}
		
		var errorsForLevel;
		var errorTypes = new Array();
		errorTypes[0] = 0; //dragToTens //Grouping and Addition: 0
		errorTypes[1] = 0; //incorrectDone //Grouping: 1, addition: 4
		errorTypes[2] = 0; //exceededGoalWithEggs //Grouping: 2 
		errorTypes[3] = 0; //packDragToOnes //Grouping: 3, addition: 2
		errorTypes[4] = 0; //exceededGoalWithPacks //Grouping: 4
		errorTypes[5] = 0; //dragEggToHundreds = 0; //Addition: 1
		errorTypes[6] = 0; //dragPackToHundreds = 0; //Addition: 3
		
		//Overall error statistics - excluding practise questions
		
		unitRecordsModel = new UnitRecordsModel(app.controller.currentUnit);
	
		for (var j=0; j < (app.UNIT_GAMES[app.controller.currentUnit].length - 1); j++) {
			
			errorsForLevel = unitRecordsModel.getErrors(j);
			
			if (errorsForLevel) {
			
				//Errors for grouping games
				if (app.controller.currentUnit == 0 ||  app.controller.currentUnit == 1) {
				
					this.dragToTens = this.dragToTens + (errorsForLevel.split("0").length - 1);
					this.incorrectDone = this.incorrectDone + (errorsForLevel.split("1").length - 1);
					this.exceededGoalWithEggs = this.exceededGoalWithEggs + (errorsForLevel.split("2").length - 1);
					this.packDragToOnes = this.packDragToOnes + (errorsForLevel.split("3").length - 1);
					this.exceededGoalWithPacks = this.exceededGoalWithPacks + (errorsForLevel.split("4").length - 1);
					
				}
				
				//Errors for addition games
				if (app.controller.currentUnit == 2) {
				
					this.dragToTens = this.dragToTens + (errorsForLevel.split("0").length - 1);
					this.dragEggToHundreds = this.dragEggToHundreds + (errorsForLevel.split("1").length - 1);
					this.packDragToOnes = this.packDragToOnes + (errorsForLevel.split("2").length - 1);
					this.dragPackToHundreds = this.dragPackToHundreds + (errorsForLevel.split("3").length - 1);
					this.incorrectDone = this.incorrectDone + (errorsForLevel.split("4").length - 1);
					
				}
			}
		}
		
		//Calculating the total errors made
		this.totalErrors = this.dragToTens + this.incorrectDone + this.exceededGoalWithEggs + this.packDragToOnes + this.exceededGoalWithPacks + this.dragPackToHundreds + this.dragEggToHundreds;
		
		//Number of mistakes made in the practise question
		this.practiseMistakes = unitRecordsModel.getErrors(app.UNIT_GAMES[app.controller.currentUnit].length - 1);
		
	},
	
	drawOverallStatistics: function() {
		
		this.calculateStatistics();
		
		var averageTimeMin = Math.floor(this.averageTime/60000);
		var averageTimeSec = Math.round(((this.averageTime - averageTimeMin*60000)/1000))
		
		if (this.averageAttempts != 0|| this.percentAttempted !=0) {
		
			//Displaying text for completion statistics
			var completeText = new Kinetic.Text({
				x: dimensionUtil.decimalToActualWidth(0.16),
				y: dimensionUtil.decimalToActualHeight(0.38),
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
				x: dimensionUtil.decimalToActualWidth(0.19),
				y: dimensionUtil.decimalToActualHeight(0.42),
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
				x: dimensionUtil.decimalToActualWidth(0.19),
				y: dimensionUtil.decimalToActualHeight(0.46),
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
				x: dimensionUtil.decimalToActualWidth(0.19),
				y: dimensionUtil.decimalToActualHeight(0.50),
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
			
			//Displaying the statistics for attempts
			
			var attemptsText = new Kinetic.Text({
				x: dimensionUtil.decimalToActualWidth(0.16),
				y: dimensionUtil.decimalToActualHeight(0.57),
				width: dimensionUtil.decimalToActualWidth(0.25 / (1/1024*dimensionUtil.width)),
				scaleX: 1/1024*dimensionUtil.width,
				scaleY: 1/768*dimensionUtil.height,
				text: this.percentAttempted + "% Attempted, but not          complete",
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'white',
				align: 'left'
			});
			
			app.layer.add(attemptsText);
			
			var averageAttemptsText = new Kinetic.Text({
				x: dimensionUtil.decimalToActualWidth(0.16),
				y: dimensionUtil.decimalToActualHeight(0.65),
				width: dimensionUtil.decimalToActualWidth(0.25 / (1/1024*dimensionUtil.width)),
				scaleX: 1/1024*dimensionUtil.width,
				scaleY: 1/768*dimensionUtil.height,
				text: "Average no. of attempts per level:  " + this.averageAttempts,
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'white',
				align: 'left'
			});
			
			app.layer.add(averageAttemptsText);
			
			//Altering the text that displays the time depending on minutes spent on the level
			var timeText = "Average time spent on a level:  " + averageTimeMin + " minutes " + averageTimeSec + " seconds";
			
			if (averageTimeMin == 0) {
				timeText = "Average time spent on a level:  " + averageTimeSec + " seconds";
			}
			else if (averageTimeMin == 1) {
				timeText = "Average time spent on a level:  " + averageTimeMin + " minute " + averageTimeSec + " seconds"
			}
			
			var averageTimeText = new Kinetic.Text({
				x: dimensionUtil.decimalToActualWidth(0.16),
				y: dimensionUtil.decimalToActualHeight(0.73),
				width: dimensionUtil.decimalToActualWidth(0.30 / (1/1024*dimensionUtil.width)),
				scaleX: 1/1024*dimensionUtil.width,
				scaleY: 1/768*dimensionUtil.height,
				text: timeText,
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'white',
				align: 'left'
			});
			
			app.layer.add(averageTimeText);
			
			//Displaying the text for the number of mistakes made on the practise level only if its been attempted
			if (this.practiseAttempts != 0) { 
				var practiseMistakesText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.16),
					y: dimensionUtil.decimalToActualHeight(0.81),
					width: dimensionUtil.decimalToActualWidth(0.30 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Number of mistakes made on the practise level:  " + this.practiseMistakes ,
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
			}
			else {
				var practiseMistakesText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.16),
					y: dimensionUtil.decimalToActualHeight(0.81),
					width: dimensionUtil.decimalToActualWidth(0.30 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Practise level has not been attempted",
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
			}
			
			app.layer.add(practiseMistakesText);
			
			//Displaying text for each error as a percentage of total errors
			
			if (this.totalErrors != 0) {
			
				var totalErrorText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.49),
					y: dimensionUtil.decimalToActualHeight(0.38),
					width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Total errors made:  " + this.totalErrors,
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
				
				app.layer.add(totalErrorText);
				
				var dragToTensText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.52),
					y: dimensionUtil.decimalToActualHeight(0.42),
					width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Dragging an egg to the tens:  " + this.dragToTens,
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
				
				app.layer.add(dragToTensText);
				
				var packDragToOnesText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.52),
					y: dimensionUtil.decimalToActualHeight(0.46),
					width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Dragging a pack to the ones:  " + this.packDragToOnes,
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
				
				app.layer.add(packDragToOnesText);
				
				var incorrectDoneText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.52),
					y: dimensionUtil.decimalToActualHeight(0.50),
					width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "Goal number of eggs not reached:  " + this.incorrectDone,
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
				
				app.layer.add(incorrectDoneText);
				
				//Errors specific to the unit only displayed
				if (app.controller.currentUnit == 0 || app.controller.currentUnit == 1){
					
					var exceededGoalWithEggsText = new Kinetic.Text({
						x: dimensionUtil.decimalToActualWidth(0.52),
						y: dimensionUtil.decimalToActualHeight(0.57),
						width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
						scaleX: 1/1024*dimensionUtil.width,
						scaleY: 1/768*dimensionUtil.height,
						text: "Number of eggs exceeded:  " + this.exceededGoalWithEggs,
						fontSize: 25,
						fontFamily: 'mainFont',
						fill: 'white',
						align: 'left'
					});
				
					app.layer.add(exceededGoalWithEggsText);
					
					var exceededGoalWithPacksText = new Kinetic.Text({
						x: dimensionUtil.decimalToActualWidth(0.52),
						y: dimensionUtil.decimalToActualHeight(0.61),
						width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
						scaleX: 1/1024*dimensionUtil.width,
						scaleY: 1/768*dimensionUtil.height,
						text: "Number of packs exceeded:  " + this.exceededGoalWithPacks,
						fontSize: 25,
						fontFamily: 'mainFont',
						fill: 'white',
						align: 'left'
					});
				
					app.layer.add(exceededGoalWithPacksText);
					
				}
				else if (app.controller.currentUnit == 2) {
					
					var dragEggToHundredsText = new Kinetic.Text({
						x: dimensionUtil.decimalToActualWidth(0.52),
						y: dimensionUtil.decimalToActualHeight(0.57),
						width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
						scaleX: 1/1024*dimensionUtil.width,
						scaleY: 1/768*dimensionUtil.height,
						text: "Dragging an egg to the hundreds:  " + this.dragEggToHundreds,
						fontSize: 25,
						fontFamily: 'mainFont',
						fill: 'white',
						align: 'left'
					});
				
					app.layer.add(dragEggToHundredsText);
					
					var dragPackToHundredsText = new Kinetic.Text({
						x: dimensionUtil.decimalToActualWidth(0.52),
						y: dimensionUtil.decimalToActualHeight(0.64),
						width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
						scaleX: 1/1024*dimensionUtil.width,
						scaleY: 1/768*dimensionUtil.height,
						text: "Dragging a pack to the hundreds:  " + this.dragPackToHundreds,
						fontSize: 25,
						fontFamily: 'mainFont',
						fill: 'white',
						align: 'left'
					});
				
					app.layer.add(dragPackToHundredsText);
					
				}
			}
			else {
				
				var noErrorsText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.49),
					y: dimensionUtil.decimalToActualHeight(0.38),
					width: dimensionUtil.decimalToActualWidth(0.32 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "No errors made",
					fontSize: 25,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'left'
				});
				
				app.layer.add(noErrorsText);
			}
		}
		else {
		
			var noStatisticsText = new Kinetic.Text({
					x: dimensionUtil.decimalToActualWidth(0.30),
					y: dimensionUtil.decimalToActualHeight(0.40),
					width: dimensionUtil.decimalToActualWidth(0.40 / (1/1024*dimensionUtil.width)),
					scaleX: 1/1024*dimensionUtil.width,
					scaleY: 1/768*dimensionUtil.height,
					text: "No statistics to display for this unit",
					fontSize: 32,
					fontFamily: 'mainFont',
					fill: 'white',
					align: 'center'
				});
				
				app.layer.add(noStatisticsText);
		
		}
	}
});