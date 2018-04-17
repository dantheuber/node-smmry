const assignIn = require('lodash.assignin');
const rp = require('request-promise');

const API_URL = 'https://api.smmry.com';

const defaultOptions = {
  SM_API_KEY: undefined,
  SM_LENGTH: undefined,
  SM_KEYWORD_COUNT: undefined,
  SM_WITH_BREAK: undefined,
  SM_WITH_ENCODE: undefined,
  SM_IGNORE_LENGTH: undefined,
  SM_QUOTE_AVOID: undefined,
  SM_QUESTION_AVOID: undefined,
  SM_EXCLAMATION_AVOID: undefined,
};

const buildQuery = query => Object.keys(query)
        .reduce((acc, val) => {
          if (!query[val]) return acc;
          return (`${acc}${((acc && '&') || '?')}${val}=${query[val]}`);
        }, '');

module.exports = (options) => {
  const opts = assignIn(defaultOptions, options);
  if (!opts.SM_API_KEY) {
    throw new Error('You must provide your smmry.com api key! { SM_API_KEY: "yourapikey" }');
  }

  return {
    summarizeUrl: (url, overrideOpts) => {
      const query = buildQuery(assignIn(opts, overrideOpts, { SM_URL: encodeURIComponent(url) }));
      const rpOpts = {
        method: 'GET',
        uri: `${API_URL}${query}`,
        json: true,
      };
      return rp(rpOpts);
    },
    summarizeText: (text, overrideOpts) => {
      const query = buildQuery(assignIn(opts, overrideOpts));
      const rpOpts = {
        method: 'POST',
        uri: `${API_URL}${query}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Expect: ''
        },
        body: `sm_api_input=${text}`,
        json: true,
      };
      return rp(rpOpts);
    },
  };
};