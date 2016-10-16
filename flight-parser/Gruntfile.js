module.exports = function(grunt) {

	var es2015 = require('babel-preset-es2015');

	// Project configuration.
	grunt.initConfig({
		babel: {
			options: {
				sourceMap: false,
				"presets": es2015
			},
			dist: {
				files: {
					"index.js": "index.es6.js"
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-babel');
	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['babel']);
};