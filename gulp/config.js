'use strict';

module.exports = {

  'serverport': 3000,

  'scripts': {
    'src': './app/js/**/*.js',
    'dest': './build/js/'
  },

  'images': {
    'src': './app/images/**/*.{jpeg,jpg,png,gif}',
    'dest': './build/images/'
  },

  'styles': {
    'src': './app/styles/**/*.*',
    'dest': './build/css/'
  },

  'bootstrap': {
    'src': './app/styles/bootstrap/**/*.*',
    'dest': './build/css/'
  },

  'fontawesome': {
    'src': './app/styles/fontawesome/**/*.*',
    'dest': './build/css/'
  },

  'sourceDir': './app/',

  'buildDir': './build/'

};
