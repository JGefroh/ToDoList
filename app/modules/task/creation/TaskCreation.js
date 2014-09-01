/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskCreation(TaskService) {
        function TaskCreationCtrl($scope) {
            $scope.addTask = function(taskFields) {
                TaskService.createTask(taskFields);
                resetInputFields(taskFields);
            };

            function resetInputFields(taskFields) {
                taskFields.name = "";
                taskFields.group = "";
            }
        }

        return {
            restrict: "A",
            scope: {},
            templateUrl: "modules/task/creation/TaskCreation.html",
            controller: ["$scope", TaskCreationCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('taskCreation', ['TaskService', TaskCreation]);
})();