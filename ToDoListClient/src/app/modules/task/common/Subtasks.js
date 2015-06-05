(function() {
    function SubtasksDirective() {
        function SubtasksDirectiveCtrl($scope, $filter,
                                     TaskService, UserService, AlertService,
                                     truncateLimit) {
            var vm = this;

            function initialize() {
            }

            initialize();
        }
        return {
            restrict: 'A',
            replace: true,
            scope: {
                tasks: '=',
                disabled: '=ngDisabled',
                hideButtons: '=?',
                size: '@'
            },
            templateUrl: 'Subtasks.html',
            controller: ['$scope', '$filter',
                         'TaskService', 'UserService', 'AlertService',
                         'truncateLimit',
                         SubtasksDirectiveCtrl],
            controllerAs: 'subtaskCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('subtasks', [SubtasksDirective]);
})();