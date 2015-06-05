/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function EditButtonDirective() {
        function EditButtonDirectiveCtrl($scope, $modal) {
            var vm = this;
            vm.showEdit = function(task, layout) {
                var modal = $modal.open(
                    {
                        templateUrl: '../modification/TaskModification.html',
                        controller: 'TaskModificationCtrl',
                        controllerAs: 'modificationCtrl',
                        resolve: {
                            editedTask: function() {
                                return task;
                            },
                            options: function() {
                                return {
                                    layout: layout
                                }
                            }
                        }
                    }
                );
                modal.result.then(function(savedTask) {
                    angular.copy(savedTask, task);
                    $scope.$emit('task.modified');
                });
            }
        }
        return {
            restrict: 'A',
            replace: true,
            scope: {
                task: '=',
                layout: '@',
                iconOnly: '=?',
                size: '@'
            },
            templateUrl: 'EditButton.html',
            controller: ['$scope', '$modal', EditButtonDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('editButton', [EditButtonDirective]);
})();