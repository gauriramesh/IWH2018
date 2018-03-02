QUnit.module('analyzeText.js');

QUnit.test('Test constructor instantiates keywords', (assert) => {
	let analyzer = new textAnalyzer();
	
	assert.notEqual(analyzer.keywords, undefined);	
});

QUnit.test('Test constructor instantiates foundWords', (assert) => {
	let analyzer = new textAnalyzer();
	
	assert.notEqual(analyzer.foundWords, undefined);
	assert.deepEqual(analyzer.foundWords, []);
});

QUnit.test('Test constructor instantiates foundWordReplacements', (assert) => {
	let analyzer = new textAnalyzer();
	
	assert.notEqual(analyzer.foundWordReplacements, undefined);	
	assert.deepEqual(analyzer.foundWordReplacements, []);
});

QUnit.test('Keywords are pulled in correctly', (assert) => {
	let analyzer = new textAnalyzer();
	assert.deepEqual(analyzer.keywords.length, WORDS.words.length);
	
	let expectedKeywords = WORDS.words.map((word) => word.keyword);
	for(let i = 0; i < expectedKeywords.length; i++){
		let keyword = expectedKeywords[i];
		assert.notEqual(analyzer.keywords.indexOf(keyword), -1);
	}
});

QUnit.test('Test findMatches many matches', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "I'm just so sorry or whatever may be wrong";
	
	let expected = ["just", "sorry", "or whatever", "may be wrong"];
	analyzer.findMatches(message);
	
	let actual = analyzer.foundWords;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test findMatches one match', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "I'm just so confident in myself";
	
	let expected = ["just"];
	analyzer.findMatches(message);
	
	let actual = analyzer.foundWords;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test findMatches no matches', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "I'm so confident in myself";
	
	let expected = [];
	analyzer.findMatches(message);
	
	let actual = analyzer.foundWords;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test getReplacements no matches', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "I'm so confident in myself";
	
	let	expected = [];
	
	analyzer.findMatches(message);
	analyzer.getReplacements();
	
	let actual = analyzer.foundWordReplacements;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test getReplacements one match', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "I'm just so confident in myself";
	
	let	expected = [""];
	
	analyzer.findMatches(message);
	analyzer.getReplacements();
	
	let actual = analyzer.foundWordReplacements;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test getReplacements many matches', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "Hey I'm just so sorry or whatever may be wrong hey";
	
	let	expected = ["hello","", "", "", "", "hello"];
	
	analyzer.findMatches(message);
	analyzer.getReplacements();
	
	let actual = analyzer.foundWordReplacements;
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test analyze', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "Hey I'm just so sorry";
	
	let expected = '<span id="warningId0" contenteditable="false" class="warning">Hey</span> I\'m <span id="warningId1" contenteditable="false" class="warning">just</span> so <span id="warningId2" contenteditable="false" class="warning">sorry</span>';
	let actual = analyzer.analyze(message);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test analyze doesn\'t pick up keywords in the middle of other words', (assert) => {
	let analyzer = new textAnalyzer();
	let message = "Injustice anywhere is a threat to justice everywhere";
	
	let expected = message;
	let actual = analyzer.analyze(message);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test processCapitalization should capitalize', (assert) => {
	let analyzer = new textAnalyzer();
	let replace = "hello";
	let innerText = "Hey";
	
	let expected = "Hello";
	let actual = analyzer.processCapitalization(replace, innerText);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test processCapitalization should not capitalize', (assert) => {
	let analyzer = new textAnalyzer();
	let replace = "hello";
	let innerText = "hey";
	
	let expected = "hello";
	let actual = analyzer.processCapitalization(replace, innerText);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test processCapitalization replacement is empty string', (assert) => {
	let analyzer = new textAnalyzer();
	let replace = "";
	let innerText = "Hey";
	
	let expected = "";
	let actual = analyzer.processCapitalization(replace, innerText);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test processCapitalization replacement should capitalize first word', (assert) => {
	let analyzer = new textAnalyzer();
	let replace = "this is a replacement";
	let innerText = "Capitalized phrase";
	
	let expected = "This is a replacement";
	let actual = analyzer.processCapitalization(replace, innerText);
	
	assert.deepEqual(actual, expected);	
});
