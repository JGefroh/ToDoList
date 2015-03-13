(function() {
    function MonthSelector() {
        function MonthSelectorController($scope) {
            if (!$scope.viewState.selectedMonthIndex) {
                $scope.viewState.selectedMonthIndex = new Date().getMonth();
            }
            $scope.monthButtons = [
                {id: 0, label: 'Jan'},
                {id: 1, label: 'Feb'},
                {id: 2, label: 'Mar'},
                {id: 3, label: 'Apr'},
                {id: 4, label: 'May'},
                {id: 5, label: 'Jun'},
                {id: 6, label: 'Jul'},
                {id: 7, label: 'Aug'},
                {id: 8, label: 'Sep'},
                {id: 9, label: 'Oct'},
                {id: 10, label: 'Nov'},
                {id: 11, label: 'Dec'}
            ];

            $scope.previousMonth = function() {
                $scope.viewState.selectedMonthIndex = $scope.viewState.selectedMonthIndex - 1;
            };

            $scope.nextMonth = function() {
                $scope.viewState.selectedMonthIndex = $scope.viewState.selectedMonthIndex + 1;
            };

            $scope.getDate = function(month, year) {
                return new Date(year, month);
            };

            $scope.setMonth = function(monthIndex) {
                $scope.viewState.selectedMonthIndex = monthIndex;
            }
        }

        return {
            restrict: 'A',
            scope: {
                viewState: '='
            },
            templateUrl: 'MonthSelector.html',
            controller: ['$scope', MonthSelectorController]
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .directive("monthSelector", MonthSelector);
})();