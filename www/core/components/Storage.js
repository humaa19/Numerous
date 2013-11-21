/**
 * @class Class to persistently store the data in a key-value format
 */
var Storage = new Class ( /** @lends Storage.prototype */ {

	/**
	 * Stores a key-value pair in persistent storage
	 * @param key the identifier
	 * @param value the value to store
	 */
	set: function(key, value) {
		$.jStorage.set(key, value);
	},
	
	/**
	 * gets the value given a key from the persistent storage
	 * @param key the identifier
	 * @param defaultValue is the value to return if the entry does not already exist in the storage
	 * @returns the value corresponding to the key
	 */
	get: function(key, defaultValue) {
		if ($.jStorage.get(key, null) == null) {
			$.jStorage.set(key, defaultValue);
		}
		return $.jStorage.get(key);
	},
	
	/**
	 * the key to delete from the persistent storage
	 * @param key the key to delete
	 */
	deleteKey: function(key) {
		$.jStorage.deleteKey(key);
	},
	
});
