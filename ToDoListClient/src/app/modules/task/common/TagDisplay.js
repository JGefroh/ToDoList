/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TagDisplayDirective() {
        function TagDisplayDirectiveCtrl($scope) {
        }
        return {
            restrict: 'A',
            scope: {
                tags: '=',
                tagsToFilterBy: '=',
                toggleTagFilter: '&'
            },
            templateUrl: 'TagDisplay.html',
            controller: ['$scope', TagDisplayDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('tagDisplay', [TagDisplayDirective]);
})();