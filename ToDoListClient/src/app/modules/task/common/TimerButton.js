(function() {
    function TimerButtonDirective() {
        function TimerButtonDirectiveCtrl(TaskService, UserService) {
            var vm = this;

            function initialize() {
                vm.operations = {
                    trackingUntracking: {}
                };
            }

            vm.startTrackingTask = function (task) {
                task.readOnly = true;
                vm.operations.trackingUntracking.status = 'LOADING';
                TaskService.trackTask(UserService.user.id, task.id).then(function(trackedTask) {
                    vm.operations.trackingUntracking.status = null;
                    angular.copy(trackedTask, task);
                })
                .catch(function(error) {
                    vm.operations.trackingUntracking.status = 'ERROR';
                })
                .finally(function() {
                    task.readOnly = false;
                });
            };

            vm.stopTrackingTask = function (task) {
                task.readOnly = true;
                vm.operations.trackingUntracking.status = 'LOADING';
                TaskService.untrackTask(UserService.user.id, task.id).then(function(untrackedTask) {
                    vm.operations.trackingUntracking.status = null;
                    angular.copy(untrackedTask, task);
                })
                .catch(function(error) {
                    vm.operations.trackingUntracking.status = 'ERROR';
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
                task: '='
            },
            templateUrl: 'TimerButton.html',
            controller: ['TaskService', 'UserService',
                         TimerButtonDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('timerButton', [TimerButtonDirective]);
})();