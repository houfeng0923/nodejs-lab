'use strict';

module.exports = function(grunt) {
    // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        opt: {
            assets   : './public'
        },
        watch: {
            client: {
                options: {
                    livereload: true
                },
                files: ['<%= opt.assets %>/**/*.{js,css,html}']
            }
        }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
