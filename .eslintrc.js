// ===============================================================
// Airbnb JavaScript Style Guide
// https://github.com/airbnb/javascript
// https://github.com/walmartlabs/eslint-config-defaults
// http://eslint.org/docs/rules/
// ===============================================================

module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': [2, 'never'],
    eqeqeq: 0,
    'func-names': 0,
    'generator-star-spacing': [2, { before: true, after: false }],
    'global-require': 0,
    indent: [2, 2, { SwitchCase: 1 }],
    'lines-around-directive': [2, { before: 'never', after: 'always' }],
    'max-len': [1, 160, 2],
    'new-cap': [2, { newIsCap: true, capIsNew: false }],
    'no-bitwise': 0,
    'no-multi-assign': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    'space-before-function-paren': [2, 'never'],
    'spaced-comment': [2, 'always', {
      exceptions: ['*', '!']
    }],
    'require-yield': 0,
    'no-mixed-operators': [2, {
      groups: [
        '& | ^ ~ << >> >>>',
        '== != === !== > >= < <=',
        'in instanceof'
      ].map(group => group.split(' '))
    }]
  }
};
