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
                    './**/*.js',
                    './assets/icons/**',
                    '!./gruntfile.js',
                    '!./node_modules/**',
                    '!./**/*.md'
                ],
                dest: '<%= config.dist %>'
            }
        },

        /**
         * Compiles Sass into CSS.
         */
        sass: {
            /**
             * For production, Sass is compiled into compressed style sheet in order
             * to reduce weight of file.
             */
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= config.css %>styles.css': '<%= config.css %>styles.scss'
                }
            },

            /**
             * For development, Sass is compiled into readable style sheet.
             */
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= config.css %>styles.css': '<%= config.css %>styles.scss'
                }
            }
        },

        /**
         * Starts watching files for additions, changes or deletions, which will
         * trigger a task to be run. Current tasks are display below.
         *
         * - Changes to .scss files will trigger a Sass to CSS conversion.
         */
        watch: {

            /**
             * Any changes made to a .scss file in the project trigger a conversion
             * of Sass to CSS.
             */
            sass: {
                files: '**/*.scss',
                tasks: ['sass:dev']
            }
        },

    });

    /**
     * Loads libraries to assist with the build process.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'sass:dist', 'copy']);
};
