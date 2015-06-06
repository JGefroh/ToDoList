(function() {
    function SubtasksDirective() {
        function SubtasksDirectiveCtrl($scope) {
            var vm = this;

            vm.addSubtask = function() {
                var subtask = {
                    name: null,
                    parentTaskId: $scope.parentTask.id
                };
                $scope.parentTask.subtasks.push(subtask);
                assignOrderTo($scope.parentTask.subtasks);
            };

            vm.removeSubtask = function(subtask) {
                $scope.parentTask.subtasks.splice($scope.parentTask.subtasks.indexOf(subtask), 1);
                assignOrderTo($scope.parentTask.subtasks);
            };

            vm.increaseSubtaskPriority = function(subtask) {
                var currentIndex = $scope.parentTask.subtasks.indexOf(subtask);
                $scope.parentTask.subtasks.splice(currentIndex - 1, 0, $scope.parentTask.subtasks.splice(currentIndex, 1)[0]);
                assignOrderTo($scope.parentTask.subtasks);
            };

            vm.decreaseSubtaskPriority = function(subtask) {
                var currentIndex = $scope.parentTask.subtasks.indexOf(subtask);
                $scope.parentTask.subtasks.splice(currentIndex + 1, 0, $scope.parentTask.subtasks.splice(currentIndex, 1)[0]);
                assignOrderTo($scope.parentTask.subtasks);
            };

            function assignOrderTo(subtasks) {
                angular.forEach(subtasks, function(subtask, index) {
                    subtask.order = index;
                });
            }

            function initialize() {
                if (!$scope.parentTask.subtasks) {
                    $scope.parentTask.subtasks = [];
                }
            }

            initialize();
        }
        return {
            restrict: 'A',
            replace: true,
            scope: {
                parentTask: '=',
                disabled: '=ngDisabled',
                hideButtons: '=?',
                size: '@'
            },
            templateUrl: 'Subtasks.html',
            controller: ['$scope',
                         SubtasksDirectiveCtrl],
            controllerAs: 'subtaskCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('subtasks', [SubtasksDirective]);
})();