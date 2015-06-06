/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function EditButtonDirective() {
        function EditButtonDirectiveCtrl($scope, $modal,
                                         TaskService, UserService) {
            var vm = this;
            vm.startEdit = function(task) {
                task.editing = true;
                task.taskCopy = angular.copy(task);
            };

            vm.cancelEdit = function(task) {
                delete task.taskCopy;
                task.editing = false;
            };

            vm.finishEdit = function(task) {
                saveTask(task);
            };

            function saveTask(task) {
                vm.operations.saveChanges.status = 'LOADING';
                task.taskCopy.readOnly = true;
                TaskService.saveTask(UserService.user.id, task.taskCopy).then(function(savedTask) {
                    vm.operations.saveChanges.status = null;
                    angular.copy(savedTask, task);
                    task.editing = false;
                    delete task.taskCopy;
                    $scope.$emit('task.modified');
                })
                .catch(function(error) {
                    vm.operations.saveChanges.status = 'ERROR';
                    console.error('An error occurred while saving a task.');
                });
            }

            vm.nextSize = function(size) {
                if ('btn-xs' === size) {
                    return 'btn-sm';
                }
                if ('btn-sm' === size) {
                    return null;
                }

                if (!size) {
                    return 'btn-lg';
                }
            };

            function initialize() {
                vm.operations = {
                    saveChanges: {}
                }
            }

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
            templateUrl: 'EditButton.html',
            controller: ['$scope', '$modal',
                         'TaskService', 'UserService',
                         EditButtonDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('editButton', [EditButtonDirective]);
})();