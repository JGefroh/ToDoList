/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function CompletedTasksCtrl(ViewState, TaskService, AlertService, truncateLimit) {
        var vm = this;

        initializeViewState();
        function initializeViewState() {
            vm.viewState = ViewState.completedTaskViewState;
        }

        vm.getTasks = function() {
            return TaskService.getTasks();
        };

        vm.markIncomplete = function(task) {
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
    angular
        .module('ToDoList.TaskModule')
        .controller('CompletedTasksCtrl', ['ViewState', 'TaskService', 'AlertService', 'truncateLimit', CompletedTasksCtrl]);
})();