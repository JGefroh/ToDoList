module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all: {
                src: [
                    'src/app/modules/**/*.js',
                    'src/app/app.js',
                    'src/app/routes.js'
                ],
                dest: 'grunt_temp/ToDoList_UNCAT.js'
            }
        },
        uglify: {
            prod: {
                src: 'grunt_temp/ToDoList_UNCAT.js',
                dest: 'prod_dist/app/ToDoList.min.js'
            },
            dev: {
                src: 'grunt_temp/ToDoList_UNCAT.js',
                dest: 'src/app/ToDoList.min.js'
            }
        },
        copy: {
            prod: {
                files: [
                    {expand: true, cwd: 'src/', src: ['app/**/*.html'], dest: 'prod_dist/'},
                    {expand: true, cwd: 'src/', src: ['app/resources/**/*'], dest: 'prod_dist/'}
                ]
            },
            dev: {
                files: [
                    {src: ['prod_dist/app/ToDoList.min.js'], dest: 'src/app/ToDoList.min.js', filter:'isFile'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', 'dev');
    grunt.registerTask('prod', ['concat', 'uglify:prod', 'copy:prod']);
    grunt.registerTask('dev', ['concat', 'uglify:dev', 'copy:dev']);
};