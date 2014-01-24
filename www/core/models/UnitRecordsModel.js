/**
 * @class Used for modelling the data of student progress.
 */
var UnitRecordsModel = new Class ( /** @lends UnitRecordsModel.prototype */ {

	/**
	 * Key for the key-value pair when accessing the storage
	 */
	keyName: null,

	/**
	 * Stores default stars data structure if not set already
	 */
	defaultStars: [],
	
	/**
	 * Stores stars data loaded from the database
	 */
	starsEarned: [],
	
	//Add new parameters to be saved for each unit
	//Latency
	//Errors made
	//Completed or attempted(zero stars but still an attempt made) 
	
	keyNameForTimes: null,
	
	defaultTimes: [],
	
	timesTaken: [],
	
	/**
	 * Constructor
	 * @param {integer} unitNumber the data will be retrieved for this unit number.
	 */
	initialize: function (unitNumber) {
		this.unitNumber = unitNumber;
		this.keyName = "unit" + this.unitNumber + "Stars";
		this.keyNameForTimes = "unit" + this.unitNumber + "Time"; 
	
		for(var i = 0; i < app.UNIT_GAMES[this.unitNumber].length; i++) {
			this.defaultStars[i] = 0;
			this.defaultTimes[i] = 0;
		}
		
		// get the stars and times from the database
		this.starsEarned = storage.get(this.keyName, this.defaultStars);
		this.timesTaken = storage.get(this.keyNameForTimes, this.defaultTimes);
	},
	
	/**
	 * Getter for stars
	 * @param gameNumber the stars to retrieve for this game
	 * @returns {integer} the number of stars for the particular game
	 */
	getStars: function(gameNumber) {
		this.starsEarned = storage.get(this.keyName, this.defaultStars);
		return this.starsEarned[gameNumber];
	},

	/**
	 * Setter for stars
	 * @param {integer} gameNumber the game for which the stars data will be saved to
	 * @param {integer} starsCount the number of stars to set this game to
	 */
	setStars: function(gameNumber, starsCount) {
		this.starsEarned[gameNumber] = starsCount;
		storage.set(this.keyName, this.starsEarned);
	},
	
	/**
	 * Getter for times
	 * @param gameNumber the time value to retrieve for this game
	 * @returns {integer} the time taken for the particular game
	 */
	getTime: function(gameNumber) {
		this.timesTaken = storage.get(this.keyNameForTimes, this.defaultTimes);
		return this.timesTaken[gameNumber];
	},
	
	/**
	 * Setter for times
	 * @param {integer} gameNumber the game for which the time data will be saved to
	 * @param {integer} timeForLevel the time value to set for this game
	 */
	setTime: function(gameNumber, timeForLevel) {
		console.log("The game number: " + gameNumber + " and the time saved: " + timeForLevel); 
		this.timesTaken[gameNumber] = timeForLevel;
		storage.set(this.keyNameForTimes, this.timesTaken);
	},

});