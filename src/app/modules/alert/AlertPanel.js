/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function AlertDirective(AlertService) {
        function AlertDirectiveCtrl($scope) {
            $scope.alert = AlertService.getAlert();
        }
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'AlertPanel.html',
            controller: ['$scope', AlertDirectiveCtrl]
        }
    }
    angular
        .module('jgefroh.AlertModule')
        .directive('alertPanel', ['AlertService', AlertDirective]);
})();