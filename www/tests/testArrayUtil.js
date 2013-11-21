module( "testarrayUtil" );

test("test generate number arrays for 1 increment", function() {
	var out = arrayUtil.generateNumberArray(5,10,1);
	var arrayIndex = 0;
	for(var i = 5 ; i <= 10 ; i++) {
		equal(out[arrayIndex], i);
		arrayIndex++;
	}
});


test("test generate number arrays for 2 increment for even number of items", function() {
	var out = arrayUtil.generateNumberArray(5,10,2);
	var arrayIndex = 0;
	for(var i = 5 ; i <= 10 ; i+=2) {
		equal(out[arrayIndex], i);
		arrayIndex++;
	}
});



test("test generate number arrays for 2 increment for even number of items", function() {
	var out = arrayUtil.generateNumberArray(5,9,2);
	var arrayIndex = 0;
	for(var i = 5 ; i <= 9 ; i+=2) {
		equal(out[arrayIndex], i);
		arrayIndex++;
	}
});


test("test shuffleArray does not affect input array", function() {
	var arr = arrayUtil.generateNumberArray(10,20,1);
	
	var out = arrayUtil.shuffleArray(arr);
	var arrayIndex = 0;
	for(var i = 10 ; i <= 20; i++) {
		equal(arr[arrayIndex], i);
		arrayIndex++;
	}
});








