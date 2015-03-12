/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TagDisplayDirective() {
        function TagDisplayDirectiveCtrl() {
        }
        return {
            restrict: 'A',
            scope: {
                task: '=',
                tagsToFilterBy: '='
            },
            templateUrl: 'TagDisplay.html',
            controller: [TagDisplayDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('tagDisplay', [TagDisplayDirective]);
})();