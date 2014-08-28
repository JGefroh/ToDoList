/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('CompletedTasks', [])
    .directive('completedTasks', function() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: "templates/CompletedTasks.html",
            controller: function() {
            }
        }
    });