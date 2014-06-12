module.exports = function(grunt) {
  grunt.initConfig({

    karma: {
			options: {
				configFile: 'test/karma.conf.js'
			},
			unit: {
				singleRun: true
			},
			continuous: {
				background: true
			}
    },

    protractor: {
	    options: {
	      configFile: "test/protractor-conf.js", // Default config file
	      // keepAlive: true, // If false, the grunt process stops when the test fails.
	      noColor: false, // If true, protractor will not use colors in its output.
	      // debug: true,
	      args: {

	      }
	    },
	    single: {
	    	options: {
		    	keepAlive: false
		    }
	    },
	    dev: {
	    	options: {
		    	keepAlive: true
		    }
	    }
	  },

		watch: {
      options: {
      	livereload: true
      },
      karma: {
        files: ['app/js/*.js', 'test/unit/*.js'],
        tasks: ['karma:continuous:run']
      }
  	},

  	run: {
	    mock_server: {
	      options: {
	        wait: false
	      },
	      args: ['app/mockApi/apiserver.js']
	    }
	  },

	  connect: {
    	options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
        	livereload: 35729,
          open: true,
          base: ['app']
          
        }
      },
      test: {
      	options: {
      		base: ['app']
      	}
      }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-run');

	grunt.registerTask('serve', ['karma:continuous:start', 'run:mock_server', 'connect:livereload', 'watch']);

	grunt.registerTask('unit-test', ['karma:continuous:start', 'watch']);

	grunt.registerTask('test', ['karma:unit:start', 'connect:test', 'run:mock_server', 'protractor:single']);
};