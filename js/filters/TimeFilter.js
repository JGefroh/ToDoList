/**
 * Created by Joseph on 8/25/2014.
 */
var DateFilter = angular.module('TimeFilter', [])
    .filter('msToHours', function() {
        return function(timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000) / 60).toFixed(numberDecimalPositions);
        };
    });