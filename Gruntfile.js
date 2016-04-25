/**
 * Edited by Nilesh On 25/04/2016
 * Gruntfile.js      [Contains the grunt tasks configuration for browserStorage project]
 */

module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ["dist/"],
    },

    /*-----Js Code linting----------*/
    jshint: {
      options: {
        eqeqeq: true,
        freeze: true,
        iterator: false,
        latedef: true,
        loopfunc: true
      },
      //Source For public
      build: ['browser-storage.js']
    },

    /*-----Uglify and minify Js------*/
    uglify: {
      options: {
        beautify: false,
        mangle: true,
        preserveComments: false
      },
      // Partner Uglify
      'build': {
        files: [{
          expand: true,
          src: ['browser-storage.js'],
          dest: 'dist/',
          cwd: '',
          ext: '.min.js'
        }],
      }
    }
  });


  // Load all "grunt-*" tasks from package.json
  require('load-grunt-tasks')(grunt);



  /*==========Register Default Task for Production=========*/
  grunt.registerTask('default', ['clean', 'jshint', 'uglify']);



}
