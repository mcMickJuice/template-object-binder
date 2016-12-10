import test from 'tape';
import * as bindFunctionModule from '../index'

const bindFunction = bindFunctionModule.default;

test('bind simple object', t => {
	t.plan(1)
	
	const context = {
		name: 'mike',
		age: 32
	}

	const template = 'Hey this is {{name}} and im {{age}}';
	const expected = `Hey this is ${context.name} and im ${context.age}`
	const boundTemplate = bindFunction(context, template);

	t.equal(boundTemplate, expected);
})

test('bind complex object', t => {
	t.plan(1);

	const context = {
		person: {
			name: 'mike'
		},
		location : {
			city: 'mpls',
			zip: 55407
		}
	}

	const template = '{{person.name}} lives in {{location.city}} -- {{location.zip}}';
	const expected = `${context.person.name} lives in ${context.location.city} -- ${context.location.zip}`;

	const result = bindFunction(context, template);

	t.equal(result, expected);
})

test('bind to template with duplicate expressions', t => {
	t.plan(1);

	const context = {
		person: {
			name: 'mike'
		},
		location: 'mpls'
	}

	const template = 'hey its {{person.name}}. remember {{person.name}}? he lives in {{location}}';
	const expected = `hey its ${context.person.name}. remember ${context.person.name}? he lives in ${context.location}`;

	const result = bindFunction(context, template);

	t.equal(result, expected);
})
