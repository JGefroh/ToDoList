/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('AlertPanel', [])
    .directive('alertPanel', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                subject: "=",
                message: "=",
                type: "=",
                isShowing: "="
            },
            templateUrl: "templates/AlertPanel.html",
            link: function(scope, element, attrs) {
            }
        }
    });