import {extractDelimitedExpressionFromString, transformExpressionToValueFromContext, replaceExpressionsWithValues} from './util'

export const defaultConfig = {
  //{{scope.name}}
  extractRegex: /{{(.*?)}}/g,
}

const bindObjectToTemplate = (context, rawTemplate, options) => {
	const option = options || defaultConfig; //this should be a merge

	const matches = extractDelimitedExpressionFromString(rawTemplate, option.extractRegex);

	const matchesWithValues = matches.map(m => {
		return {
			match: m.match,
			val: transformExpressionToValueFromContext(context, m.val)
		}
	});

	const boundTemplate = replaceExpressionsWithValues(rawTemplate, matchesWithValues);

	return boundTemplate
}

export default bindObjectToTemplate