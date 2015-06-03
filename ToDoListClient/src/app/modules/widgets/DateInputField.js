(function() {
    function DateInputField() {
        function DateInputFieldController($scope) {
            $scope.open = function(event) {
                event.preventDefault();
                event.stopPropagation();

                $scope.isOpen = true;
            }
        }

        return {
            restrict: 'A',
            scope: {
                model: '=',
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