(function() {
    function RemainingTasksCardDirective() {
        function RemainingTasksCardDirectiveCtrl() {
        }
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'RemainingTasksCard.html',
            controller: [RemainingTasksCardDirectiveCtrl],
            controllerAs: 'buttonCtrl'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('remainingTasksCard', [RemainingTasksCardDirective]);
})();