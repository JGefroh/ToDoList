/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskStatisticsCtrl($scope, $timeout, ViewState, StatsService, $stateParams, UserService) {
        var vm = this;
        var TRACKED_TIME_UPDATE_INTERVAL_IN_MS = 60000;
        var isDestroyed = false;

        vm.getStatsByGroup = function () {
            vm.operations.getStatsByGroup.status = 'LOADING';
            StatsService.getStatsByGroup(UserService.user.id).then(function(statsByGroup) {
                vm.operations.getStatsByGroup.status = null;
                vm.statsByGroup = statsByGroup;
            })
            .catch(function(error) {
                vm.operations.getStatsByGroup.status = 'ERROR';
            });
        };

        vm.getStatsByTag = function () {
            vm.operations.getStatsByTag.status = 'LOADING';
            StatsService.getStatsByTag(UserService.user.id).then(function(statsByTag) {
                vm.operations.getStatsByTag.status = null;
                vm.statsByTag = statsByTag;
            })
            .catch(function(error) {
                vm.operations.getStatsByTag.status = 'ERROR';
            });
        };


        function initialize() {
            UserService.reserveID($stateParams.userID);
            vm.operations = {
                getStatsByGroup: {
                    status: null
                },
                getStatsByTag: {
                    status: null
                }
            };

            initializeViewState();
            initializeStatUpdaterSentinel();
            initializeStatUpdater();
            vm.getStatsByGroup();
            vm.getStatsByTag();
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
                    //[JG]: Silently update stats - don't care if it fails.
                    StatsService.getStatsByGroup(UserService.user.id).then(function(statsByGroup) {
                        vm.statsByGroup = statsByGroup;
                    });
                    StatsService.getStatsByTag(UserService.user.id).then(function(statsByTag) {
                        vm.statsByTag = statsByTag;
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