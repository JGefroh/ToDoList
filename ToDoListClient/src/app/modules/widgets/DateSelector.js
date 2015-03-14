(function() {
    function MonthSelector() {
        function MonthSelectorController($scope) {
            if (!$scope.viewState.selectedMonthIndex) {
                $scope.viewState.selectedMonthIndex = new Date().getMonth();
                $scope.viewState.selectedYear = new Date().getUTCFullYear();
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
                if ($scope.viewState.selectedMonthIndex === 0) {
                    $scope.viewState.selectedMonthIndex = 11;
                    $scope.viewState.selectedYear--;
                }
                else {
                    $scope.viewState.selectedMonthIndex--;
                }
                $scope.viewState.selectedDate = $scope.getDate($scope.viewState.selectedYear, $scope.viewState.selectedMonthIndex);
                $scope.onChange();
            };

            $scope.nextMonth = function() {
                if ($scope.viewState.selectedMonthIndex === 11) {
                    $scope.viewState.selectedMonthIndex = 0;
                    $scope.viewState.selectedYear++;
                }
                else {
                    $scope.viewState.selectedMonthIndex++;
                }
                $scope.viewState.selectedDate = $scope.getDate($scope.viewState.selectedYear, $scope.viewState.selectedMonthIndex);
                $scope.onChange();
            };

            $scope.getDate = function(year, month) {
                return new Date(year, month);
            };

            $scope.setMonth = function(monthIndex) {
                $scope.viewState.selectedMonthIndex = monthIndex;
                $scope.viewState.selectedDate = $scope.getDate($scope.viewState.selectedYear, $scope.viewState.selectedMonthIndex);
                $scope.onChange();
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
                };
            }

            initializeAPI();
        }

        return {
            restrict: 'A',
            scope: {
                viewState: '=',
                onChange: '&',
                api: '='
            },
            templateUrl: 'DateSelector.html',
            controller: ['$scope', MonthSelectorController]
        };
    }
    angular
        .module('jgefroh.WidgetModule')
        .directive("dateSelector", MonthSelector);
})();