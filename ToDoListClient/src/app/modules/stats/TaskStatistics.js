/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskStatisticsCtrl(ViewState, StatsService, $stateParams, UserService) {
        var vm = this;
        UserService.reserveID($stateParams.userID);
        initializeViewState();
        StatsService.requestStatUpdate();

        function initializeViewState() {
            vm.viewState = ViewState.statisticsViewState;
        }

        vm.getGroupStats = function () {
            return StatsService.getGroupStats();
        }
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('TaskStatisticsCtrl', ['ViewState', 'StatsService', '$stateParams', 'UserService', TaskStatisticsCtrl]);
})();