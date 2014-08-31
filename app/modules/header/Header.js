/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('ToDoList.HeaderModule')
    .directive('header', function(TaskService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/header/Header.html",
            controller: function($scope, versionNumber) {
                $scope.versionNumber = versionNumber;
            }
        }
    });