module( "testkeyboardTextsGenerator" );


test("test if correct answer exists in generating keyboard tests", function() {
	var out = keyboardTextsGenerator.generate(['one', 'two', 'three'], 'four', 1);
	notEqual(out.indexOf("four"), -1);
});










