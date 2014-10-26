'use strict';

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        opt: {
            nodeEnv  : 'local',
            rootPath : './',
            serverJS : './bin/app.js',
            assets   : './public',
            port: {
                'node'      : 6001,
                'debug'     : 5856,
                'inspector' : 8596
            }
        },
        // run the demo server and debugger tool
        nodemon: {
            server: {
                script: '<%= opt.serverJS %>',
                options: {
                    ext: 'js, json',
                    watch    : ['<%= opt.rootPath %>'],
                    ignore   : ['node_modules/**', '<%= opt.assets %>'],
                    nodeArgs : ['--debug=<%= opt.port.debug %>'],
                    env: {
                        PORT     : '<%= opt.port.node %>',
                        NODE_ENV : '<%= opt.nodeEnv %>'
                    },
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted',
                                    'rebooted: ' + new Date()
                                );
                            }, 500);
                        });
                    }
                }
            }
        },
        'node-inspector': {
            server: {
                options: {
                    'web-port'   : '<%= opt.port.inspector %>',
                    'debug-port' : '<%= opt.port.debug %>'
                }
            }
        },
        watch: {
            server: {
                options: {
                    livereload: true
                },
                files: ['.rebooted']
            },
            client: {
                options: {
                    livereload: true
                },
                files: ['<%= opt.assets %>/**/*.{js,css,html}']
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            debug: [
                'nodemon:server', 'node-inspector:server',
                'watch:server'
            ]
        },
        env: {
            options: {
                PORT: '<%= opt.port.node %>',
                DEBUG_COLORS: true // logger依照此環境變量決定是否輸出顏色
            },
            local: {
                NODE_ENV: 'local' // 線上: prod, daily: dev, 本地: local
            }
        },
        shell: {
            server: {
                command: 'node bin/app.js'
            }
        }
    });


    // 啟動服務器並設定環境變量為 NODE_ENV=local (本地開發)
    grunt.registerTask('startLocal'  , ['env:local', 'shell:server']);

    // 啟用服務器，並加載 nodemon(自動重啟), node-inspector (調試), live-reload (瀏覽器自動刷新)
    grunt.registerTask('debug'  , ['concurrent:debug']);

    // 預設命令為 demo
    grunt.registerTask('default', ['startLocal']);
};
