/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskStatisticsCtrl($scope, $timeout, ViewState, StatsService, $stateParams, UserService) {
        var vm = this;
        var TRACKED_TIME_UPDATE_INTERVAL_IN_MS = 60000;
        var isDestroyed = false;
        vm.operations = {
            getGroupStats: {
                status: null
            }
        };

        vm.getGroupStats = function () {
            vm.operations.getGroupStats.status = 'LOADING';
            StatsService.getGroupStats(UserService.user.id).then(function(groupStats) {
                vm.operations.getGroupStats.status = null;
                vm.groupStats = groupStats;
            })
            .catch(function(error) {
                vm.operations.getGroupStats.status = 'ERROR';
            });
        };

        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            initializeStatUpdaterSentinel();
            initializeStatUpdater();
            vm.getGroupStats();
        }

        function initializeViewState() {
            vm.viewState = ViewState.statisticsViewState;
        }

        function initializeStatUpdaterSentinel() {
            $scope.$on('$destroy', function() {
                isDestroyed = true;     //[JG]: Used to signal to the timer not to repeat.
            });
        }
        function initializeStatUpdater() {
            $timeout(function() {
                if (!isDestroyed) {
                    StatsService.getGroupStats(UserService.user.id).then(function(groupStats) {
                        vm.groupStats = groupStats; //[JG]: Silently update stats - don't care if it fails.
                    });
                    initializeStatUpdater();
                }
            }, TRACKED_TIME_UPDATE_INTERVAL_IN_MS);
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('TaskStatisticsCtrl', ['$scope', '$timeout', 'ViewState', 'StatsService', '$stateParams', 'UserService', TaskStatisticsCtrl]);
})();