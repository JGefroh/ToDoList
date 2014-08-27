/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('TaskCreation', [])
    .directive('taskCreation', function() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: "js/directives/templates/TaskCreation.html",
            controller: function() {

            }
        }
    });