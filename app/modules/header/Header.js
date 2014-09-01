/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function Header() {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/header/Header.html",
            controller: function ($scope, versionNumber) {
                $scope.versionNumber = versionNumber;
            }
        }
    }
    angular
        .module('ToDoList.HeaderModule')
        .directive('header', Header);
})();