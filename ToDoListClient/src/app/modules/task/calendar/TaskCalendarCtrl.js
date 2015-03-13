/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    var $jQuery = jQuery.noConflict();
    function TaskCalendarCtrl(ViewState, UserService, $stateParams, TaskService) {
        var vm = this;
        var SATURDAY = 6;
        var SUNDAY = 0;


        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.herp = [];
        vm.getTasksOnDate = function(date) {
            if (date.getUTCDay() % 3 === 0) {
                return vm.tasks;
            }
            return vm.herp;
        };

        vm.loadDatesOfMonth = function(date) {
            if (!date) {
                return;
            }
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth();
            if (!vm.datesOfMonth) {
                vm.datesOfMonth = [];
            }
            vm.datesOfMonth.length = 0;
            var numDaysInMonth = new Date(year, month + 1, 0).getDate();
            for (var day = 0; day < numDaysInMonth; day++) {
                vm.datesOfMonth.push(new Date(year, month, day + 1));
            }
        };

        vm.isWeekend = function(date) {
            return date.getDay() === SATURDAY || date.getDay() === SUNDAY;
        };

        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            initializeVariables();
            vm.loadDatesOfMonth(new Date());
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.calendarViewState;
        }

        function initializeVariables() {
            vm.operations = {
                getTasks: {}
            };

            vm.monthSelectorAPI = {
            };
        }

        initialize();

    }
    angular
        .module('ToDoList.TaskModule')
        .controller('TaskCalendarCtrl', ['ViewState', 'UserService', '$stateParams',  'TaskService',  TaskCalendarCtrl]);
})();
