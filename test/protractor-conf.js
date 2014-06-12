exports.config = {
  specs: [
    '../test/e2e/*.js'
  ],

  multiCapabilities: [{
    'browserName': 'firefox'
  }, {
    'browserName': 'chrome'
  }, {
    'browserName': 'safari'
  }],

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine'
};
