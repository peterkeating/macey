/**
 * Unfamiliar with Grunt? Here are some links that will allow you to learn more.
 *
 * - http://gruntjs.com
 * - http://gruntjs.com/getting-started
 * - http://howtonode.org/introduction-to-npm
 */

'use strict';

module.exports = function(grunt) {

    /**
     * Configuration object for the build process.
     */
    var config = {
        dist: 'dist/'
    };

    /**
     * Configuring the tasks available for the build process.
     */
    grunt.initConfig({

        config: config,
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Deletes artefacts from the previous build.
         */
        clean: {
            dist: './<%= config.dist %>'
        },

        /**
         * Copies files into the distributable directory.
         */
        copy: {
            dist: {
                expand: true,
                src: [
                  './**',
                  '!./node_modules/**',
                  '!./.git/**',
                  '!./gruntfile.js',
                  '!./package.json',
                  '!./*.md'
                ],
                dest: '<%= config.dist %>'
            }
        }

    });

    /**
     * Loads libraries to assist with the build process.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'copy']);
};
