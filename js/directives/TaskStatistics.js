/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('TaskStatistics', [])
    .directive('taskStatistics', function() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: "js/directives/templates/TaskStatistics.html",
            controller: function() {
            }
        }
    });