/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('SortableHeader', [])
    .directive('sortableHeader', function() {
        return {
            restrict: 'A',
            scope: {
                columnName: '=',
                currentSortColumn: '=',
                isAscending: '='
            },
            transclude: true,
            templateUrl: "js/directives/templates/SortableHeaderTemplate.html",
            controller: function() {

            }
        }
    });