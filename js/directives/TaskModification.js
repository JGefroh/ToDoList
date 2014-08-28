/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('TaskModification', [])
    .directive('taskModification', function() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: "templates/TaskModification.html",
            controller: function() {
            }
        }
    });