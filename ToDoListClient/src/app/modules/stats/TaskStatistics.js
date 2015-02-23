/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskStatisticsCtrl(ViewState, StatsService, $stateParams, UserService) {
        var vm = this;
        vm.operations = {
            getGroupStats: {
                status: null
            }
        };

        vm.getGroupStats = function () {
            vm.operations.getGroupStats.status = 'LOADING';
            return StatsService.getGroupStats(UserService.user.id).then(function(groupStats) {
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
            vm.getGroupStats();
        }

        function initializeViewState() {
            vm.viewState = ViewState.statisticsViewState;
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('TaskStatisticsCtrl', ['ViewState', 'StatsService', '$stateParams', 'UserService', TaskStatisticsCtrl]);
})();