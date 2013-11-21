module( "testmathUtil" );

test("test random number generation between two same numbers", function() {
	var rand = mathUtil.random(5,5);
	equal(rand, 5);
});


test("test if random number generation generates only numbers in between", function() {
	for(var i = 0 ; i < 200 ; i++) {
		var rand = mathUtil.random(5,6);
		if (rand != 5 && rand != 6) {
			ok(false, "mathUtil.random(5, 6) returned " + rand);
		}
	}
	ok(true, "okay");
});


test("test getOnes on two digit number", function() {
	var out = mathUtil.getOnes(52);
	equal(out, 2);
});



test("test getOnes on one digit number", function() {
	var out = mathUtil.getOnes(8);
	equal(out, 8);
});


test("test getTens on one digit number", function() {
	var out = mathUtil.getTens(2);
	equal(out, 0);
});


test("test getTens on two digit number", function() {
	var out = mathUtil.getTens(52);
	equal(out, 5);
});


test("test getTens on three digit number", function() {
	var out = mathUtil.getTens(562);
	equal(out, 56);
});


test("test converting a number to a word", function() {
	var out = mathUtil.convertNumberToWord(62);
	equal(out, "SIXTY-TWO");
});












