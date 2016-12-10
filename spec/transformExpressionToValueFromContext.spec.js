import test from 'tape'
import {transformExpressionToValueFromContext} from '../util'
import deepfreeze from 'deepfreeze';

test('extract top level property', t => {
	t.plan(1);
	//method passes in context
	const propString = 'name';
	const expectedVal = 'Mike';
	const contextObj = {
		[propString]: expectedVal
	};

	const result = transformExpressionToValueFromContext(contextObj, propString);

	t.equal(result, expectedVal);
})

test('extract deep property', t => {
	t.plan(1);

	const propString = 'person.name';
	const expectedVal = 'Mike';
	const contextObj = {
		person: {
			name: expectedVal
		}
	}

	const result = transformExpressionToValueFromContext(contextObj, propString);

	t.equal(result, expectedVal);
})

test('extraction does not mutate contextObj', t => {
	t.plan(1);
	const obj = {name: 'mike'};
	
	t.doesNotThrow(() => {
		transformExpressionToValueFromContext(deepfreeze(obj), 'name');
	})
})