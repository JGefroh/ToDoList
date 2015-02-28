module.exports = function(grunt) {
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
                    process: function(src, filePath) {
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
                dest: 'prod_dist/app/' + appName + '.min.js'
            },
            dev: {
                src: 'grunt_temp/' + appName + '_UNCAT.js',
                dest: 'src/app/' + appName + '.min.js',
                options: {
                    mangle:false,
                    beautify: true
                }
            }
        },
        copy: {
            prod: {
                files: [
                    {expand: true, cwd: 'src/', src: ['app/**/*.html'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/', src: ['app/resources/**/*'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'prod_dist/', src: ['**/*'], dest: prodPath}
                ]
            }
        },
        watch: {
            scripts: {
                files: ['src/app/**/*.js', '!**/*.min.js', 'src/app/**/*.css', 'src/app/**/*.html'],
                tasks: ['prod']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', 'dev');
    grunt.registerTask('prod', ['concat', 'uglify:prod', 'copy:prod']);
    grunt.registerTask('dev', ['concat', 'uglify:dev']);
};