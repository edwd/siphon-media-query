'use strict';

var parse = require('css').parse;
var stringify = require('css').stringify;

/**
 * Parses a string of CSS, returning only CSS inside of media queries.
 * @param {string} input - CSS to parse.
 * @param {string} [query] - Specific media query to extract. If omitted, all media query CSS will be extracted.
 * @returns {string} Matching CSS.
 */
module.exports = function(input, query) {
  let output = [];
  const rules = parse(input).stylesheet.rules;
  const all = !query;

  // Iterate over through array of all rules found in the CSS
  for (let rule of rules) {
    // Add CSS rules to the final list if it's an @media rule. If a media query was specified, only include the @media rules which match the media query (otherwise, include all @media rules).
    if (rule.type === 'media' && (rule.media === query || all)) {
      output.push(rule);
    }
  }

  // Turn the final list of CSS rules back into a stylesheet
  return stringify({
    type: 'stylesheet',
    stylesheet: { rules: output }
  });
};
