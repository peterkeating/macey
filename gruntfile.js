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
        dist: './dist/',
        css: 'assets/css/',
        zip: 'macey.zip'
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
            dist: '<%= config.dist %>'
        },

        /**
         * Creates a zip file containing a production ready version of the theme.
         */
        compress: {
            dist: {
                options: {
                    archive: '<%= config.zip %>'
                },
                files: [
                    { cwd: '<%= config.dist %>', src: ['**'] }
                ]
            }
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
            },
            zip: {

            }
        },

        /**
         * Strips any HTML comments from the templates.
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true
                },
                files: {
                    '<%= config.dist %>default.hbs': '<%= config.dist %>default.hbs',
                }
            }
        },

        /**
         * Moves the zip produced by the grunt build process into the distributable
         * directory.
         */
        rename: {
            dist: {
                src: '<%= config.zip %>',
                dest: '<%= config.dist %>/<%= config.zip %>'
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
         * Updates the Google Analytics code.
         */
        'string-replace': {
            dist: {
                files: {
                    '<%= config.dist %>default.hbs': '<%= config.dist %>default.hbs'
                },
                options: {
                    replacements: [
                        /**
                         * Updates the Google Analytics code.
                         */
                        {
                            pattern: 'UA-XXXXX-X',
                            replacement: '<%= pkg.analyticsCode %>'
                        }
                    ]
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
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-rename');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * Default grunt task puts the theme in a ready for development mode.
     */
    grunt.registerTask('default', ['sass:dev', 'watch']);

    /**
     * Gets the theme ready for production.
     */
    grunt.registerTask('build', ['clean', 'sass:dist', 'copy', 'compress', 'htmlmin:dist', 'string-replace:dist', 'clean', 'rename']);
};
