/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TimeFilter() {
        return function (timeToConvertInMS, numberDecimalPositions) {
            return ((timeToConvertInMS / 60000) / 60).toFixed(numberDecimalPositions);
        };
    }
    angular
        .module('ToDoList.Filters')
        .filter('msToHours', TimeFilter);
})();