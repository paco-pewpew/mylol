module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		

		less: {
	      build: {
	        files: {
	          'public/assets/css/mainStyle.css': 'public/app/components/main/mainStyle.less',
	          'public/assets/css/templatesStyle.css': 'public/app/components/templates/templatesStyle.less',
	          'public/assets/css/gamerStyle.css': 'public/app/components/gamer/gamerStyle.less',
	          'public/assets/css/awesomeSliderStyle.css': 'public/app/shared/awesomeSlider/awesomeSliderStyle.less',	
	          'public/assets/css/awesomeTemplateStyle.css': 'public/app/shared/awesomeTemplate/awesomeTemplateStyle.less',
	          'public/assets/css/awesomeSnippetStyle.css': 'public/app/shared/awesomeSnippet/awesomeSnippetStyle.less',
	          'public/assets/css/riotDirectives.css':'public/app/shared/directives/riotDirectives.less',
	          'public/assets/css/visualDirectives.css':'public/app/shared/directives/visualDirectives.less'
	        }
	      }
	    },



	    watch: {
	      css: {
	        files: ['public/app/shared/**/*.less','public/app/components/**/*.less'],
	        tasks: ['less']
	      }
	    },

	    nodemon:{
			dev:{
				script:'server.js'
			}
		},

	    concurrent: {
	      options: {
	        logConcurrentOutput: true
	      },
	      tasks: ['nodemon', 'watch']
	    }  

	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	
	grunt.registerTask('default',['less','concurrent']);
};