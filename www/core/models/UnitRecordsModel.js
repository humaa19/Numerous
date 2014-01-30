/**
 * @class Used for modelling the data of student progress.
 */
var UnitRecordsModel = new Class ( /** @lends UnitRecordsModel.prototype */ {

	/**
	 * Key for the key-value pair when accessing the storage for stars
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
	
	/**
	 * Key for the key-value pair when accessing the storage for times
	 */
	keyNameForTimes: null,
	
	/**
	 * Stores default times data structure if not set already
	 */
	defaultTimes: [],
	
	/**
	 * Stores time data loaded from the database
	 */
	timesTaken: [],
	
	/**
	 * Key for the key-value pair when accessing the storage for attempts
	 */
	keyNameForAttempts: null,
	
	/**
	 * Stores default attempts data structure if not set already
	 */
	defaultAttempts: [],
	
	/**
	 * Stores attempts data loaded from the database
	 */
	attemptsMade: [],
	
	//Errors made
	
	keyNameForErrors: null,
	
	defaultErrors: [],
	
	errorsMade: [],
	
	/**
	 * Constructor
	 * @param {integer} unitNumber the data will be retrieved for this unit number.
	 */
	initialize: function (unitNumber) {
		this.unitNumber = unitNumber;
		this.keyName = "unit" + this.unitNumber + "Stars";
		this.keyNameForTimes = "unit" + this.unitNumber + "Time"; 
		this.keyNameForAttempts = "unit" + this.unitNumber + "Attempts";
		this.keyNameForErrors = "unit" + this.unitNumber + "Errors";
	
		for(var i = 0; i < app.UNIT_GAMES[this.unitNumber].length; i++) {
			this.defaultStars[i] = 0;
			this.defaultTimes[i] = 0;
			this.defaultAttempts[i] = 0;
			this.defaultErrors[i] = null;
		}
		
		// get the stars, times, attempts and errors from the database
		this.starsEarned = storage.get(this.keyName, this.defaultStars);
		this.timesTaken = storage.get(this.keyNameForTimes, this.defaultTimes);
		this.attemptsMade = storage.get(this.keyNameForAttempts, this.defaultAttempts);
		this.errorsMade = storage.get(this.keyNameForErrors, this.defaultErrors);
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
	
	/**
	 * Getter for attempts
	 * @param gameNumber the attempt number to retrieve for this game
	 * @returns {integer} the attempts made for the particular game
	 */
	getAttempts: function(gameNumber) {
		this.attemptsMade = storage.get(this.keyNameForAttempts, this.defaultAttempts);
		return this.attemptsMade[gameNumber];
	},
	
	/**
	 * Setter for attempts
	 * @param {integer} gameNumber the game for which the attempt data will be saved to
	 * @param {integer} attemptsForLevel the number of attempts made for this game
	 */
	setAttempts: function(gameNumber, attemptsForLevel) {
		console.log("The game number: " + gameNumber + " and the attempts saved: " + attemptsForLevel); 
		this.attemptsMade[gameNumber] = attemptsForLevel;
		storage.set(this.keyNameForAttempts, this.attemptsMade);
	},
	
		/**
	 * Getter for errors
	 * @param gameNumber the errors to retrieve for this game
	 * @returns {integer} the errors made for the particular game
	 */
	getErrors: function(gameNumber) {
		this.errorsMade = storage.get(this.keyNameForErrors, this.defaultErrors);
		return this.errorsMade[gameNumber];
	},
	
	/**
	 * Setter for errors
	 * @param {integer} gameNumber the game for which the error data will be saved to
	 * @param {integer} errorsForLevel the number of errors made for this game
	 */
	setErrors: function(gameNumber, errorsForLevel) {
		console.log("The game number: " + gameNumber + " and the errors saved: " + errorsForLevel); 
		this.errorsMade[gameNumber] = errorsForLevel;
		storage.set(this.keyNameForErrors, this.errorsMade);
	},

});