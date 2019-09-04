'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// https://facebook.github.io/jest/web-app/en/webpack.html

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
