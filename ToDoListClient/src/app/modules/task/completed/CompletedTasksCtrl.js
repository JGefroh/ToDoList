/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function CompletedTasksCtrl(ViewState, TaskService, AlertService, truncateLimit, $filter, $stateParams, UserService) {
        var vm = this;
        vm.operations = {
            getTasks: {
                status: null
            },
            markIncomplete: {
                status: null
            }
        };

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id, true).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.markIncomplete = function(task) {
            task.readOnly = true;
            vm.operations.markIncomplete.status = 'LOADING';
            TaskService.markIncomplete(UserService.user.id, task.id).then(function(incompleteTask) {
                vm.operations.markIncomplete.status = null;
                angular.copy(incompleteTask, task);
                if (task.name != null) {
                    AlertService.setAlert('alert-warning', 'Task Incomplete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as incomplete.', 2000);
                }
                else {
                    AlertService.setAlert('alert-warning', 'Task Incomplete!', 'A task has been marked as incomplete.', 2000);
                }
            })
            .catch(function() {
                vm.operations.markIncomplete.status = 'ERROR';
                console.error("An error occurred while marking task as incomplete.");
            })
            .finally(function() {
                task.readOnly = false;
            });
        };
        
        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.completedTaskViewState;
        }

        initialize();
    }
    angular
        .module('ToDoList.TaskModule')
        .controller('CompletedTasksCtrl', ['ViewState', 'TaskService', 'AlertService', 'truncateLimit', '$filter', '$stateParams', 'UserService', CompletedTasksCtrl]);
})();