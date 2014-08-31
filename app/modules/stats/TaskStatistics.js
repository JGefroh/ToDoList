/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('ToDoList.StatsModule')
    .directive('taskStatistics', function(StatsService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/stats/TaskStatistics.html",
            controller: function($scope) {
                $scope.getGroupStats = function() {
                    return StatsService.getGroupStats();
                }
            }
        }
    });