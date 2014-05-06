module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt
			.initConfig({
				pkg : grunt.file.readJSON('package.json'),

				shell : {

					build : {
						command : [
								'git add .',
								'git commit -m "last commit: <%= grunt.template.today("yyyy-mm-dd") %>"',
								'git push origin master' ].join('&&')
					}

				},

				watch : {
					scripts : {
						files : [ 'ts/**/*.ts', 'gruntfile.js' ],
						tasks : [ 'ts' ],
						options : {
							livereload : true,
							spawn : false,
						},
					},

					css : {
						files : [ 'scss/**/*.scss', '*.html' ],
						tasks : [ 'sass', 'autoprefixer' ],
						options : {
							livereload : true,
							spawn : false,
						}
					}
				},

				sass : {
					dist : {
						options : {
							compass : false,
							style : 'nested',
						},
						files : {
							'css/build/style.css' : 'scss/pages/style.scss'
						}
					}
				},

				autoprefixer : {

					options : {
						browsers : [ 'last 4 versions' ]
					},
					multiple_files : {
						expand : true,
						flatten : true,
						src : 'css/build/*.css',
						dest : 'css/build/prefixed/'
					}
				},
				ts : {
					base : {
						src : 'ts/pkg.ts',
						out : 'js/main.js',
						options : {
							target : 'es5',
							sourceMap : false,
							declaration : true,
							removeComments : true
						}
					}
				}

			});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-shell');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('dev', [ 'ts', 'sass', 'autoprefixer', 'watch' ]);
	grunt.registerTask('dev-css', [ 'sass', 'autoprefixer', 'watch' ]);
	grunt.registerTask('dev-ts', [ 'ts', 'watch' ]);
	grunt.registerTask('build', [ 'ts', 'sass', 'autoprefixer', 'shell' ]);

};
