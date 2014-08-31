/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('ToDoList.TaskModule')
    .directive('taskCreation', function(TaskService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/task/creation/TaskCreation.html",
            controller: function($scope) {
                $scope.addTask = function(taskFields) {
                    TaskService.createTask(taskFields);
                    resetInputFields(taskFields);
                };

                function resetInputFields(taskFields) {
                    taskFields.name = "";
                    taskFields.group = "";
                }
            }
        }
    });