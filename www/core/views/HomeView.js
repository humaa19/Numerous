/**
 * @class Class to help coordinate the view of the home screen
 */
var HomeView = new Class( /** @lends HomeView.prototype */ {
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
	},

	/**
	 * Destructor
	 */
	finalize: function () {
	},
	
	/**
	 * Draw the background and buttons on the screen
	 */
	draw: function () {
		this._drawBackground();
		this._drawButtons();

		// redraw all widgets
		app.stage.draw();
	},
	
	/**
	 * Draw the background
	 */
	_drawBackground: function() {
		var background = new Kinetic.Image({image: this.images.background});
		widgetUtil.glue(background, {
			width: 1,
			height: 1,
			dx: 0,
			dy: 0
		});
		app.layer.add(background);
	},
	
	/**
	 * Draw buttons
	 */
	_drawButtons: function() {

		//play button
		var	playButton = new Kinetic.Image({image: this.images.playButton});
		widgetUtil.glue(playButton, {
			width: 0.20,
			height: 0.28,
			dx: 0.23,
			dy: 0.45
		});
		app.layer.add(playButton);
		playButton.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.play();
		});
		
		//options button
		var	optionsButton = new Kinetic.Image({image: this.images.optionsButton});
		widgetUtil.glue(optionsButton, {
			width: 0.20,
			height: 0.28,
			dx: 0.55,
			dy: 0.45
		});
		app.layer.add(optionsButton);
		optionsButton.on('click tap', function () {
			music.play(app.view.sounds.select);
			app.controller.settings();
		});
		
		var anim = new Kinetic.Animation(function(frame) {
				var dx = -Math.sin(frame.time / 200) * 0.006;
				var dy = Math.sin(frame.time / 200) * 0.006;
				var scaleX = Math.sin(frame.time / 200) * 0.06 + 0.9;
				var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.9;
					// scale x and y
					playButton.setScale(scaleX, scaleY);
					playButton.setX(dimensionUtil.decimalToActualWidth(0.23 + dx));
					playButton.setY(dimensionUtil.decimalToActualHeight(0.5 + dy));
					optionsButton.setScale(scaleX, scaleY);
					optionsButton.setX(dimensionUtil.decimalToActualWidth(0.55 + dx));
					optionsButton.setY(dimensionUtil.decimalToActualHeight(0.5 + dy));
			}, app.layer);

			anim.start();
	},

});







