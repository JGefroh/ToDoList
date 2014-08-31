/**
 * Created by Joseph on 8/25/2014.
 */
var DateFilter = angular.module('ToDoList.Filters')
    .filter('MilHourTime', function() {
        return function(dateToConvert) {
            var formatted = dateToConvert.getHours() + ":" + (dateToConvert.getMinutes() < 10 ? "0" + dateToConvert.getMinutes(): dateToConvert.getMinutes());
            return formatted;
        };
    });