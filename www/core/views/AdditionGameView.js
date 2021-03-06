/**
 * @class Class to help coordinate the view of the addition games
 */
var AdditionGameView = new Class ( /** @lends AdditionGameView.prototype */ {
	Extends: View,
	
	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function (controller) {
		this.controller = controller;
		
		// error types
		this.ERROR_TYPES = {
			DRAG_EGG_TO_TENS: 0,
			DRAG_EGG_TO_HUNDREDS: 1,
			DRAG_PACK_TO_ONES: 2,
			DRAG_PACK_TO_HUNDREDS: 3,
			INCORRECT_DONE: 4
		}	

		// complements
		this.COMPLIMENTS = [
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
		
		// Variable for controlling whether activities are enabled (should be turned off during animations)
		this.activitiesEnabled = true;
		
		// Number of mistakes made
		this.errorsCount = 0;
		
		// Number of allowable errors
		this.allowableErrorsCount = 3;
		
		this.boxesInGroup = [];
		
		// Amount of time spent on the level 
		this.startTime = new Date().getTime();
		this.endTime = 0;
		this.timeSpent = 0;
		this.pauseTime = 0;
		this.unpauseTime = 0;
		this.totalPausedTime = 0;
		
		// Number of attempts
		this.attempts = 0;
		
		// Errors made in string format
		this.errorString = null;

	},



	/**
	 * Destructor
	 */
	finalize : function () {
		
	},

	/**
	 * Draw new eggs (ones) group
	 */
	drawEggsGroup : function() {
		this.eggsInGroup = [];
		this.eggsGroup = new Kinetic.Group({
			x: dimensionUtil.decimalToActualWidth(this.viewVars.eggsGroupLocation.x),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.eggsGroupLocation.y)
		});
		app.layer.add(this.eggsGroup);
	},

	/**
	 * Draw new packs (tens) group
	 */
	drawPacksGroup : function() {
		this.packsInGroup = [];
		this.packsGroup = new Kinetic.Group({
			x: dimensionUtil.decimalToActualWidth(this.viewVars.packsGroupLocation.x),
			y: dimensionUtil.decimalToActualHeight(this.viewVars.packsGroupLocation.y)
		});
		app.layer.add(this.packsGroup);
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
	 * Draws the tracks
	 */
	drawTracks : function () {
		var track = new Kinetic.Image({image: this.images.track});
		widgetUtil.glue(track, {
			width: this.viewVars.trackDimensions.width,
			height: this.viewVars.trackDimensions.height,
			dx: this.viewVars.trackDimensions.x,
			dy: this.viewVars.trackDimensions.y
		});
		app.layer.add(track);
	},

	/**
	 * Draw boards (only applied for unit3)
	 */
	drawBoards : function () {
		var board1 = new Kinetic.Image({image: this.images.board1});
		widgetUtil.glue(board1, {
			width: this.viewVars.board1Dimensions.width,
			height: this.viewVars.board1Dimensions.height,
			dx: this.viewVars.board1Dimensions.x,
			dy: this.viewVars.board1Dimensions.y
		});
		app.layer.add(board1);
		
		var board2 = new Kinetic.Image({image: this.images.board2});
		widgetUtil.glue(board2, {
			width: this.viewVars.board2Dimensions.width,
			height: this.viewVars.board2Dimensions.height,
			dx: this.viewVars.board2Dimensions.x,
			dy: this.viewVars.board2Dimensions.y
		});
		app.layer.add(board2);
	},

	/**
	 * Draws the think cloud 
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
		this.displayThinkCloud("Lets do some addition! Drag eggs onto the truck!");
	},

	/**
	 * Displays a message in the think cloud
	 * @param {string} message want to display
	 * @param {integer} font size
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
	 * Draws the rabbit
	 */
	drawRabbitHead : function () {
		var rabbitHead = new Kinetic.Image({image: this.images.rabbitHead});
		widgetUtil.glue(rabbitHead, {
			width: this.viewVars.rabbitDimensions.width,
			height: this.viewVars.rabbitDimensions.height,
			dx: this.viewVars.rabbitDimensions.x,
			dy: this.viewVars.rabbitDimensions.y
		});
		app.layer.add(rabbitHead);
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
			
			var topNumber = (app.view.eggsInGroup.length) + (app.view.packsInGroup.length * 10) + (app.view.boxesInGroup.length * 100);
			var goalSum = app.controller.goalNumber + app.controller.goalNumber2;
			
			if (topNumber == goalSum) {
				app.view.finish(app.view.allowableErrorsCount - app.view.errorsCount);
			} else {
				app.view.errorMade(app.view.ERROR_TYPES.INCORRECT_DONE);	
			}
		});
		
		app.layer.add(buttonDone);
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
			shadowOpacity: 1,
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
	 * Draws the number to indicate the numbers of eggs or packs on the belts or trucks
	 */
	drawNumbers : function() {
		// top
		this.topNumberTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.862),
			y: dimensionUtil.decimalToActualHeight(0.260),
			
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "",
			align: "center",
			width: dimensionUtil.decimalToActualWidth(0.125 / (1/1024*dimensionUtil.width)),
			fontFamily: 'mainFont',
			fontSize: 60,
			fill: 'black', // #2B8F4E
			fontStyle: 'bold',
		});
		app.layer.add(this.topNumberTextWidget);
		
		// bottom
		this.botNumberTextWidget = new Kinetic.Text({
			x: dimensionUtil.decimalToActualWidth(0.862),
			y: dimensionUtil.decimalToActualHeight(0.80),
			
			scaleX: 1/1024*dimensionUtil.width,
			scaleY: 1/768*dimensionUtil.height,
			text: "",
			align: "center",
			width: dimensionUtil.decimalToActualWidth(0.125 / (1/1024*dimensionUtil.width)),
			fontFamily: 'mainFont',
			fontSize: 60,
			fill: 'black', // #2B8F4E
			fontStyle: 'bold',
		});
		app.layer.add(this.botNumberTextWidget);
		
		this.refreshNumbers();
	},

	/**
	 * Refresh indicated numbers on the board when new eggs or packs are added in or removed
	 */
	refreshNumbers : function() {
		var goalNumber = this.viewVars.goalNumber + this.viewVars.goalNumber2;
		var topNumber = (this.eggsInGroup.length) + (this.packsInGroup.length * 10) + (this.boxesInGroup.length * 100);
		
		this.topNumberTextWidget.setText(topNumber);
		this.botNumberTextWidget.setText(goalNumber - topNumber);
		
		app.stage.draw();
	},

	/**
	 * Draws all the eggs
	 */
	drawEggs : function () {
		this.eggsGroup.moveToTop();
		this.packsGroup.moveToTop();
		// ==============================
		// TOP EGGS
		// ==============================

		for(var eggId = 0; eggId < mathUtil.getOnes(this.viewVars.goalNumber); eggId++) {
			var egg = this.drawNewEgg(this.viewVars.eggsRelativeLocations[eggId].x, this.viewVars.eggsRelativeLocations[eggId].y);
			egg.animation.stop();
			this.eggsGroup.add(egg);
			this.eggsInGroup.push(egg);
		}

		// ==============================
		// BOTTOM EGGS
		// ==============================
		for(var eggId = 0; eggId < mathUtil.getOnes(this.viewVars.goalNumber2); eggId++) {
			var x = this.viewVars.eggsBeltOffset.x + this.viewVars.eggsRelativeLocations[eggId].x;
			var y = this.viewVars.eggsBeltOffset.y + this.viewVars.eggsRelativeLocations[eggId].y;
			
			var egg = this.drawNewEgg(x, y);
			egg.originalX = x;
			egg.originalY = y;

			egg.setDraggable(true);
			app.layer.add(egg);
			egg.on('dragstart', function() { 
				this.animation.stop();
				this.moveToTop();
				this.setScale(1.5, 1.5);
			});
			egg.on('dragend', function() {	
				if (!app.view.activitiesEnabled) {
					app.view.declineEgg(this);
					return;
				}
				
			
				if (widgetUtil.isNearPoints(this, app.view.viewVars.beltOnesArea.X_ARRAY, app.view.viewVars.beltOnesArea.Y_ARRAY, app.view.viewVars.beltOnesArea.RADIUS_ARRAY)) {
					// accept the egg
					app.view.acceptEgg(this);
				} else {
					// decline the egg
					app.view.declineEgg(this);
					// record any errors
					if (widgetUtil.isNearPoints(this, app.view.viewVars.beltTensArea.X_ARRAY, app.view.viewVars.beltTensArea.Y_ARRAY, app.view.viewVars.beltTensArea.RADIUS_ARRAY)) {
						app.view.errorMade(app.view.ERROR_TYPES.DRAG_EGG_TO_TENS);
					} else if (widgetUtil.isNearPoints(this, app.view.viewVars.beltHundredsArea.X_ARRAY, app.view.viewVars.beltHundredsArea.Y_ARRAY, app.view.viewVars.beltHundredsArea.RADIUS_ARRAY)) {
						app.view.errorMade(app.view.ERROR_TYPES.DRAG_EGG_TO_HUNDREDS);
					}
				}
			});
		}
	},

	/**
	 * Draws one new egg
	 * @param {float} x the width of position of a new egg
	 * @param {float} y the height of position of a new egg
	 */
	drawNewEgg : function (x, y) {
		var egg = new Kinetic.Image({
			image: this.images.eggs[mathUtil.random(0, this.images.eggs.length-1)],
		});
		widgetUtil.glue(egg, {
			width: this.viewVars.initialEggSize.width,
			height: this.viewVars.initialEggSize.height,
			dx: x,
			dy: y
		});
		
		egg.animation = new Kinetic.Animation(function(frame) {
			var dx = -Math.sin(frame.time / 200) * 0.003;
			var dy = Math.sin(frame.time / 200) * 0.003;
			var scaleX = Math.sin(frame.time / 200) * 0.06 + 0.9;
			var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.9;
			// scale x and y
			egg.setScale(scaleX, scaleY);
			egg.setX(dimensionUtil.decimalToActualWidth(x + dx));
			egg.setY(dimensionUtil.decimalToActualHeight(y + dy));
		}, app.layer);
			
		egg.animation.start();
		
		return egg;
	},

	/**
	 * Accepts the egg onto the truck
	 * @param {Kinetic.Image} egg egg to be accepted
	 */
	acceptEgg : function(egg) {
		egg.setScale(1, 1);
		this.sayCompliment();
		music.play(this.sounds.acceptEgg);
		this.eggsInGroup.push(egg);
		egg.remove();
		this.eggsGroup.add(egg);
		
		egg.setX(dimensionUtil.decimalToActualWidth(this.viewVars.eggsRelativeLocations[this.eggsInGroup.length - 1].x));
		egg.setY(dimensionUtil.decimalToActualHeight(this.viewVars.eggsRelativeLocations[this.eggsInGroup.length - 1].y));
		egg.setDraggable(false);
		egg.moveToTop();
		app.stage.draw();
		
		if (this.eggsInGroup.length == 10) {
			this.packageEggs();
		} else {
			this.refreshNumbers();
		}
	},

	/**
	 * Say a compliment
	 */
	sayCompliment : function() {
		var compliment = this.COMPLIMENTS[mathUtil.random(0, this.COMPLIMENTS.length-1)];
		this.displayThinkCloud(compliment, 50);
	},

	/**
	 * Declines the egg and puts it back
	 * @param {Kinetic.Image} egg to be declined
	 */
	declineEgg : function(egg) {
		egg.setScale(1, 1);
		// play the decline egg sound
		music.play(this.sounds.declineEgg);
		widgetUtil.animateMove(egg, 0.4, egg.originalX, egg.originalY);
		egg.animation.start();
	},

	/**
	 * Package up the eggs and put it in the TENS on the truck
	 */
	packageEggs : function () {
		this.activitiesEnabled = false;

		// draw the wrapper
		var wrapper = new Kinetic.Image({image: this.images.pack});
		widgetUtil.glue(wrapper, {
			width: 0.13,
			height: 0.11,
			dx: 0,
			dy: -0.2
		});
		this.eggsGroup.add(wrapper);
		
		
		// animation: animate the packaging
		var wrappingTween = new Kinetic.Tween({
			node: wrapper,
			duration: 1.0,
			y: 0
		});
		wrappingTween.play();
		
		// animation: orienting eggs
		for(var eggId = 0; eggId < this.eggsInGroup.length; eggId++) {
			var egg = this.eggsInGroup[eggId];
			
			var tween = new Kinetic.Tween({
				node: egg,
				duration: 1.0,
				x: dimensionUtil.decimalToActualWidth(this.viewVars.eggsPackedRelativeLocations[eggId].x),
				y: dimensionUtil.decimalToActualHeight(this.viewVars.eggsPackedRelativeLocations[eggId].y),
				onFinish: function () {
					this.node.remove();
				}
			});
			tween.play();
		}
		
		// animation: adjust pack position
		var adjustPackPositionTween = new Kinetic.Tween({
			node: this.eggsGroup,
			duration: 1.0,
			y: dimensionUtil.decimalToActualHeight(0.28),
			onFinish: function () {
				this.node.setX(this.node.getX() - app.view.packsGroup.getX());
				this.node.setY(this.node.getY() - app.view.packsGroup.getY());
				app.stage.draw();
				
				
				
				
				var moveEggsToTensTween = new Kinetic.Tween({
					node: this.node,
					duration: 0.5,
					x: dimensionUtil.decimalToActualWidth(app.view.viewVars.packsRelativeLocations[app.view.packsInGroup.length].x),
					y: dimensionUtil.decimalToActualHeight(app.view.viewVars.packsRelativeLocations[app.view.packsInGroup.length].y),
					scaleX: 0.60,
					scaleY: 0.60,
					onFinish: function() {
						app.view.drawEggsGroup();
						if (app.view.packsInGroup.length == 10) {
							app.view.packagePacks();
						} else {
							app.view.refreshNumbers();
							app.view.activitiesEnabled = true;
						}
					}
				});
				moveEggsToTensTween.play();
				
				app.view.packsGroup.add(this.node);
				app.view.packsInGroup.push(this.node);			
			}
		});
		adjustPackPositionTween.play();
	},

	/**
	 * Draws all the packs
	 */
	drawPacks : function() {
		this.eggsGroup.moveToTop();
		this.packsGroup.moveToTop();
		
		// ==============================
		// TOP PACKS
		// ==============================
		for(var packId = 0; packId < mathUtil.getTens(this.viewVars.goalNumber); packId++) {
			var pack = this.drawNewPack(this.viewVars.packsRelativeLocations[packId].x, this.viewVars.packsRelativeLocations[packId].y);
			pack.animation.stop();
			this.packsGroup.add(pack);
			this.packsInGroup.push(pack);
		}
		
		app.stage.draw();
		
		// ==============================
		// BOTTOM PACKS
		// ==============================
		for(var packId = 0; packId < mathUtil.getTens(this.viewVars.goalNumber2); packId++) {
			var x = this.viewVars.packsBeltOffset.x + this.viewVars.packsRelativeLocations[packId].x;
			var y = this.viewVars.packsBeltOffset.y + this.viewVars.packsRelativeLocations[packId].y;
			
			var pack = this.drawNewPack(x, y);
			pack.originalX = x;
			pack.originalY = y;
			
			pack.setDraggable(true);
			app.layer.add(pack);
			
			pack.on('dragstart', function() { 
				this.animation.stop();
				this.moveToTop();
				this.setScale(1.2, 1.2);
			});
			pack.on('dragend', function() {
				if (!app.view.activitiesEnabled) {
					app.view.declinePack(this);
					return;
				}
			
				if (widgetUtil.isNearPoints(this, app.view.viewVars.beltTensArea.X_ARRAY, app.view.viewVars.beltTensArea.Y_ARRAY, app.view.viewVars.beltTensArea.RADIUS_ARRAY)) {
					// accept the pack
					app.view.acceptPack(this);
				} else {
					// decline the pack
					app.view.declinePack(this);
					
					// record any errors
					if (widgetUtil.isNearPoints(this, app.view.viewVars.beltOnesArea.X_ARRAY, app.view.viewVars.beltOnesArea.Y_ARRAY, app.view.viewVars.beltOnesArea.RADIUS_ARRAY)) {
						app.view.errorMade(app.view.ERROR_TYPES.DRAG_PACK_TO_ONES);
					} else if (widgetUtil.isNearPoints(this, app.view.viewVars.beltHundredsArea.X_ARRAY, app.view.viewVars.beltHundredsArea.Y_ARRAY, app.view.viewVars.beltHundredsArea.RADIUS_ARRAY)) {
						app.view.errorMade(app.view.ERROR_TYPES.DRAG_PACK_TO_HUNDREDS);
					}
				}
			});
		}
		
	},

	/**
	 * Draws a new pack
	 * @param {float} x the width of position of a new pack
	 * @param {float} y the height of position of a new pack
	 */
	drawNewPack : function(x, y) {
		var pack = new Kinetic.Group({
			x: dimensionUtil.decimalToActualWidth(x),
			y: dimensionUtil.decimalToActualHeight(y),
			scaleX: 0.60,
			scaleY: 0.60
		});

		var wrapper = new Kinetic.Image({image: this.images.pack});
		widgetUtil.glue(wrapper, {
			width: 0.13,
			height: 0.11,
			dx: 0,
			dy: 0
		});
		pack.add(wrapper);
		
		pack.animation = new Kinetic.Animation(function(frame) {
			var dx = -Math.sin(frame.time / 200) * 0.003;
			var dy = Math.sin(frame.time / 200) * 0.003;
			var scaleX = Math.sin(frame.time / 200) * 0.04 + 0.6;
			var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.6;
			// scale x and y
			pack.setScale(scaleX, scaleY);
			pack.setX(dimensionUtil.decimalToActualWidth(x + dx));
			pack.setY(dimensionUtil.decimalToActualHeight(y + dy));
		}, app.layer);
			
		pack.animation.start();
		
		
		return pack;
	},

	/**
	 * Accept pack
	 * @param {Kinetic.Image} pack  pack to be accepted
	 */
	acceptPack : function(pack) {
		pack.setScale(0.6, 0.6);
		music.play(this.sounds.acceptEgg);
		this.sayCompliment();
		
		this.packsInGroup.push(pack);
		pack.remove();
		this.packsGroup.add(pack);
		
		pack.setX(dimensionUtil.decimalToActualWidth(this.viewVars.packsRelativeLocations[this.packsInGroup.length - 1].x));
		pack.setY(dimensionUtil.decimalToActualHeight(this.viewVars.packsRelativeLocations[this.packsInGroup.length - 1].y));
		pack.setDraggable(false);
		pack.moveToTop();
		app.stage.draw();
		
		if (this.packsInGroup.length == 10) {
			this.packagePacks();
		} else {
			app.view.refreshNumbers();
		}
	},

	/**
	 * Decline pack
	 * @param {Kinetic.Image} pack  pack to be declined
	 */
	declinePack : function(pack) {
		pack.setScale(0.6, 0.6);
		music.play(this.sounds.declineEgg);
		widgetUtil.animateMove(pack, 0.4, pack.originalX, pack.originalY);
		pack.animation.start();
	},

	// package up the packs into a box/crate
	packagePacks : function() {
		this.activitiesEnabled = false;
		
		this.boxesInGroup.push(this.packsGroup);

		// draw the wrapper
		var box = new Kinetic.Image({image: this.images.box});
		widgetUtil.glue(box, {
			width: 0.17,
			height: 0.24,
			dx: 0,
			dy: -0.2
		});
		this.packsGroup.add(box);
		
		// animation: animate the packaging
		var wrappingTween = new Kinetic.Tween({
			node: box,
			duration: 1.0,
			y: dimensionUtil.decimalToActualHeight(-0.05)
		});
		wrappingTween.play();
		
		// animation: orienting the packs
		for(var packId = 0; packId < this.packsInGroup.length; packId++) {
			var pack = this.packsInGroup[packId];
			
			var tween = new Kinetic.Tween({
				node: pack,
				duration: 1.0,
				x: dimensionUtil.decimalToActualWidth(this.viewVars.packsPackedRelativeLocations[packId].x),
				y: dimensionUtil.decimalToActualHeight(this.viewVars.packsPackedRelativeLocations[packId].y),
				onFinish: function () {
					this.node.hide();
				}
			});
			tween.play();
		}
		
		// animating the entire box group
		var tween = new Kinetic.Tween({
			node: this.packsGroup,
			duration: 0.8,
			onFinish: function () {
				var tween2 = new Kinetic.Tween({
					node: this.node,
					duration: 0.5,
					x: dimensionUtil.decimalToActualWidth(app.view.viewVars.boxLocation.x),
					y: dimensionUtil.decimalToActualHeight(app.view.viewVars.boxLocation.y),
					onFinish: function() {
						app.view.drawPacksGroup();
						app.view.refreshNumbers();
						app.view.activitiesEnabled = true;
					}
				});
				tween2.play();		
			}
		});
		tween.play();
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
		this.pauseTime = new Date().getTime();
		this.pauseWidgetsGroup.show();
		this.pauseWidgetsGroup.moveToTop();
		app.stage.draw();
	},

	/**
	 * unpause the game
	 */
	unpause : function() {
		this.unpauseTime = new Date().getTime();
		this.pauseWidgetsGroup.hide();
		app.stage.draw();
	},

	/**
	 * Is called when a mistake is made by the student
	 * @param {ErrorType} errorType error type of the error made
	 */
	errorMade : function (errorType) {
		this.errorsCount++;
		
		// Saving the type of error made to a string
		if (this.errorString == null){
			this.errorString = String(errorType);
		}
		else {
			// Concatenate previous errors with new one
			this.errorString = this.errorString + ", " + String(errorType);
		}

		switch (errorType) {
			case this.ERROR_TYPES.DRAG_EGG_TO_TENS:
				this.displayThinkCloud("WHOOPS! This is only ONE easter egg! You need to drag this to ONES!");
			break;
			case this.ERROR_TYPES.DRAG_EGG_TO_HUNDREDS:
				this.displayThinkCloud("WHOOPS! This is only ONE easter egg! You need to drag this to ONES!");
			break;
			
			case this.ERROR_TYPES.DRAG_PACK_TO_ONES:
				this.displayThinkCloud("WHOOPS! The packs of tens eggs do not go there!");
			break;		
			
			case this.ERROR_TYPES.DRAG_PACK_TO_HUNDREDS:
				this.displayThinkCloud("WHOOPS! The packs of tens eggs do not go there!");
			break;	
			
			case this.ERROR_TYPES.INCORRECT_DONE:
				this.displayThinkCloud("UH OH! There are more eggs that can go onto the truck!");
			break;
		}
		
		if (this.errorsCount == this.allowableErrorsCount) {
			this.finish(0);
		}
	},

	/**
	 * Finish the game. Score: 0 for fail, 1 to 3 for stars
	 * @param {integer} score the score of the game result
	 */
	finish : function(score) {
		var finishTitleImage = null;
		var starsImage = null;
		var starsCount = 0;
		
		// Calculate time spent on level
		this.endTime = new Date().getTime();
		this.totalPausedTime = this.unpauseTime - this.pauseTime;
		this.timeSpent = this.endTime - this.startTime - this.totalPausedTime;
		
		switch(score) {
			case 0:
				finishTitleImage = this.images.labelTryAgain;
				starsImage = null;
				starsCount = 0;
				this.attempts = 1;
			break;
			case 1:
				finishTitleImage = this.images.labelGood;
				starsImage = this.images.star1;
				starsCount = 1;
				this.attempts = 1;
			break;
			case 2:
				finishTitleImage = this.images.labelExcellent;
				starsImage = this.images.star2;
				starsCount = 2;
				this.attempts = 1;
			break;			
			case 3:
				finishTitleImage = this.images.labelPerfect;
				starsImage = this.images.star3;
				starsCount = 3;
				this.attempts = 1;
			break;
		}
		
		// set the stars, time, attempts and errors
		app.controller.saveStatistics(starsCount, this.timeSpent, this.attempts, this.errorString);

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
				music.play(app.view.sounds.select);
				app.controller.nextGame();
			});
		}
		
		buttonRetry.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.restart();
		});
		buttonMenu.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.menu();
		});
		
		app.layer.add(buttonMenu);
		app.layer.add(buttonRetry);	
		
		app.stage.draw();
		
	},

	/**
	 * Drawing areas
	 */
	drawAreas : function() {
		var areas = [this.viewVars.beltOnesArea, this.viewVars.beltTensArea, this.viewVars.beltHundredsArea];
		for(var areaIndex = 0; areaIndex < areas.length; areaIndex++) {
			var area = areas[areaIndex];
			for(var i = 0; i < area.X_ARRAY.length; i++) {
				var ellipse = new Kinetic.Ellipse({
					draggable: true,
					x: dimensionUtil.decimalToActualWidth(area.X_ARRAY[i]),
					y: dimensionUtil.decimalToActualHeight(area.Y_ARRAY[i]),
					radius: 
						{x:dimensionUtil.decimalToActualWidth(area.RADIUS_ARRAY[i]), 
						y:dimensionUtil.decimalToActualHeight(area.RADIUS_ARRAY[i])},
					stroke: 'red',
					strokeWidth: 6
				});
				app.layer.add(ellipse);
					
				ellipse.on('dragend', function () {
					console.log("x:" + dimensionUtil.actualToDecimalWidth(this.getX()) + ", " + "y:" + dimensionUtil.actualToDecimalHeight(this.getY()));
				});
			}
		}
	},

});

