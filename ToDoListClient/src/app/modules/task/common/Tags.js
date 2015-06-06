/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TagsDirective() {
        function TagsDirectiveCtrl($scope, $filter) {
            $scope.toggleTagFilter = function(tag) {
                if ($scope.tagsToFilterBy.indexOf(tag) === -1) {
                    $scope.tagsToFilterBy.push(tag);
                }
                else {
                    $scope.tagsToFilterBy.splice($scope.tagsToFilterBy.indexOf(tag), 1);
                }
            };

            $scope.addTag = function() {
                $scope.task.tags.push(null);
            };

            $scope.removeTag = function(tag) {
                $scope.task.tags.splice($scope.task.tags.indexOf(tag), 1);
            };

            function initialize() {
                if (!$scope.task.tags) {
                    $scope.task.tags = [];
                }
                $scope.task.tags = $filter('orderBy')($scope.task.tags, 'toString()');
            }

            initialize();
        }
        return {
            restrict: 'A',
            scope: {
                tagsToFilterBy: '=',
                task: '=?'
            },
            templateUrl: 'Tags.html',
            controller: ['$scope', '$filter', TagsDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.TaskModule')
        .directive('tags', [TagsDirective]);
})();