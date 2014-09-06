/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function Header() {
        function HeaderDirectiveCtrl($scope, versionNumber, applicationName) {
            $scope.versionNumber = versionNumber;
            $scope.applicationName = applicationName;
        }
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/header/Header.html",
            controller: ['$scope', 'versionNumber', 'applicationName', HeaderDirectiveCtrl]
        }
    }
    angular
        .module('jgefroh.HeaderModule', [])
        .directive('header', Header);
})();