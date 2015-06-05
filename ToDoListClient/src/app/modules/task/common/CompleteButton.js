(function() {
    function CompleteButtonDirective() {
        function CompleteButtonDirectiveCtrl($scope, $filter,
                                             TaskService, UserService, AlertService,
                                             truncateLimit) {
            var vm = this;

            function initialize() {
                vm.operations = {
                    markComplete: {},
                    markIncomplete: {}
                };
            }

            vm.markComplete = function (task) {
                task.readOnly = true;
                vm.operations.markComplete.status = 'LOADING';
                TaskService.markComplete(UserService.user.id, task.id).then(function(completedTask) {
                    vm.operations.markComplete.status = null;
                    angular.copy(completedTask, task);
                    if (task.name != null) {
                        AlertService.setAlert('alert-success', 'Task Complete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as complete.', 2000);
                    }
                    else {
                        AlertService.setAlert('alert-success', 'Task Complete!', 'A task has been marked as complete.', 2000);
                    }
                    $scope.$emit('task.completed');
                })
                .catch(function() {
                    vm.operations.markComplete.status = 'ERROR';
                    console.error("An error occurred while completing task.");
                })
                .finally(function() {
                    task.readOnly = false;
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
                    $scope.$emit('task.incompleted');
                })
                .catch(function() {
                    vm.operations.markIncomplete.tasks[task.id].status = 'ERROR';
                    console.error("An error occurred while marking task as incomplete.");
                })
                .finally(function() {
                    task.readOnly = false;
                });
            };

            initialize();
        }
        return {
            restrict: 'A',
            replace: true,
            scope: {
                task: '=',
                iconOnly: '=?'
            },
            templateUrl: 'CompleteButton.html',
            controller: ['$scope', '$filter',
                         'TaskService', 'UserService', 'AlertService',
                         'truncateLimit',
                         CompleteButtonDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('completeButton', [CompleteButtonDirective]);
})();