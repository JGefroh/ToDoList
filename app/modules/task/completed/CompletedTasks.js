/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function CompletedTasksDirective(ViewState, TaskService, AlertService, truncateLimit) {
        function CompletedTasksDirectiveCtrl($scope) {
            initializeViewState();

            function initializeViewState() {
                $scope.viewState = ViewState.completedTaskViewState;
            }

            $scope.getTasks = function() {
                return TaskService.getTasks();
            };

            $scope.markIncomplete = function(task) {
                TaskService.markTaskIncomplete(task);
                if (task.name != null) {
                    if (task.name.length > truncateLimit) {
                        AlertService.setAlert('alert-warning', 'Task Incomplete!', task.name.substr(0, truncateLimit) + '... has been marked as incomplete.', 2000);
                    }
                    else if (task.name.length <= truncateLimit) {
                        AlertService.setAlert('alert-warning', 'Task Incomplete!', task.name + ' has been marked as incomplete.', 2000);
                    }
                }
                else {
                    AlertService.setAlert('alert-warning', 'Task Incomplete!', 'A task has been marked as incomplete.', 2000);
                }
            };
        }
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/task/completed/CompletedTasks.html",
            controller: ["$scope", CompletedTasksDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('completedTasks', ['ViewState', 'TaskService', 'AlertService', 'truncateLimit', CompletedTasksDirective]);
})();