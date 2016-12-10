import test from 'tape'
import { extractDelimitedExpressionFromString } from '../util'
import {defaultConfig} from '../index'

test('extract one value from html template', t => {
	t.plan(3)
	const expectedVal = 'hello';
	const str = `{{${expectedVal}}}`

	const result = extractDelimitedExpressionFromString(str, defaultConfig.extractRegex);

	t.equal(result.length, 1, 'One Match');
	t.equal(result[0].match, `{{${expectedVal}}}`, 'Matched expression')
	t.equal(result[0].val, expectedVal, 'Matched Value')

	t.end();
})

test('extract multiple values from html template', t => {
	t.plan(3);

	const firstVal = 'first Value in string';
	const secondVal = 'secondValue here';

	const str = `<span>Here is {{${firstVal}}}</span><div>Oh wow another one {{${secondVal}}}</div>`

	const result = extractDelimitedExpressionFromString(str, defaultConfig.extractRegex);

	t.equal(result.length, 2, 'Has two results');

	var first = result[0];
	t.equal(first.val, firstVal, 'First Value matches');
	var second = result[1];
	t.equal(second.val, secondVal, 'Second value matches');

	t.end();
})

test('extract multiple values even if repeating', t => {
	t.plan(3);
	const val = 'this value is repeated';

	const str = `<span>first val {{${val}}}</span><div> second val {{${val}}}</div>`

	const result = extractDelimitedExpressionFromString(str, defaultConfig.extractRegex);

	t.equal(result.length, 2, 'Has two results - Duplicate expression matches result in as many matches');

	const first = result[0];
	const second = result[1];
	t.equal(first.val, second.val, 'Both matches val match');
	t.equal(first.val, val, 'Matched values match expected val')

	t.end();
})

test('extraction returns empty collection if no matches found', t => {
   t.plan(1);

   const str = 'heres a string without any delimited expression';

   const result = extractDelimitedExpressionFromString(str, defaultConfig.extractRegex);

   t.equal(result.length, 0, 'No Results')

   t.end();
})