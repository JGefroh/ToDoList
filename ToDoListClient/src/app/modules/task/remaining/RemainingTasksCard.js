(function() {
    function RemainingTasksCardDirective() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'RemainingTasksCard.html'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('remainingTasksCard', [RemainingTasksCardDirective]);
})();