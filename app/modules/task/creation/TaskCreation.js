/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskCreation(ViewState, TaskService) {
        function TaskCreationCtrl($scope) {
            initializeViewState();
            function initializeViewState() {
                $scope.viewState = ViewState.taskCreationViewState;
            }

            $scope.addTask = function(taskFields) {
                if (taskFields) {
                    TaskService.createTask(taskFields);
                    resetInputFields(taskFields);
                }
            };

            function resetInputFields(taskFields) {
                taskFields.name = null;
                taskFields.group = null;
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
        .directive('taskCreation', ['ViewState', 'TaskService', TaskCreation]);
})();