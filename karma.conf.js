module.exports = function(karma) {
  karma.set({
    frameworks: ['mocha', 'chai-jquery', 'chai', 'jquery-1.8.3', 'browserify'],
    files: [
      "./node_modules/phantomjs-polyfill/bind-polyfill.js",
      "app/**/*-test.js"
    ],
    preprocessors: {
      'app/**/*-test.js': [ 'browserify' ]
    },
    // logLevel: 'LOG_DEBUG',
    reporters: ['dots'],
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatch: false,
    browserify : {
      debug: false,
      transform: [ 'babelify', 'sassify' ]
    }
  });
};
