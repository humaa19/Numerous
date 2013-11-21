// This script is used to initialise all the components that is to be used in
// the application.

var storage = new Storage();
	
if (env.phoneGap) {
	var music = new PhonegapMusic();
} else {
	var music = new BrowserMusic();
}

var keyboardTextsGenerator = new KeyboardTextsGenerator();
var arrayUtil = new ArrayUtil();
var mathUtil = new MathUtil();
var dimensionUtil = new DimensionUtil();
var widgetUtil = new WidgetUtil();
var loaderUtil = new LoaderUtil();
var speechUtil = new SpeechUtil();
var additionGameHelper = new AdditionGameHelper();
