var gulp = require('gulp');
var jest = require('jest-cli');

var jestConfig = {
  rootDir: 'app',
  scriptPreprocessor: '../preprocessor',
  unmockedModulePathPatterns: [
    'node_modules/react',
    'node_modules/react-dom',
    'node_modules/react-addons-test-utils',
    'node_modules/fbjs'
  ],
  testPathIgnorePatterns: [
    "node_modules",
    "spec/support"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "react"
  ]
};

gulp.task('jest', function (done) {
  jest.runCLI({ config : jestConfig }, ".", function() {
    done();
  });
});
