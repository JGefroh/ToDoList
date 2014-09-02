/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskStatisticsDirective(ViewState, StatsService) {
        function TaskStatisticsDirectiveCtrl($scope) {
            initializeViewState();

            function initializeViewState() {
                $scope.viewState = ViewState.statisticsViewState;
            }

            $scope.getGroupStats = function () {
                return StatsService.getGroupStats();
            }
        }

        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/stats/TaskStatistics.html",
            controller: ['$scope', TaskStatisticsDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.StatsModule')
        .directive('taskStatistics', ['ViewState', 'StatsService', TaskStatisticsDirective]);
})();