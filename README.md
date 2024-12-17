# Archiving
smmry.com appears to be no more

# smmry
A simple wrapper module for smmry.com api. https://smmry.com/api

## Getting Started
Install the module
```
npm install --save smmry
```

### Options
Require the module and pass your api key along with any default options you would like to use when calling the api.
```
const smmry = require('smmry')({
  SM_API_KEY: String', // REQUIRED
  SM_LENGTH: Number, // Optional, the number of sentences returned, default 7. - Maximum 40
  SM_KEYWORD_COUNT: Number, // Optional, N the number of keywords to return.
  SM_WITH_BREAK: Boolean, // Optional, inserts the string [BREAK] between sentences.
  SM_WITH_ENCODE: Boolean, // Optional, converts HTML entities to their applicable chars.
  SM_IGNORE_LENGTH: Boolean, // Optional, returns summary regardless of quality or length.
  SM_QUOTE_AVOID: Boolean, // Optional, sentences with quotations will be excluded.
  SM_QUESTION_AVOID: Boolean, // Optional, sentences with question will be excluded.
  SM_EXCLAMATION_AVOID: Boolean, // Optional, sentences with exclamation marks will be excluded.
});
```

### Methods
Module exposes 2 methods which return a promise:
1. `summarizeUrl(url, [overrideOptions])`
2. `summarizeText(text, [overrideOptions])`

```
const smmry = require('smmry')({ SM_API_KEY: 'your-api-key' });

smmry.summarizeUrl('http://some-url.com')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

const text = 'your long text goes here ...';

smmry.summarizeText(text)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// Provide override options as an optional parameter for the single api request
smmry.summarizeUrl(url, {
  SM_WITH_BREAK: true,
});
```
