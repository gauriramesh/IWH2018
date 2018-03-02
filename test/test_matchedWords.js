QUnit.module('matchedWords.js');

QUnit.test('All keywords in matched words are lowercase', (assert) => {
    const keywords = WORDS.words.map(word => word.keyword);
    for(let i = 0; i < keywords.length; i++) {
		let keyword = keywords[i];
        assert.deepEqual(keyword, keyword.toLowerCase());
    }
});