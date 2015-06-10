module.exports = function (grunt) {
    var appName = 'ToDoList';
    var prodPath = '../ToDoListServer/WebContent';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all: {
                src: [
                    'src/app/modules/**/*Module.js',
                    'src/app/modules/**/*.js',
                    'src/app/app.js',
                    'src/app/routes.js'
                ],
                dest: 'grunt_temp/' + appName + '_UNCAT.js',
                options: {
                    process: function (src, filePath) {
                        if (filePath.indexOf("routes.js") > -1) {
                            return src;
                        }
                        var folderPath = filePath.substring(0, filePath.lastIndexOf('/')) + "/";
                        var appFolderPath = new RegExp("src/app/");
                        folderPath = folderPath.replace(appFolderPath, "");
                        var patternWithSingleQuotes = "templateUrl:[\\s]*'";
                        var patternWithDoubleQuotes = 'templateUrl:[\\s]*"';
                        var templateUrlRegExpWithSingleQuotes = new RegExp(patternWithSingleQuotes, 'g');
                        var templateUrlRegExpWithDoubleQuotes = new RegExp(patternWithDoubleQuotes, 'g');
                        if (src.match(templateUrlRegExpWithDoubleQuotes) || src.match(templateUrlRegExpWithSingleQuotes)) {
                            console.info("Replacing templateUrl in file " + filePath + "...");
                        }
                        var srcWithPath = src.replace(templateUrlRegExpWithSingleQuotes, "templateUrl: '" + folderPath);
                        srcWithPath = srcWithPath.replace(templateUrlRegExpWithDoubleQuotes, 'templateUrl: "' + folderPath);
                        return srcWithPath;
                    }
                }
            }
        },
        uglify: {
            prod: {
                src: 'grunt_temp/' + appName + '_UNCAT.js',
                dest: 'prod_dist/' + appName + '.min.js'
            },
            dev: {
                src: 'grunt_temp/' + appName + '_UNCAT.js',
                dest: 'prod_dist/' + appName + '.min.js',
                options: {
                    mangle: false,
                    beautify: true
                }
            }
        },
        copy: {
            minified_to_src: {
                files: [
                    {expand: true, cwd: 'prod_dist/', src: ['ToDoList.min.js'], dest: 'src/app/'}
                ]
            },
            from_src_to_prod_dist: {
                files: [
                    {expand: true, cwd: 'src/app', src: ['**/*.html'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/app', src: ['**/*.css'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/app', src: ['test_data/*.json'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/app', src: ['resources/**/*'], dest: 'prod_dist/'}
                ]
            },
            from_prod_dist_to_server: {
                files: [
                    {expand: true, cwd: 'prod_dist/', src: ['**/*'], dest: prodPath}
                ]
            }
        },
        watch: {
            scripts: {
                files: ['src/app/**/*.js', '!**/*.min.js', 'src/app/**/*.html', 'src/app/**/*.css', 'src/app/**/*.json'],
                tasks: ['dev'],
                options: {
                    livereload: true
                }
            }
        },
        clean: {
            options: {
                'no-write': false,
                force: true

            },
            prod: ['prod_dist/**/*', 'grunt_temp/**/*', prodPath + '/app']
        },
        connect: {
            server: {
                options: {
                    port: 9999,
                    hostname: 'localhost',
                    base: 'src/app/',
                    keepalive: false,
                    open: true,
                    livereload: true,
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect.static('src/app'),
                            // Make empty directories browsable.
                            connect.directory('src/app')
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/rest',
                        host: 'localhost',
                        port: 8080,
                        rewrite: {
                            '^': '/ToDoListServer'
                        }
                    }
                ]
            }
        }
    });

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-war');
    grunt.loadNpmTasks('grunt-contrib-connect'); //test
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.registerTask('default', 'dev');
    grunt.registerTask('prod', ['clean:prod', 'concat', 'uglify:prod', 'copy:from_src_to_prod_dist', 'copy:from_prod_dist_to_server']);
    grunt.registerTask('dev', ['concat', 'uglify:dev', 'copy:minified_to_src']);
    grunt.registerTask('server', ['clean', 'configureProxies:server', 'connect:server', 'watch']);
};