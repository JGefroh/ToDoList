(function() {
    function MonthSelector() {
        function MonthSelectorController($scope) {
            if (!$scope.viewState.selectedMonthIndex) {
                $scope.viewState.selectedMonthIndex = new Date().getMonth();
            }
            $scope.monthButtons = [
                {id: 0, label: 'Jan', full: 'January'},
                {id: 1, label: 'Feb', full: 'February'},
                {id: 2, label: 'Mar', full: 'March'},
                {id: 3, label: 'Apr', full: 'April'},
                {id: 4, label: 'May', full: 'May'},
                {id: 5, label: 'Jun', full: 'June'},
                {id: 6, label: 'Jul', full: 'July'},
                {id: 7, label: 'Aug', full: 'August'},
                {id: 8, label: 'Sep', full: 'September'},
                {id: 9, label: 'Oct', full: 'October'},
                {id: 10, label: 'Nov', full: 'November'},
                {id: 11, label: 'Dec', full: 'December'}
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
            };

            function initializeAPI() {
                if (!$scope.api) {
                    return;
                }

                $scope.api.getFullMonth = function(monthIndex) {
                    if ((!monthIndex && monthIndex !== 0) || monthIndex < 0 || monthIndex > 11) {
                        return null;
                    }
                    return $scope.monthButtons[monthIndex].full;
                }
            }

            initializeAPI();
        }

        return {
            restrict: 'A',
            scope: {
                viewState: '=',
                api: '='
            },
            templateUrl: 'MonthSelector.html',
            controller: ['$scope', MonthSelectorController]
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .directive("monthSelector", MonthSelector);
})();