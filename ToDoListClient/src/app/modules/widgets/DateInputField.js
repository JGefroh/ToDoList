(function() {
    function DateInputField() {
        function DateInputFieldController($scope) {
            $scope.open = function(event) {
                event.preventDefault();
                event.stopPropagation();

                $scope.isOpen = true;
            };

            $scope.scheduleFor = function(when) {
                if (!when) {
                    $scope.ngModel = null;
                }
                else if ('NOW' === when) {
                    $scope.ngModel = new Date();
                }
                else if ('NOON' === when) {
                    var noon = new Date();
                    noon.setHours(12);
                    noon.setMinutes(0);
                    $scope.ngModel = noon;
                }
                else if ('TOMORROW' === when) {
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    $scope.ngModel = tomorrow;
                }
                else if ('1HOUR' === when) {
                    var hourFromNow = new Date();
                    hourFromNow.setHours(hourFromNow.getHours() + 1);
                    $scope.ngModel = hourFromNow;
                }
                else if ('2DAYS' === when) {
                    var twoDaysFromNow = new Date();
                    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
                    $scope.ngModel = twoDaysFromNow;
                }
                else if ('1WEEK' === when) {
                    var weekFromNow = new Date();
                    weekFromNow.setDate(weekFromNow.getDate() + 7);
                    $scope.ngModel = weekFromNow;
                }

            }
        }

        return {
            restrict: 'A',
            scope: {
                ngModel: '=ngModel',
                config: '=',
                isDisabled: '=',
                inputSizeClass: '@',
                buttonSizeClass: '@'
            },
            templateUrl: 'DateInputField.html',
            controller: ['$scope', DateInputFieldController]
        };
    }
    angular
        .module('jgefroh.WidgetModule')
        .directive('dateInputField', DateInputField);
})();