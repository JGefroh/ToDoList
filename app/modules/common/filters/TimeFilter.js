/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function MSToHoursFilter() {
        return function (timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000) / 60).toFixed(numberDecimalPositions);
        };
    }
    function MSToMinutesFilter() {
        return function (timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000)).toFixed(numberDecimalPositions);
        };
    }
    angular
        .module('ToDoList.Filters')
        .filter('msToHours', MSToHoursFilter)
        .filter('msToMinutes', MSToMinutesFilter)
})();