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
        dist: 'dist/',
        css: 'assets/css/'
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
                excludeEmpty: true,
                expand: true,
                src: [
                  './**/*.css',
                  './**/*.hbs',
                  '!./node_modules/**'
                ],
                dest: '<%= config.dist %>'
            }
        },

        /**
         * Compiles Sass into CSS.
         */
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= config.css %>styles.css': '<%= config.css %>styles.scss'
                }
            }
        }

    });

    /**
     * Loads libraries to assist with the build process.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['clean', 'sass:dist', 'copy']);
};
