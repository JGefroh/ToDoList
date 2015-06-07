/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function DeleteButtonDirective() {
        function DeleteButtonDirectiveCtrl($scope, $filter,
                                           TaskService, UserService, AlertService,
                                           truncateLimit) {
            var vm = this;

            function initialize() {
                vm.operations = {
                    deleteTask: {}
                };
            }

            vm.deleteTask = function(task) {
                task.readOnly = true;
                vm.operations.deleteTask.status = 'LOADING';
                TaskService.deleteTask(UserService.user.id, task.id).then(function() {
                    vm.operations.deleteTask.status = null;
                    if (task.name != null) {
                        AlertService.setAlert('alert-danger', 'Task Deleted!', $filter('limitTo')(task.name, truncateLimit) + ' has been deleted.', 2000);
                    }
                    else {
                        AlertService.setAlert('alert-danger', 'Task Deleted!', 'A task has been marked deleted.', 2000);
                    }
                    $scope.$emit('task.deleted', task);
                })
                .catch(function() {
                    vm.operations.deleteTask.status = 'ERROR';
                    console.error("An error occurred while deleting this task.");
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
                layout: '@',
                iconOnly: '=?',
                size: '@',
                disabled: '=ngDisabled'
            },
            templateUrl: 'DeleteButton.html',
            controller: ['$scope', '$filter',
                         'TaskService', 'UserService', 'AlertService',
                         'truncateLimit', DeleteButtonDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('deleteButton', [DeleteButtonDirective]);
})();