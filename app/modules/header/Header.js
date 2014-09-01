/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function Header() {
        function HeaderDirectiveCtrl($scope, versionNumber) {
            $scope.versionNumber = versionNumber;
        }
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/header/Header.html",
            controller: ['$scope', 'versionNumber', HeaderDirectiveCtrl]
        }
    }
    angular
        .module('ToDoList.HeaderModule')
        .directive('header', Header);
})();