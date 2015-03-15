/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TagDisplayDirective() {
        function TagDisplayDirectiveCtrl($scope) {
            $scope.toggleTagFilter = function(tag) {
                if ($scope.tagsToFilterBy.indexOf(tag) === -1) {
                    $scope.tagsToFilterBy.push(tag);
                }
                else {
                    $scope.tagsToFilterBy.splice($scope.tagsToFilterBy.indexOf(tag), 1);
                }
            };
        }
        return {
            restrict: 'A',
            scope: {
                tags: '=',
                tagsToFilterBy: '='
            },
            templateUrl: 'TagDisplay.html',
            controller: ['$scope', TagDisplayDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('tagDisplay', [TagDisplayDirective]);
})();