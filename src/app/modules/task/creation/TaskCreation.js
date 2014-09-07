/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskCreation(ViewState, TaskService) {
        function TaskCreationCtrl($scope) {
            var ENTER_KEY_ID = 13;
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

            $scope.addTaskOnEnterKeyPressed = function(taskFields, key) {
                if (key.which === ENTER_KEY_ID) {
                    $scope.addTask(taskFields);
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
            templateUrl: "TaskCreation.html",
            controller: ["$scope", TaskCreationCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('taskCreation', ['ViewState', 'TaskService', TaskCreation]);
})();