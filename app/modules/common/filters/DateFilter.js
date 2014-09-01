/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function MilHourTimeFilter() {
        return function(dateToConvert) {
            return dateToConvert.getHours() + ":" + (dateToConvert.getMinutes() < 10 ? "0" + dateToConvert.getMinutes(): dateToConvert.getMinutes());
        }
    }

    angular
        .module('ToDoList.Filters')
        .filter('MilHourTime', MilHourTimeFilter);
})();