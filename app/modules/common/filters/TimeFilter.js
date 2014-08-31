/**
 * Created by Joseph on 8/25/2014.
 */
var TimeFilter = angular.module('ToDoList.Filters')
    .filter('msToHours', function() {
        return function(timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000) / 60).toFixed(numberDecimalPositions);
        };
    });