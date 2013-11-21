module( "testadditionGameHelper" );

test("test correct generation of the answer of a question", function() {
	for(var i = 0; i < 17; i++) {
		var out = additionGameHelper.generateQuestion(i);
		equal(out.answer, out.left + out.right);
	}
});








