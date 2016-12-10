import test from 'tape'
import {replaceExpressionsWithValues} from '../index'

test('replace single expression value', t => {
	t.plan(1);
	const val = 'mike'
	const match = '{{something}}';
	const matchesWithValues = [
		{match, val}
	];

	const result = replaceExpressionsWithValues(match, matchesWithValues);

	t.ok(result, val); 

	t.end()
})

test('replace multiple values', t => {
	t.plan(1)
	
	const val1 = 'mike';
	const val2 = 'sam';
	const match1 = '{{mikeName}}';
	const match2 = '{{samName}}';
	const matchesWithValues = [
		{match: match1, val1},
		{match: match2, val2}
	];

	const rawString = `Heres the string ${match1}. Heres the second string ${match2}`;
	const expectedString = `Heres the string ${val1}. Heres the second string ${val2}`;

	const result = replaceExpressionsWithValues(rawString, matchesWithValues);

	t.ok(result, expectedString);
})

test('replace str with duplicate expressions', t => {
	t.plan(1)
	const val = 'this is string'
	const match = '{{stringMatch}}'

	const matchesWithValues = [
		{match, val},
		{match, val}
	];

	const rawString = `This string has duplicate ${match}. This second sentence dupe ${match}`
	const expectedString = `This string has duplicate ${val}. This second sentence dupe ${val}`

	const result = replaceExpressionsWithValues(rawString, matchesWithValues);

	t.ok(result, expectedString);
})

test('str with no expressions returns same str', t => {
	t.plan(1);

	const rawString = 'Heres a raw string';

	const result = replaceExpressionsWithValues(rawString, []);

	t.ok(result, rawString);
})