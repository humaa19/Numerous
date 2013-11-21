/**
 * @class Class help position widgets on the screen
 */
var WidgetUtil = new Class ( /** @lends WidgetUtil.prototype */ {
	
	/**
	 * Represents the width of the canvas
	 */
	width: env.width,
	
	/**
	 * Represents the height of the canvas
	 */
	height: env.height,

	/**
	 * Glues a KineticJs node to the correct position with a correct size relative to screen size.
	 * @param {Kinetic.Node} node the KineticJs node
	 * @param {boolean} params.glueTop true for glue top and false (or no definition) for glue bottom. defaults to true
	 * @param {boolean} params.glueLeft true for glue left and false (or no definition) for glue right. defaults to true
	 * @param {float} params.width a decimal between 0 and 1 (proportional to screen size).
	 * @param {float} params.height a decimal between 0 and 1 (proportional to screen size).
	 * @param {float} params.dx a decimal representing x-displacement of image from side it is glued (proportional to screen size).
	 * @param {float} params.dy decimal representing y-displacement of image from side it is glued (proportional to screen size).
	 */
	glue: function (node, params) {
		var myWidth, myHight, myX, myY;
		
		myWidth = params.width * this.width;
		myHeight = params.height * this.height;
		
		if (params.glueTop == null) params.glueTop = true;
		if (params.glueLeft == null) params.glueLeft = true;
		
		if (params.glueTop) {
			myY = params.dy * this.height;
		} else {
			myY = this.height - myHeight - (params.dy * this.height);
		}

		if (params.glueLeft) {
			myX = params.dx * this.width;
		} else {
			myX = this.width - myWidth - (params.dx * this.width);
		}
		
		node.setX(myX);
		node.setY(myY);
		node.setWidth(myWidth);
		node.setHeight(myHeight);
	},
	
	
	/**
	 * Determines if the center of the object is within radius of a specified point
	 * @param {Kinetic.Node} node the KineticJs node
	 * @param {float} x a decimal representing horrizontal position of destination between 0 and 1
	 * @param {float} y a decimal representing vertical position of destination etween 0 and 1
	 * @param {float} radius a decimal representing radius which determines what is close
	 * @returns {boolean} if it is near the point
	 */
	isNearPoint: function(node, x, y, radius) {
		// we are working in real width and height and not decimal
		x = x * this.width;
		y = y * this.height;
		
		// screen might be skewed, so we have an ellipse.
		radiusWidth = radius * this.width;
		radiusHeight = radius * this.height;
		
		objX = node.getX() + ( node.getWidth() / 2 );
		objY = node.getY() + ( node.getHeight() / 2 );
		
		if ( (((objX-x)*(objX-x))/(radiusWidth*radiusWidth)+((objY-y)*(objY-y))/(radiusHeight*radiusHeight)) <= 1 ) {
			// It is close enough
			return true;
		} else {
			// Too far
			return false;
		}
	},
	
	/**
	 * Determines if the center of the object is within radius of a specified point
	 * @param {Kinetic.Node} node the KineticJs node
	 * @param {array} xArray an array of horrizontal positions of destination between 0 and 1
	 * @param {array} yArray an array of vertical positions of destination etween 0 and 1
	 * @param {array} radiusArray an array of radius which determines what is close
	 * @returns {boolean}
	 */
	isNearPoints: function(node, xArray, yArray, radiusArray) {
		for (var i = 0; i < radiusArray.length; i++) {
			if (this.isNearPoint(node, xArray[i], yArray[i], radiusArray[i])) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * Moves a node (slowly) to a new destination
	 * @param {Kinetic.Node} node the KineticJs node
	 * @param {integer} duration in milliseconds for the entire animation
	 * @param {float} x the x location to move to (between 0 and 1)
	 * @param {float} y the y location to move to (between 0 and 1)
	 */
	animateMove: function(node, duration, x, y) {
		var tween = new Kinetic.Tween({
			node: node, 
			duration: duration,
			x: dimensionUtil.decimalToActualWidth(x),
			y: dimensionUtil.decimalToActualHeight(y)
		});
		tween.play();
	},
	
});

