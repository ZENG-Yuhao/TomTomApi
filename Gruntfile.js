module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            css: {
                files: {
                    'public/build/stylesheets/front/lib.min.css' : ['public/lib/elite-admin/bootstrap-switch.min.css', 'public/lib/nouislider/nouislider.min.css'],
                    'public/build/stylesheets/front/stylesheets.min.css' : ['public/build/stylesheets/front/stylesheets.css'],
                    'public/build/stylesheets/back/stylesheets.min.css' : ['public/build/stylesheets/back/stylesheets.css'],
                    'public/build/stylesheets/shared/editor-custom-style.min.css' : ['public/build/stylesheets/shared/editor-custom-style.css'],
                    'public/build/stylesheets/back/lib.min.css' : ['public/lib/elite-admin/spinner.css', 'public/lib/elite-admin/style.css', 'public/lib/sidebar-nav/css/sidebar-nav.min.css', 'public/lib/elite-admin/default.css', 'public/lib/elite-admin/bootstrap-table.min.css', 'public/lib/elite-admin/bootstrap-switch.min.css', 'public/lib/dropzone/dropzone.min.css', 'public/lib/cropperjs/cropper.min.css', 'public/lib/datatables/datatables.min.css'],
                    'public/build/stylesheets/front/stylesheets-print.min.css' : ['public/build/stylesheets/front/stylesheets-print.css', 'public/lib/datatables/datatables.min.css']
                }
            }
        },

        cssmin : {
            css:{
                files: {
                    'public/build/stylesheets/front/lib.min.css' : ['public/build/stylesheets/front/lib.min.css'],
                    'public/build/stylesheets/front/stylesheets.min.css' : ['public/build/stylesheets/front/stylesheets.min.css'],
                    'public/build/stylesheets/back/stylesheets.min.css' : ['public/build/stylesheets/back/stylesheets.min.css'],
                    'public/build/stylesheets/shared/editor-custom-style.min.css' : ['public/build/stylesheets/shared/editor-custom-style.min.css'],
                    'public/build/stylesheets/back/lib.min.css' : ['public/build/stylesheets/back/lib.min.css'],
                    'public/build/stylesheets/front/stylesheets-print.min.css' : ['public/build/stylesheets/front/stylesheets-print.min.css']
                }
            }
        },

        uglify : {
            options: {
                compress: {
                    drop_console: true
                }
            },
            js: {
                files: {
                    'public/build/javascripts/back/lib.min.js' : ['public/lib/moment/moment-with-locales.js', 'public/lib/bootstrap/3.3.6/js/bootstrap-datepicker.js', 'public/lib/jquery-inputmask/jquery.mask.min.js', 'public/lib/markercluster/markerclusterer.min.js', 'public/lib/ckeditor/ckeditor.js', 'public/lib/sidebar-nav/js/sidebar-nav.min.js', 'public/lib/elite-admin/bootstrap-switch.min.js', 'public/lib/datatables/datatables.min.js' ],
                    'public/build/javascripts/front/lib.min.js' : ['public/lib/moment/moment-with-locales.js', 'public/lib/bootstrap/3.3.6/js/bootstrap-datepicker.js', 'public/lib/jquery-inputmask/jquery.mask.min.js', 'public/lib/markercluster/markerclusterer.min.js', 'public/lib/elite-admin/bootstrap-switch.min.js', 'public/lib/datatables/datatables.min.js',  'public/lib/wNumb/wNumb.js'],
                    'public/build/javascripts/front/javascripts.min.js' : [ 'public/build/javascripts/front/javascripts.js' ],
                    'public/build/javascripts/back/javascripts.min.js' : [ 'public/build/javascripts/back/javascripts.js' ]
                }
            }
        },

        watch: {
            stylus: {
                files: ['public/stylesheets/**/*.styl'],
                tasks: ['stylus'],
                "options": {
                    "spawn": "false"
                }
            },
            browserifyFront: {
                files: ['public/javascripts/front/**/*.ts', 'public/javascripts/front/**/*.js'],
                tasks: ['browserify:front']
            },
            browserifyback: {
                files: ['public/javascripts/back/**/*.ts', 'public/javascripts/back/**/*.js'],
                tasks: ['browserify:back']
            },
            browserifyShared: {
                files: ['public/javascripts/shared/**/*.ts', 'public/javascripts/shared/**/*.js'],
                tasks: ['browserify']
            }
        },

        stylus: {
            compile: {
                options: {
                    paths: ['public/stylesheets'],
                    import: [           //  @import 'foo', 'bar/moo', etc. into every .styl file
                        'mixins', 'icomoon'        //  that is compiled. These might be findable based on values you gave
                    ],
                    compress: false,
                    use: [
                        require('rupture') // use stylus plugin at compile time
                    ]
                },
                files: {
                    'public/build/stylesheets/front/stylesheets.css': ['public/stylesheets/front/main.styl', 'public/stylesheets/front/sidemenu.styl', 'public/stylesheets/front/notifications.styl' ],
                    'public/build/stylesheets/back/stylesheets.css': ['public/stylesheets/back/main.styl', 'public/stylesheets/back/notifications.styl' ],
                    'public/build/stylesheets/shared/editor-custom-style.css': ['public/stylesheets/shared/editor-custom-style.styl' ],
                    'public/build/stylesheets/front/stylesheets-print.css': ['public/stylesheets/front/print.styl' ]
                }
            }
        },

        //https://www.npmjs.com/~types
        browserify: {
            options: {
                browserifyOptions: {debug: true},
                configure: function (bundler) {
                    bundler.plugin(require('tsify'));
                    bundler.transform(require('babelify'), {
                        presets: ['es2015', 'stage-3'],
                        extensions: ['.ts']
                    });
                }
            },
            front: {
                files: {
                    'public/build/javascripts/front/javascripts.js': ['public/javascripts/shared/**/*.ts', 'public/javascripts/front/**/*.ts', 'public/javascripts/front/**/*.js']
                }
            },
            back: {
                files: {
                    'public/build/javascripts/back/javascripts.js': ['public/javascripts/shared/**/*.ts', 'public/javascripts/back/**/*.ts', 'public/javascripts/back/**/*.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['public/fonts/**'], dest: 'public/build/fonts/', filter: 'isFile'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['stylus', 'browserify:front', 'browserify:back', 'concat', 'cssmin', 'uglify:js', 'copy']);
    grunt.registerTask('dev', [ 'stylus', 'browserify:front', 'browserify:back', 'watch']);
};