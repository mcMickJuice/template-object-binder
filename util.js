

//phase one: extract contents from delimited sections, replace with 
//indexed placeholders

//phase two: walk through extracted items and transform to values

//phase three: replace placeholders with actual values

//return to client 


export const extractDelimitedExpressionFromString = (htmlStr, extractRegex) => {
  let count = 0
  const matchList = [];

  let result = extractRegex.exec(htmlStr)
  while (result != null) {
    //extract content
    const match = result[0]
    const val = result[1];

    //store
    matchList.push({match, val});

    count++
    result = extractRegex.exec(htmlStr)
  }

  return matchList
}

export const transformExpressionToValueFromContext = (contextObj, propertyString) => {
  const propertyArray = propertyString.split('.');

  return propertyArray.reduce((obj, prop) => {
    return obj[prop];
  }, contextObj)
}

const dedupeList = (arr, isAddedPredicate) => {
  return arr.reduce((acc, next) => {
    if(!isAddedPredicate(acc, next)){
      acc.push(next);
    } 

    return acc;
  }, [])
}

const buildRegexGlobal = str => {
  return new RegExp(str, 'g');
}

export const replaceExpressionsWithValues = (str, matchesWithValues) => {
  //dedupe matchesWithValues
  const uniqueMatches = dedupeList(matchesWithValues, (acc, next) => {
    return acc.map(a => a.match).indexOf(next.match) > -1;
  });

  //str.replace with match.match and values
  const compiledString = uniqueMatches.reduce((str, match) => {
    var pattern = buildRegexGlobal(match.match);
    return str.replace(pattern, match.val);
  },str) 
  //return string

  return compiledString;
}

