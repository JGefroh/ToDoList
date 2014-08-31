/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('ToDoList.AlertModule')
    .directive('alertPanel', function(AlertService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/alert/AlertPanel.html",
            controller: function($scope) {
                $scope.alert = AlertService.getAlert();
            }
        }
    });