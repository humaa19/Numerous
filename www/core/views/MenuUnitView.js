/**
 * @class Class to help coordinate the view of level selection screen
 */
var MenuUnitView = new Class( /** @lends MenuUnitView.prototype */ {
	Extends: View,
	
	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function(controller) {
		this.controller = controller;
	},
	
	/**
	 * Destructor
	 */
	finalize: function() {

	},

	/**
	 * Draw title
	 */
	drawTitle: function() {
		var	title = new Kinetic.Image({image: this.images.title});
		widgetUtil.glue(title, {
			width: 0.5,
			height: 0.12,
			dx: 0.25,
			dy: 0.05
		});
		app.layer.add(title);
	},

	/**
	 * Draw the bcack button
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
			music.play(app.view.sounds.select);
			app.controller.back();
		});
	},

	/**
	 * Draw the level selection box
	 * @param {UnitRecordsModel} unitRecordsModel representing stars of data
	 */
	drawBoxes: function(unitRecordsModel) {
		// belongs in groups
		
		for(var boxNumber = 0; boxNumber < app.UNIT_GAMES[app.currentUnit].length; boxNumber++) {
			var x = 0.07 + (boxNumber % 7) * 0.13;
			var y = 0.28 + Math.floor(boxNumber / 7) * 0.225;
				
			// group
			var group = new Kinetic.Group({
				x: dimensionUtil.decimalToActualWidth(x),
				y: dimensionUtil.decimalToActualHeight(y)
			});

			// box
			var box = new Kinetic.Image({image: this.images.box});
			widgetUtil.glue(box, {
				width: 0.12,
				height: 0.19,
				dx: 0,
				dy: 0
			});
			group.add(box);
			
			// stars
			var stars = new Kinetic.Image({image: this.images.stars[unitRecordsModel.getStars(boxNumber)]});
			widgetUtil.glue(stars, {
				width: 0.1,
				height: 0.05,
				dx: 0.01,
				dy: 0.15
			});
			group.add(stars);
			
			// text
			var text = new Kinetic.Text({
				x: dimensionUtil.decimalToActualWidth(0.01),
				y: dimensionUtil.decimalToActualHeight(0.05),
				width: dimensionUtil.decimalToActualWidth(0.099 / (1/1024*dimensionUtil.width)),
				scaleX: 1/1024*dimensionUtil.width,
				scaleY: 1/768*dimensionUtil.height,
				text: app.UNIT_GAMES[app.currentUnit][boxNumber].name,
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'black',
				align: 'center'
			});
			group.add(text);
			
			app.layer.add(group);
			
			group.gameId = boxNumber;
			group.on('click tap', function () {
				music.play(app.view.sounds.select);
				app.controller.game(this.gameId);
			});
		}
	},
	
});



