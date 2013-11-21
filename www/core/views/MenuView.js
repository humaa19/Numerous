/**
 * @class Class to help coordinate the view of unit selection screen
 */
var MenuView = new Class( /** @lends MenuView.prototype */ {
	Extends: View,
	
	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function(controller) {
		this.controller = controller;
	
		// the current unit being viewed
		this.currentUnit = 0;
	},
	
	/**
	 * Destructor
	 */
	finalize: function () {
	},
	
	/**
	 * Draw everything on the screen
	 */
	draw: function () {

		// Call helper functionsthe to draw components
		this.drawTitle();
		this.drawHomeButton();
		this.drawArrows();
		this.drawGroups();
		
		// redraw all widgets
		app.stage.draw();
	},

	/**
	 * Draw the title
	 */
	drawTitle: function() {
		var title = new Kinetic.Image({image: this.images.numerousTitle});
		widgetUtil.glue(title, {
			width: 0.35,
			height: 0.1,
			dx: 0.31,
			dy: 0.05
		});
		app.layer.add(title);
	},

	/**
	 * Draw the button for backing to home screen
	 */
	drawHomeButton: function() {
		var button = new Kinetic.Image({image: this.images.homeButton});
		widgetUtil.glue(button, {
			width: 0.11,
			height: 0.12,
			dx: 0.05,
			dy: 0.05
		});
		app.layer.add(button);
		
		button.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.home()
		});
	},

	/**
	 * Draw the arrows for switch units
	 */
	drawArrows: function() {
		this.arrowLeft = new Kinetic.Image({image: this.images.arrowLeft});
		widgetUtil.glue(this.arrowLeft, {
			width: 0.1,
			height: 0.22,
			dx: 0.1,
			dy: 0.5
		});
		app.layer.add(this.arrowLeft);
		
		this.arrowRight = new Kinetic.Image({image: this.images.arrowRight});
		widgetUtil.glue(this.arrowRight, {
			width: 0.1,
			height: 0.22,
			dx: 0.8,
			dy: 0.5
		});
		app.layer.add(this.arrowRight);
		
		this.arrowLeft.on('click tap', function () {
			music.play(app.view.sounds.select);
			this.moveToTop();
			app.stage.draw();
			app.view.left();
		});
		this.arrowRight.on('click tap', function () {
			music.play(app.view.sounds.select);
			this.moveToTop();
			app.stage.draw();
			app.view.right();
		});
		
		this.arrowLeft.hide();
	},

	drawGroups: function() {
		this.unitsGroupArray = [];
		this.animations = [];
		var period = 1000;
		for(var i = 0; i < app.UNIT_GAMES.length; i++) {
			this.unitsGroupArray[i] = new Kinetic.Group({});
			
			var myLabel = new Kinetic.Image({image: this.images.unitLabels[i]});
			widgetUtil.glue(myLabel, {
				width: 0.35,
				height: 0.12,
				dx: 0.3,
				dy: 0.15
			});
			this.unitsGroupArray[i].add(myLabel);
			
			var myButton = new Kinetic.Image({image: this.images.unitPlayButtons[i]});
			widgetUtil.glue(myButton, {
				width: 0.3,
				height: 0.43,
				dx: 0.33,
				dy: 0.37
			});
			
			// Need to edit when the unit name is changed
			myButton.on('click tap', function () {
				music.play(app.view.sounds.select);
				app.controller.unitSelect(app.view.currentUnit);
			});
			

				
			this.unitsGroupArray[i].add(myButton);
			app.layer.add(this.unitsGroupArray[i]);
			this.unitsGroupArray[i].hide();
		}

		this.unitsGroupArray[0].show();
	},


	left: function () {
		var preUnit = this.currentUnit-1;
		var preGroup = this.unitsGroupArray[preUnit];
		var currentGroup = this.unitsGroupArray[this.currentUnit];
		
		preGroup.setOpacity(0);
		preGroup.setX(dimensionUtil.decimalToActualWidth(-0.35));
		preGroup.show();
		
		var tweenIn = new Kinetic.Tween({
			node: preGroup,
			duration: 0.5,
			x: 0,
			opacity: 1
		});
		tweenIn.play();
		
		var tweenOut = new Kinetic.Tween({
			node: currentGroup,
			duration: 0.5,
			x: dimensionUtil.decimalToActualWidth(0.35),
			opacity: 0,
			//Check
			onFinish: function () {
				currentGroup.hide();
			}
		});
		tweenOut.play();
		this.currentUnit--;
		
		this.hideArrows();
	},

	right: function () {
		var nextUnit = this.currentUnit+1;
		var nextGroup = this.unitsGroupArray[nextUnit];
		var currentGroup = this.unitsGroupArray[this.currentUnit];
		
		nextGroup.setOpacity(0);
		nextGroup.setX(dimensionUtil.decimalToActualWidth(0.35));
		nextGroup.show();
		
		var tweenIn = new Kinetic.Tween({
			node: nextGroup,
			duration: 0.5,
			x: 0,
			opacity: 1
		});
		tweenIn.play();
		
		var tweenOut = new Kinetic.Tween({
			node: currentGroup,
			duration: 0.5,
			x: dimensionUtil.decimalToActualWidth(-0.35),
			opacity: 0,
			//Check
			onFinish: function () {
				currentGroup.hide();
			}
		});
		tweenOut.play();
		this.currentUnit++;
		
		this.hideArrows();
	},

	hideArrows: function() {
		if (this.currentUnit == 0) {
			this.arrowLeft.hide();
		} else if (this.currentUnit == app.UNIT_GAMES.length-1) {
			this.arrowRight.hide();
		} else {
			this.arrowLeft.show();
			this.arrowRight.show();
		}
		
	},
	
});

