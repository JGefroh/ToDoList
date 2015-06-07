/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function MSToHoursFilter() {
        return function (timeToConvertInMS, numberDecimalPositions) {
            var hours = timeToConvertInMS / 60000 / 60;
            return numberDecimalPositions ? hours.toFixed(numberDecimalPositions) : hours;
        };
    }
    function MSToMinutesFilter() {
        return function (timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000)).toFixed(numberDecimalPositions);
        };
    }
    function HoursToMSFilter() {
        return function (timeToConvertInHours) {
            return timeToConvertInHours * 60000 * 60;
        };
    }
    function MinutesToMSFilter() {
        return function (timeToConvertInMinutes) {
            return timeToConvertInMinutes * 60000;
        };
    }
    angular
        .module('jgefroh.FiltersModule')
        .filter('msToHours', MSToHoursFilter)
        .filter('msToMinutes', MSToMinutesFilter)
        .filter('hoursToMS', HoursToMSFilter)
        .filter('minutesToMS', MinutesToMSFilter);
})();