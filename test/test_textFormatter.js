QUnit.module('textFormatter.js');

QUnit.test('Remove code with one set of html tags', (assert) => {
    let htmlString = "<p>this is a test</p>";
    htmlString = removeCode(htmlString);
    assert.deepEqual(htmlString, "this is a test");
});

QUnit.test('Remove code with two sets of html tags', (assert) => {
    let htmlString = "<p><div>this is a test</div></p>";
    htmlString = removeCode(htmlString);
    assert.deepEqual(htmlString, "this is a test");
});

QUnit.test('Test removeBeginningBr one <br>', (assert) => {
	let str = "<br>Message";
	
	let expected = "Message";
	let actual = removeBeginningBr(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test removeBeginningBr many <br>\'s', (assert) => {
	let str = "<br><br><br>Message";
	
	let expected = "Message";
	let actual = removeBeginningBr(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test removeBeginningBr doesn\'t remove <br>s in the middle of the message', (assert) => {
	let str = "<br><br><br>Message <br> test";
	
	let expected = "Message <br> test";
	let actual = removeBeginningBr(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test removeBeginningBr no <br>\'s', (assert) => {
	let str = "Message";
	
	let expected = "Message";
	let actual = removeBeginningBr(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test removeBeginningWhiteSpace tab', (assert) => {
	let str = "	Message";
	
	let expected = "Message";
	let actual = removeBeginningWhiteSpace(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test removeBeginningWhiteSpace newline', (assert) => {
	let str = "\nMessage";
	
	let expected = "Message";
	let actual = removeBeginningWhiteSpace(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test formatLineBreaks', (assert) => {
	let str = "<p>Test</p>"
	let lineBreak = "\n";
	
	let expected = "Test\n"
	let actual = formatLineBreaks(str, lineBreak);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test formatLineBreaks', (assert) => {
	let str = "<div><p>Test</p><p></p></div>"
	let lineBreak = "\n";
	
	let expected = "\nTest\n"
	let actual = formatLineBreaks(str, lineBreak);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test formatLineBreaks', (assert) => {
	let str = "<div><p>Test<br>Hello<br></p><p></p></div>"
	let lineBreak = "\n";
	
	let expected = "\nTest\nHello\n\n"
	let actual = formatLineBreaks(str, lineBreak);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test formatLineBreaks', (assert) => {
	let str = "<div><div><div><p>Test<br>Hello<br></p><p></p></div></div></div>"
	let lineBreak = "<br>";
	let exclusions = ["br"];
	
	let expected = "<br><br>Test<br>Hello<br><br>"
	let actual = formatLineBreaks(str, lineBreak, exclusions);
	
	assert.deepEqual(actual, expected);	
});

QUnit.test('Test prepareForCopy', (assert) => {
	let str = "<div><div><div><p>Test<br>Hello<br></p><p></p></div></div></div>"
	
	let expected = "\nTest\nHello\n\n"
	let actual = prepareForCopy(str);
	
	assert.deepEqual(actual, expected);
});

QUnit.test('Test prepareForDisplay', (assert) => {
	let str = "<div><div><div><p>Test<br>Hello<br></p><p></p></div></div></div>"
	
	let expected = "Test<br>Hello<br><br>"
	let actual = prepareForDisplay(str);
	
	assert.deepEqual(actual, expected);
});






