module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'test/lib/angular-mocks.js',
      'app/js/app.js',
    
      // 'app/partials/directives/*.html',
      // 'app/partials/*.html',

      'test/unit/*.js'
    ], 
    exclude : [
      'app/lib/angular/angular-loader.js'
      , 'app/lib/angular/*.min.js'
      , 'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'PhantomJS', 'Firefox'],

    preprocessors: {
      // 'app/partials/directives/*.html': 'html2js',
      // 'app/partials/*.html': 'html2js'
    },

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        'karma-phantomjs-launcher'
    ],
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    }
})}
