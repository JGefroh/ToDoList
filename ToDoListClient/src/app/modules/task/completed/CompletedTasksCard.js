(function() {
    function CompletedTasksCardDirective() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'CompletedTasksCard.html'
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('completedTasksCard', [CompletedTasksCardDirective]);
})();