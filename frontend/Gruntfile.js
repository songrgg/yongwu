module.exports = function(grunt) {
	var sources = [
		'application/entry.js',
		'application/controllers/*.js',
		'application/services/*.js',
		'application/directives/*.js'
	];
	var concat_file = 'build/yongwu.js';
	var dest_min_js = 'build/yongwu.min.js';

	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),
		concat: {
			options: {
				separator: '//--next--\n',
			},
			dist: {
				src: sources,
				dest: concat_file
			}
		},
		uglify: {
			options: {
						 banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                         mangle: false
					 },
			build: {
						src: concat_file,
						dest: dest_min_js
				   }
		},
		jshint: {
			files: sources,
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {
			files: sources,
			tasks: ['concat', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['concat', 'uglify', 'watch']);
}
