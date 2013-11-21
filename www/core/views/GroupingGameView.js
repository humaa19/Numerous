/**
 * @class Class to help coordinate the view of the grouping games
 */
var GroupingGameView = new Class ( /** @lends GroupingGameView.prototype */ {
	Extends: View,
	
	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function (controller) {
		this.controller = controller;
		
		// error types
		this.ERROR_TYPES = {
			DRAG_TO_TENS : 0,
			INCORRECT_DONE : 1,
			EXCEEDED_GOAL_NUMBER_WITH_EGGS : 2,
			PACK_DRAG_TO_ONES : 3,
			EXCEEDED_GOAL_NUMBER_WITH_PACKS : 4,
		}	
		
		
		// pack count
		this.packCount = 0;
		
		// Array holding packs initial locations of when it was randomly generated
		this.packInitialLocations = [];
		
		// A count of all eggs that have been generated
		this.eggCount = 0;
		
		// Array of the eggs currently on the tray at ones
		this.eggsAtDestination = [];
		
		// Array holding eggs initial locations of when it was randomly generated
		this.eggInitialLocations = [];
		
		// As the images are loaded into memory, they will be accessible from this array
		this.eggImageObjects = [];
		
		// Variable for controlling whether activities are enabled (should be turned off during animations)
		this.activitiesEnabled = true;
		
		// timeouts to clear
		this.timeOuts = [];
		
		// number of mistakes made
		this.errorsMade = 0;
		
		// Number of allowable errors
		this.allowableErrorsCount = 3;
		
		// create the egg ones group
		this.onesWidgetGroup = new Kinetic.Group({});
		app.layer.add(this.onesWidgetGroup);
	},
	

	/**
	 * Destructor
	 */
	finalize : function () {
		for(var i = 0; i < this.timeOuts.length; i++) {
			clearTimeout(this.timeOuts[i]);
		}
		this.timeOuts = [];
	},

	/**
	 * Draw rabbit
	 */
	drawRabbit : function () {
		var rabbitBody = new Kinetic.Image({image: this.images.rabbitBody});
		widgetUtil.glue(rabbitBody, {
			width: this.viewVars.rabbitBodyDimensions.width,
			height: this.viewVars.rabbitBodyDimensions.height,
			dx: this.viewVars.rabbitBodyDimensions.x,
			dy: this.viewVars.rabbitBodyDimensions.y
		});
		app.layer.add(rabbitBody);
		
		var rabbitHead = new Kinetic.Image({
			image: this.images.rabbitHead,
			
			offset: [
				dimensionUtil.decimalToActualWidth(this.viewVars.rabbitHeadDimensions.width/2),
				dimensionUtil.decimalToActualHeight(this.viewVars.rabbitHeadDimensions.height)
			]
		});
		widgetUtil.glue(rabbitHead, {
			width: this.viewVars.rabbitHeadDimensions.width,
			height: this.viewVars.rabbitHeadDimensions.height,
			dx: this.viewVars.rabbitHeadDimensions.x,
			dy: this.viewVars.rabbitHeadDimensions.y
		});
		app.layer.add(rabbitHead);
		
		app.view.anim1 = new Kinetic.Animation(function(frame) {
			  var angleDiff = frame.timeDiff * (Math.PI / 2) / 2000;
			  rabbitHead.rotate(angleDiff);
		}, app.layer);
		
		app.view.anim2 = new Kinetic.Animation(function(frame) {
			  var angleDiff = -frame.timeDiff * (Math.PI / 2) / 2000;
			  rabbitHead.rotate(angleDiff);
		}, app.layer);

	},

	/**
	 * Set animation for rabbit
	 */
	shakeHead : function () {
		if(!app.view.anim1.isRunning() && !app.view.anim2.isRunning()){
			app.view. anim1.start();
			setTimeout(function(){
				app.view.anim1.stop();
				app.view.anim2.start();
			}, 300);
			setTimeout(function(){
				app.view.anim2.stop();
				app.view.anim1.start();
			}, 900);
			
			setTimeout(function(){
				app.view.anim1.stop();
			}, 1200);
		}
	},
	
	/**
	 * Draw the think cloud
	 */
	drawThinkCloud : function () {
		
		// think cloud
		this.thinkCloud = new Kinetic.Image({image: this.images.thinkCloud});
		widgetUtil.glue(this.thinkCloud, {
			width: this.viewVars.thinkCloudDimensions.width,
			height: this.viewVars.thinkCloudDimensions.height,
			dx: this.viewVars.thinkCloudDimensions.x,
			dy: this.viewVars.thinkCloudDimensions.y
		});
		app.layer.add(this.thinkCloud);
		
		// text in the think cloud
		this.thinkCloudTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(this.viewVars.thinkCloudTextLocation.x),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.thinkCloudTextLocation.y),
			width: dimensionUtil.decimalToActualWidth(0.28 / (1/1024*dimensionUtil.width)),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'black',
			align: 'center',
			lineHeight: 1.3
		});
		app.layer.add(this.thinkCloudTextWidget);
		this.displayThinkCloud("Drag " + mathUtil.convertNumberToWord(app.controller.goalNumber) + " of my easter eggs onto the belt!");
	},

	/**
	 * Displays a message in the think cloud
	 * @param {string} message want to display
	 * @param {integer} fontsize
	 */
	displayThinkCloud : function(message, fontSize) {
		if (fontSize == null) {
			fontSize = 25;
		}

		this.thinkCloudTextWidget.setFontSize(fontSize);
		this.thinkCloudTextWidget.setText(message);
		app.stage.draw();
	},

	/**
	 * Draws the belts
	 */
	drawBelts : function() {
		var belts = new Kinetic.Image({image: this.images.belts});
		widgetUtil.glue(belts, {
			width: this.viewVars.beltDimensions.width,
			height: this.viewVars.beltDimensions.height,
			dx: this.viewVars.beltDimensions.x,
			dy: this.viewVars.beltDimensions.y
		});
		app.layer.add(belts);
	},

	/**
	 * Draws the two trays (has the animation logic here)
	 */
	drawTrays : function() {

		this.trays = {};
		
		// tray current
		this.trays.current = new Kinetic.Image({image: this.images.tray});
		widgetUtil.glue(this.trays.current, {
			width: this.viewVars.traySize.width,
			height: this.viewVars.traySize.height,
			dx: this.viewVars.trayCurrentPosition.x,
			dy: this.viewVars.trayCurrentPosition.y
		});
		this.onesWidgetGroup.add(this.trays.current);
		
		// tray next
		this.trays.next = new Kinetic.Image({image: this.images.tray});
		widgetUtil.glue(this.trays.next, {
			width: this.viewVars.traySize.width,
			height: this.viewVars.traySize.height,
			dx: this.viewVars.trayNextPosition.x,
			dy: this.viewVars.trayNextPosition.y
		});
		
		app.layer.add(this.onesWidgetGroup);
		app.layer.add(this.trays.next);
	},

	/**
	 * Draws the number the student needs to perform
	 * @param {string} title word of number for the title place
	 */
	drawTitle : function(title) {
		this.titleTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.15),
			y: dimensionUtil.decimalToActualHeight(0.02),
			
			scaleX: 0,
			scaleY: 0,
				text: title,
			fontFamily: 'mainFont',
				fontSize: 95,
			fill: 'black', // #2B8F4E
			lineJoin: 'round',
			fontStyle: 'bold',
					shadowColor: 'gold',
					shadowBlur: 30,
					shadowOffset: 0,
					shadowOpacity: 1
			});
		 app.layer.add(this.titleTextWidget);
		
		setTimeout(function() {
			var flyIn = new Kinetic.Tween({
				node: app.view.titleTextWidget,
				duration: 0.7,
				
				scaleX: 1/1024*dimensionUtil.width,
				scaleY: 1/768*dimensionUtil.height,
				x: dimensionUtil.decimalToActualWidth(0.15),
				y: dimensionUtil.decimalToActualHeight(0.02),
				
			});
			flyIn.play();
		}, 300);
	 
	 
		this.titleAnim = new Kinetic.Animation(function(frame) {
					app.view.titleTextWidget.setShadowOpacity(Math.sin(frame.time * 2 * Math.PI / 2000));
					app.view.titleTextWidget.setX(dimensionUtil.decimalToActualWidth(0.03) * Math.sin(frame.time * 2 * Math.PI / 2000) + dimensionUtil.decimalToActualWidth(0.17));
			}, app.layer);
		 
		 this.titleAnim.start();
			
					
		

	},

	/**
	 * Draws the done button
	 */
	drawDoneButton : function() {
		var buttonDone = new Kinetic.Image({image: this.images.buttonDone});
		widgetUtil.glue(buttonDone, {
			width: this.viewVars.doneButtonDimensions.width,
			height: this.viewVars.doneButtonDimensions.height,
			dx: this.viewVars.doneButtonDimensions.x,
			dy: this.viewVars.doneButtonDimensions.y
		});
		
		buttonDone.on('click tap', function () {
			music.play(app.view.sounds.done);
			var total = app.view.calculateTotal();
			if (total == app.controller.goalNumber) {
				app.view.finish(app.view.allowableErrorsCount - app.view.errorsMade);
			} else {
				app.view.shakeHead();
				app.view.errorMade(app.view.ERROR_TYPES.INCORRECT_DONE);	
			}
		});
		
		app.layer.add(buttonDone);
	},

	/**
	 * Draws the number in the "tens" and "ones" boxes
	 */
	drawNumbers : function() {

		// ones number
		this.onesTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(this.viewVars.numberWidgetDimensions.onesX),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.numberWidgetDimensions.onesY),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: 0,
			fontSize: 110,
			fontFamily: 'mainFont',
			fill: 'black'
		});
		app.layer.add(this.onesTextWidget);
		
		// tens number
		this.tensTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(this.viewVars.numberWidgetDimensions.tensX),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.numberWidgetDimensions.tensY),
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: 0,
			fontSize: 110,
			fontFamily: 'mainFont',
			fill: 'black'
		});
		app.layer.add(this.tensTextWidget);
	},
	
	/**
	 * Draws all the packs
	 */
	drawPacks : function () {
		for (var i=0; i<this.viewVars.initialPackCount; i++) {
			this.drawNewPack();
		}
	},

	/**
	 * Draws one new pack
	 */
	drawNewPack : function () {
		var pack = new Kinetic.Image({
			image: this.images.pack,
			draggable: true
		});	
		
		pack.id = this.packCount;	
		this.packCount++;
		
		var xInit = mathUtil.random(this.viewVars.initialPackRectangle.x * 100, (this.viewVars.initialPackRectangle.x + this.viewVars.initialPackRectangle.width)*100)/100;
		var yInit = mathUtil.random(this.viewVars.initialPackRectangle.y * 100, (this.viewVars.initialPackRectangle.y + this.viewVars.initialPackRectangle.height)*100)/100;
		this.packInitialLocations[pack.id] = {x:xInit, y:yInit};
		widgetUtil.glue(pack, {
			width: this.viewVars.initialPackSize.width,
			height: this.viewVars.initialPackSize.height,
			dx: xInit,
			dy: yInit
		});
		
		var anim = new Kinetic.Animation(function(frame) {
				var dx = -Math.sin(frame.time / 200) * 0.003;
				var dy = Math.sin(frame.time / 200) * 0.003;
				var scaleX = Math.sin(frame.time / 200) * 0.06 + 0.9;
				var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.9;
				// scale x and y
				pack.setScale(scaleX, scaleY);
				pack.setX(dimensionUtil.decimalToActualWidth(xInit + dx));
				pack.setY(dimensionUtil.decimalToActualHeight(yInit + dy));
		}, app.layer);
		
		anim.start();
		pack.on('dragstart', function() { 
			this.moveToTop();
			pack.setScale(1.2, 1.2);
			anim.stop();		});
		pack.on('dragend', function() {
			
			if (app.view.activitiesEnabled == false) {
				app.view.declinePack(this);
				pack.setScale(1, 1);
				anim.start();
				return;
			}
			
			
			
			if (widgetUtil.isNearPoints(this, app.view.viewVars.beltTensArea.X_ARRAY, app.view.viewVars.beltTensArea.Y_ARRAY, app.view.viewVars.beltTensArea.RADIUS_ARRAY)) {
				// dropped it in correct location (so far so good)
				
				if (parseInt(app.view.tensTextWidget.getText()) < mathUtil.getTens(app.controller.goalNumber)) {
					app.view.acceptPack(this);
					pack.setScale(1, 1);
				} else {
					app.view.shakeHead();
					app.view.errorMade(app.view.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_PACKS);
					app.view.declinePack(this);
					anim.start();
				}

			
			} else if (widgetUtil.isNearPoints(this, app.view.viewVars.beltOnesArea.X_ARRAY, app.view.viewVars.beltOnesArea.Y_ARRAY, app.view.viewVars.beltOnesArea.RADIUS_ARRAY)) {
				// dropped pack to ones (error)	
				app.view.declinePack(this);
				anim.start();
				app.view.shakeHead();
				app.view.errorMade(app.view.ERROR_TYPES.PACK_DRAG_TO_ONES);
			} else {
				// dropped somewhere else (doesn't matter)
				app.view.declinePack(this)
				anim.start();;
			}
			
		});
		
		/*
		if (env.debug) {
			pack.on('touchmove dragmove', function() {
				console.log("x:" + dimensionUtil.actualToDecimalWidth(this.getX()) + ", " + "y:" + dimensionUtil.actualToDecimalHeight(this.getY()));
			});
		}
		*/
		
		app.layer.add(pack);
		app.stage.draw();
	},

	/**
	 * Accept pack
	 * @param {Kinetic.Image} pack  pack to be accepted
	 */
	acceptPack : function (pack) {
		
		// say a compliment
		var compliment = this.viewVars.compliments[mathUtil.random(0,this.viewVars.compliments.length-1)];
		this.displayThinkCloud(compliment, 50);

		var tensCount = parseInt(this.tensTextWidget.getText());
		this.tensTextWidget.setText(tensCount+1);
		
		// play the accept egg sound
		music.play(this.sounds.acceptEgg);
		
		// make the egg not draggable
		pack.setDraggable(false);
		
		pack.setX(dimensionUtil.decimalToActualWidth(this.viewVars.packDestinationLocations[tensCount].x));
		pack.setY(dimensionUtil.decimalToActualHeight(this.viewVars.packDestinationLocations[tensCount].y));
		
		app.stage.draw();
		
		// create another egg in its place
		var newPack = this.drawNewPack();
		
		// increase number of eggs
		app.stage.draw();
	},

	/**
	 * Decline pack
	 * @param {Kinetic.Image} pack  pack to be declined
	 */
	declinePack : function (pack) {
		// play the decline egg sound
		music.play(this.sounds.declineEgg);
		widgetUtil.animateMove(pack, 0.4, this.packInitialLocations[pack.id].x, this.packInitialLocations[pack.id].y);
	},

	/**
	 * Draws all the pause widgets then hides them. Shows when the pause function is called
	 */
	drawPauseWidgets : function() {

		// pause button
		var buttonPause = new Kinetic.Image({image: this.images.buttonPause});
		widgetUtil.glue(buttonPause, {
			width: this.viewVars.pauseButtonDimensions.width,
			height: this.viewVars.pauseButtonDimensions.height,
			dx: this.viewVars.pauseButtonDimensions.x,
			dy: this.viewVars.pauseButtonDimensions.y
		});
		app.layer.add(buttonPause);
		buttonPause.on('click tap', function() {
			music.play(app.view.sounds.select);
			app.view.pause();
		});
		
		// pause group
		this.pauseWidgetsGroup = new Kinetic.Group({});

		// overlay
		var overlay = new Kinetic.Rect({
			fill: 'black',
			opacity: 0.62
		});
		widgetUtil.glue(overlay, {
			width: 1,
			height: 1,
			dx: 0,
			dy: 0
		});
		this.pauseWidgetsGroup.add(overlay);	
		
		// paused label
		var labelPaused = new Kinetic.Image({image: this.images.labelPaused});
		widgetUtil.glue(labelPaused, {
			width: 0.3,
			height: 0.1,
			dx: 0.35,
			dy: 0.25
		});
		this.pauseWidgetsGroup.add(labelPaused);

		// resume button
		var buttonResume = new Kinetic.Image({image: this.images.buttonResume});
		widgetUtil.glue(buttonResume, {
			width: 0.18,
			height: 0.25,
			dx: 0.21,
			dy: 0.42
		});
		this.pauseWidgetsGroup.add(buttonResume);
		
		buttonResume.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.view.unpause();
		});
		
		// menu button
		var buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
		widgetUtil.glue(buttonMenu, {
			width: 0.18,
			height: 0.25,
			dx: 0.41,
			dy: 0.42
		});
		this.pauseWidgetsGroup.add(buttonMenu);
		
		buttonMenu.on('click tap', function () {
			music.play(app.view.sounds.select);
			if(storage.get("settingMusic") == true){
				music.stopBackgroundMusic();
			}
			app.controller.menu();
		});
		
		// restart button
		var buttonRestart = new Kinetic.Image({image: this.images.buttonRestart});
		widgetUtil.glue(buttonRestart, {
			width: 0.18,
			height: 0.25,
			dx: 0.61,
			dy: 0.42
		});
		this.pauseWidgetsGroup.add(buttonRestart);
		
		buttonRestart.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.restart(true);
		});
		
		app.layer.add(this.pauseWidgetsGroup);
		this.pauseWidgetsGroup.hide();
	},

	/**
	 * Pause the game
	 */
	pause : function() {
		this.pauseWidgetsGroup.show();
		this.pauseWidgetsGroup.moveToTop();
		app.stage.draw();
	},

	/**
	 * Upause the game
	 */
	unpause : function() {
		this.pauseWidgetsGroup.hide();
		app.stage.draw();
	},

	/**
	 * Draws eggs in a specified area
	 */
	drawEggs : function() {


		for (var i=0; i<this.viewVars.initialEggCount; i++) {
			this.drawNewEgg();
		}
		
		/*if (env.debug) {
			// draw out the region ones
			for (var i = 0; i < this.viewVars.beltOnesArea.RADIUS_ARRAY.length; i++) {
				var ellipse = new Kinetic.Ellipse({
					x: dimensionUtil.decimalToActualWidth(this.viewVars.beltOnesArea.X_ARRAY[i]),
					y: dimensionUtil.decimalToActualHeight(this.viewVars.beltOnesArea.Y_ARRAY[i]),
					radius: 
						{x:dimensionUtil.decimalToActualWidth(this.viewVars.beltOnesArea.RADIUS_ARRAY[i]), 
						y:dimensionUtil.decimalToActualHeight(this.viewVars.beltOnesArea.RADIUS_ARRAY[i])},
					stroke: 'red',
					strokeWidth: 6
				});
				app.layer.add(ellipse);
			}
			
			// draws out the region for tens
			for (var i = 0; i < this.viewVars.beltTensArea.RADIUS_ARRAY.length; i++) {
				var ellipse = new Kinetic.Ellipse({
					x: dimensionUtil.decimalToActualWidth(this.viewVars.beltTensArea.X_ARRAY[i]),
					y: dimensionUtil.decimalToActualHeight(this.viewVars.beltTensArea.Y_ARRAY[i]),
					radius: 
						{x:dimensionUtil.decimalToActualWidth(this.viewVars.beltTensArea.RADIUS_ARRAY[i]), 
						y:dimensionUtil.decimalToActualHeight(this.viewVars.beltTensArea.RADIUS_ARRAY[i])},
					stroke: 'red',
					strokeWidth: 6
				});
				app.layer.add(ellipse);
			}
		}*/
	},

	/**
	 * Draws one egg in a specified area
	 */
	drawNewEgg : function() {
		var egg = new Kinetic.Image({
			image: this.images.eggs[mathUtil.random(0, this.images.eggs.length-1)],
			draggable: true
		});
		
		egg.id = this.eggCount;	
		this.eggCount++;
		
		var xInit = mathUtil.random(this.viewVars.initialEggRectangle.x * 1000, (this.viewVars.initialEggRectangle.x + this.viewVars.initialEggRectangle.width)*1000)/1000;
		var yInit = mathUtil.random(this.viewVars.initialEggRectangle.y * 1000, (this.viewVars.initialEggRectangle.y + this.viewVars.initialEggRectangle.height)*1000)/1000;
		this.eggInitialLocations[egg.id] = {x:xInit, y:yInit};
		
		widgetUtil.glue(egg, {
			width: this.viewVars.initialEggSize.width,
			height: this.viewVars.initialEggSize.height,
			dx: xInit,
			dy: yInit
		});

		var anim = new Kinetic.Animation(function(frame) {
				var dx = -Math.sin(frame.time / 200) * 0.003;
				var dy = Math.sin(frame.time / 200) * 0.003;
				var scaleX = Math.sin(frame.time / 200) * 0.06 + 0.9;
				var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.9;
				// scale x and y
				egg.setScale(scaleX, scaleY);
				egg.setX(dimensionUtil.decimalToActualWidth(xInit + dx));
				egg.setY(dimensionUtil.decimalToActualHeight(yInit + dy));
		}, app.layer);
		
		anim.start();
	   
		egg.on('dragstart', function() { 
		
			this.moveToTop();
			egg.setScale(1.5, 1.5);
			anim.stop();
			
			});
		egg.on('dragend', function() {
			
			if (app.view.activitiesEnabled == false) {
				egg.setScale(1, 1);
				app.view.declineEgg(this);
				anim.start();
				return;
			}
			
			if (widgetUtil.isNearPoints(this, app.view.viewVars.beltOnesArea.X_ARRAY, app.view.viewVars.beltOnesArea.Y_ARRAY, app.view.viewVars.beltOnesArea.RADIUS_ARRAY)) {
				// dropped it in correct location (so far so good)
				
				if (app.view.viewVars.usePacks) {
					// using packs (so eggs should not exceed the goalnumber's ones
					if (parseInt(app.view.onesTextWidget.getText()) < mathUtil.getOnes(app.controller.goalNumber)) {
						egg.setScale(1, 1);
						app.view.acceptEgg(this);
					} else {
						app.view.shakeHead();
						app.view.errorMade(app.view.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS);
						app.view.declineEgg(this);
						anim.start();
					}
				} else {
					// not using packs, so we can accept egg if it is under total number
					if (app.view.eggsAtDestination.length < app.controller.goalNumber) {
						egg.setScale(1, 1);
						app.view.acceptEgg(this);
					} else {
						app.view.shakeHead();
						app.view.errorMade(app.view.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS);
						app.view.declineEgg(this);
						anim.start();
					}
				}
			
			} else if (widgetUtil.isNearPoints(this, app.view.viewVars.beltTensArea.X_ARRAY, app.view.viewVars.beltTensArea.Y_ARRAY, app.view.viewVars.beltTensArea.RADIUS_ARRAY)) {
				// dropped egg in tens (error)	
				app.view.declineEgg(this);
				anim.start();
				app.view.shakeHead();
				app.view.errorMade(app.view.ERROR_TYPES.DRAG_TO_TENS);
			} else {
				// dropped somewhere else (doesn't matter)
				app.view.declineEgg(this);
				anim.start();
			}
			
			if ((!app.view.viewVars.usePacks) && (app.view.eggsAtDestination.length == 10)) {
				app.view.trayFull();
			}
		});
		
		app.layer.add(egg);
	},

	/**
	 * Accepts the egg and add it to the accepted array
	 * @param {Kinetic.Image} egg egg to be accepted
	 */
	acceptEgg : function(egg) {
		this.onesWidgetGroup.moveToTop();
		
		// check to see if total is greater than goal Number
		if (this.calculateTotal() >= app.controller.goalNumber) {
			app.view.shakeHead();
			this.errorMade(this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS);
			this.declineEgg(egg);
			return;
		}
		
		// say a compliment
		var compliment = this.viewVars.compliments[mathUtil.random(0,this.viewVars.compliments.length-1)];
		this.displayThinkCloud(compliment, 50);	
		
		// play the accept egg sound
		music.play(this.sounds.acceptEgg);
		
		// make the egg not draggable
		egg.setDraggable(false);
		// move it to the right position
		var index = this.eggsAtDestination.length;

		// add it to the group
		egg.remove();
		this.onesWidgetGroup.add(egg);
		egg.moveToTop();
		
		egg.fixedX = dimensionUtil.decimalToActualWidth(this.viewVars.eggDestinationLocations[index].x);
		egg.fixedY = dimensionUtil.decimalToActualHeight(this.viewVars.eggDestinationLocations[index].y);
		egg.setX(egg.fixedX);
		egg.setY(egg.fixedY);
		
		// result of stress testing
		setTimeout(function() {
			egg.setX(egg.fixedX);
			egg.setY(egg.fixedY);
			egg.show();
		}, 1000);
		
		app.stage.draw();
		// add it to the destination array
		this.eggsAtDestination.push(egg);
		
		// create another egg in its place
		var newEgg = this.drawNewEgg();
		
		// increase number of eggs
		var ones = this.eggsAtDestination.length;
		if (ones < 10) {
			this.onesTextWidget.setText(ones);
			this.onesTextWidget.draw();
			app.stage.draw();
		}
		
		app.stage.draw();
	},

	/**
	 * Declines the egg and move it back to its original spot
	 * @param {Kinetic.Image} egg to be declined
	 */
	declineEgg : function(egg) {

		// play the decline egg sound
		music.play(this.sounds.declineEgg);
		widgetUtil.animateMove(egg, 0.4, this.eggInitialLocations[egg.id].x, this.eggInitialLocations[egg.id].y);
	},

	/**
	 * Is called when the "ones" tray is full
	 */
	trayFull : function() {
		
		// Disable all performable activities by user
		this.activitiesEnabled = false;
		
		var fallCoverDurationSeconds = 2;
		var trayLiftDurationSeconds = 1;
		var shrinkTrayDurationSeconds = 1;
		var beltSlideDurationSeconds = 1;
		
		// The cover is separated into two parts front (the part that are in front of the eggs) and the back (parts behind the eggs)
		
		// Draw the cover's front
		var coverFront = new Kinetic.Image({image: this.images.coverFront});
		widgetUtil.glue(coverFront, {
			width: this.viewVars.traySize.width,
			height: this.viewVars.traySize.height,
			dx: this.viewVars.initialCoverPosition.x,
			dy: this.viewVars.initialCoverPosition.y
		});
		this.onesWidgetGroup.add(coverFront);
		coverFront.moveToTop();
		
		// Draw the cover's back
		var coverBack = new Kinetic.Image({image: this.images.coverBack});
		widgetUtil.glue(coverBack, {
			width: this.viewVars.traySize.width,
			height: this.viewVars.traySize.height,
			dx: this.viewVars.initialCoverPosition.x,
			dy: this.viewVars.initialCoverPosition.y
		});
		this.onesWidgetGroup.add(coverBack);
		coverBack.moveToBottom();
		
		// redraw the stage
		app.stage.draw();
		
		music.play(app.view.sounds.wrapUp);
		// Make the covers fall onto the tray
		var dropCoverFrontTween = new Kinetic.Tween({
			node: coverFront,
			duration: fallCoverDurationSeconds,
			x: dimensionUtil.decimalToActualWidth(this.viewVars.trayCurrentPosition.x),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.trayCurrentPosition.y)
		});
		
		var dropCoverBackTween = new Kinetic.Tween({
			node: coverBack,
			duration: fallCoverDurationSeconds,
			x: dimensionUtil.decimalToActualWidth(this.viewVars.trayCurrentPosition.x),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.trayCurrentPosition.y),
		});
		dropCoverFrontTween.play();
		dropCoverBackTween.play();
		
		// Make the tray lift up
		this.timeOuts[this.timeOuts.length] = setTimeout(function() {
			var liftTween = new Kinetic.Tween({
				node: app.view.onesWidgetGroup, 
				duration: trayLiftDurationSeconds,
				y: dimensionUtil.decimalToActualHeight(-0.2)
			});
			liftTween.play();
		}, fallCoverDurationSeconds * 1000);

		// Shrink the tray
		this.timeOuts[this.timeOuts.length] = setTimeout(function() {
			var shrinkTrayTween = new Kinetic.Tween({
				node: app.view.onesWidgetGroup, 
				duration: shrinkTrayDurationSeconds,
				x: dimensionUtil.decimalToActualWidth(-0.05),
				y: dimensionUtil.decimalToActualHeight(0.26),
				scaleX: 0.5,
				scaleY: 0.5,
				easing: Kinetic.Easings.Linear,
			});
			shrinkTrayTween.play();
		}, (fallCoverDurationSeconds + trayLiftDurationSeconds) * 1000);
		
		// Move belt up
		this.timeOuts[this.timeOuts.length] = setTimeout(function() {
			// set current tray to next
			app.view.trays.current = app.view.trays.next;
			
			// create new next tray
			app.view.trays.next = new Kinetic.Image({image: app.view.images.tray});
			widgetUtil.glue(app.view.trays.next, {
				width: app.view.viewVars.traySize.width,
				height: app.view.viewVars.traySize.height,
				dx: app.view.viewVars.trayBelowNextPosition.x,
				dy: app.view.viewVars.trayBelowNextPosition.y
			});
			app.layer.add(app.view.trays.next);		
			
			// move current tray up
			var moveCurrentTrayTween = new Kinetic.Tween({
				node: app.view.trays.current, 
				duration: beltSlideDurationSeconds,
				x: dimensionUtil.decimalToActualWidth(0.25),
				y: dimensionUtil.decimalToActualHeight(0.415),
				easing: Kinetic.Easings.Linear
			});
			moveCurrentTrayTween.play();
			
			// move next tray up
			var moveNextTrayTween = new Kinetic.Tween({
				node: app.view.trays.next, 
				duration: beltSlideDurationSeconds,
				x: dimensionUtil.decimalToActualWidth(0.05),
				y: dimensionUtil.decimalToActualHeight(0.71),
				easing: Kinetic.Easings.Linear
			});
			moveNextTrayTween.play();
			
		}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds) * 1000);
		
		this.timeOuts[this.timeOuts.length] = setTimeout(function() {
			app.view.eggsAtDestination = [];
			app.view.onesWidgetGroup = new Kinetic.Group({});
			app.layer.add(app.view.onesWidgetGroup);
			app.view.onesWidgetGroup.moveToTop();
			
			app.view.onesTextWidget.setText(0);
			app.view.tensTextWidget.setText(parseInt(app.view.tensTextWidget.getText())+1);
			
			app.view.activitiesEnabled = true;
		}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds + beltSlideDurationSeconds) * 1000);
	},

	/**
	 * Is called when a mistake is made by the student
	 * @param {ErrorType} errorType error type of the error made
	 */
	errorMade : function (errorType) {
		this.errorsMade++;

		switch (errorType) {
			case this.ERROR_TYPES.DRAG_TO_TENS:
				this.displayThinkCloud("WHOOPS! This is only ONE easter egg! You need to drag this to ONES!");
			break;
			case this.ERROR_TYPES.INCORRECT_DONE:
				this.displayThinkCloud("UH OH! The number you have made is not " + 
					mathUtil.convertNumberToWord(app.controller.goalNumber) +
					"! You need more!");
			break;
			case this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS:
				this.displayThinkCloud("You're trying to make " + 
					mathUtil.convertNumberToWord(app.controller.goalNumber) +
					". Count your eggs! Have you already got the correct number?");
			break;
			case this.ERROR_TYPES.PACK_DRAG_TO_ONES:
				this.displayThinkCloud("WHOOPS! The packs of tens do not go there!");
			break;
			case this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_PACKS:
				this.displayThinkCloud("You're trying to make " + 
					mathUtil.convertNumberToWord(app.controller.goalNumber) +
					". Count your packs! Have you got enough?");
			break;
		}
		
		if (this.errorsMade == this.allowableErrorsCount) {
			this.finish(0);
		}
	},

	/**
	 * Calculate the current total the student has already performed
	 */
	calculateTotal : function () {
		var ones = parseInt(this.onesTextWidget.getText());
		var tens = parseInt(this.tensTextWidget.getText() * 10);
		return (tens + ones);
	},

	/**
	 * Finsih the game. Score: 0 for fail, 1 to 3 for stars
	 */
	finish : function(score) {
		var finishTitleImage = null;
		var starsImage = null;
		var starsCount = 0;
		
		switch(score) {
			case 0:
				finishTitleImage = this.images.labelTryAgain;
				starsImage = null;
				starsCount = 0;
			break;
			case 1:
				finishTitleImage = this.images.labelGood;
				starsImage = this.images.star1;
				starsCount = 1;
			break;
			case 2:
				finishTitleImage = this.images.labelExcellent;
				starsImage = this.images.star2;
				starsCount = 2;
			break;			
			case 3:
				finishTitleImage = this.images.labelPerfect;
				starsImage = this.images.star3;
				starsCount = 3;
			break;
		}

		// draw overlay
		var overlay = new Kinetic.Rect({
			fill: 'black',
			opacity: 0.62
		});
		widgetUtil.glue(overlay, {
			width: 1,
			height: 1,
			dx: 0,
			dy: 0
		});
		app.layer.add(overlay);
		
		// draw title
		var finishTitle = new Kinetic.Image({image: finishTitleImage});
		widgetUtil.glue(finishTitle, {
			width: 0.45,
			height: 0.15,
			dx: 0.27,
			dy: 0.2
		});
		app.layer.add(finishTitle);
		
		if (starsImage != null) {
			// draw stars
			var starsWidget = new Kinetic.Image({image: starsImage});
			widgetUtil.glue(starsWidget, {
				width: 0.35,
				height: 0.14,
				dx: 0.325,
				dy: 0.35
			});
			app.layer.add(starsWidget);		
		}
		
		// draw buttons 
		var buttonRetry = null;	
		var buttonMenu = null;
		if (score == 0) {
			// draw retry button only
			buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
			widgetUtil.glue(buttonRetry, {
				width: 0.18,
				height: 0.25,
				dx: 0.32,
				dy: 0.45
			});
			
			// draw retry button only
			buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
			widgetUtil.glue(buttonMenu, {
				width: 0.18,
				height: 0.25,
				dx: 0.52,
				dy: 0.45
			});
		} else {
			buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
			widgetUtil.glue(buttonRetry, {
				width: 0.18,
				height: 0.25,
				dx: 0.24,
				dy: 0.6
			});
			
			// draw retry button only
			buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
			widgetUtil.glue(buttonMenu, {
				width: 0.18,
				height: 0.25,
				dx: 0.42,
				dy: 0.6
			});
			
			var buttonNext = new Kinetic.Image({image: this.images.buttonNext});
			widgetUtil.glue(buttonNext, {
				width: 0.18,
				height: 0.25,
				dx: 0.60,
				dy: 0.6
			});
			app.layer.add(buttonNext);	
			buttonNext.on('click tap', function () {
				app.controller.nextGame();
			});
		}
		
		buttonRetry.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.restart();
		});
		buttonMenu.on('click tap', function () {
			music.play(app.view.sounds.select);
			if(storage.get("settingMusic") == true){
				music.stopBackgroundMusic();
			}
			app.controller.menu();
		});
		
		app.layer.add(buttonMenu);
		app.layer.add(buttonRetry);	
		
		app.stage.draw();
		
		// set the stars
		app.controller.achievedStars(starsCount);
		
		
		
	},
});
