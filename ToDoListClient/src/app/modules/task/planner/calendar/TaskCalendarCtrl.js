/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskCalendarCtrl($scope, ViewState, UserService, $stateParams, $modal, TaskService, AlertService, $filter, truncateLimit) {
        var vm = this;
        var ENTER_KEY_ID = 13;
        var SATURDAY = 6;
        var SUNDAY = 0;

        vm.isUnscheduledTask = TaskService.isUnscheduledTask;

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
                updateTags();
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.getTasksOnDate = function(date) {
            var tasksOnDate = [];
            angular.forEach(vm.tasks, function(task, index) {
                if (task.timestampDue) {
                    var taskDate = new Date(task.timestampDue);
                    if (date.getDate() === taskDate.getDate()
                        && date.getYear() === taskDate.getYear()
                        && date.getMonth() === taskDate.getMonth()) {
                        tasksOnDate.push(task);
                    }
                }
            });
            return tasksOnDate;
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

        vm.addTaskOnEnterKeyPressed = function(taskFields, key) {
            if (key.which === ENTER_KEY_ID) {
                vm.addTask(taskFields);
            }
        };

        vm.addTask = function(taskFields) {
            vm.operations.addTask.status = 'LOADING';
            taskFields.tags = angular.copy(vm.viewState.tagsToFilterBy);
            TaskService.saveTask(UserService.user.id, taskFields).then(function(task) {
                vm.operations.addTask.status = null;
                vm.tasks.push(task);
                resetInputFields(taskFields);
                if (task.name != null) {
                    AlertService.setAlert('alert-info', 'Task Added!', $filter('limitTo')(task.name, truncateLimit) + ' has been added.', 2000);
                }
                else {
                    AlertService.setAlert('alert-info', 'Task Added!', 'A task has been added to your list.', 2000);
                }
            })
            .catch(function(error) {
                vm.operations.addTask.status = 'ERROR';
                console.error("An error occurred while adding task.");
            });
        };

        function resetInputFields(taskFields) {
            taskFields.name = null;
        }


        vm.isToday = function(date) {
            var today = new Date();
            return today.getDate() === date.getDate()
                && today.getMonth() === date.getMonth()
                && today.getFullYear() === date.getFullYear();
        };

        function updateTags() {
            updateUsedTags();
            updateFilterTags();
        }

        function updateUsedTags() {
            vm.usedTags = TaskService.getUsedTags(vm.tasks);
        }

        function updateFilterTags() {
            var tagsToKeep = [];
            angular.forEach(vm.viewState.tagsToFilterBy, function(filterTag, index) {
                if (vm.usedTags.indexOf(filterTag) !== -1) {
                    tagsToKeep.push(filterTag);
                }
            });
            vm.viewState.tagsToFilterBy = tagsToKeep;
        }

        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            initializeVariables();
            initializeTaskEventHandlers();
            vm.loadDatesOfMonth(new Date());
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.calendarViewState;
        }

        function initializeVariables() {
            vm.operations = {
                addTask: {},
                getTasks: {}
            };

            vm.monthSelectorAPI = {
            };
        }

        function initializeTaskEventHandlers() {
            $scope.$on('task.deleted', function(event, task) {
                event.stopPropagation();
                var index = vm.tasks.indexOf(task);
                vm.tasks.splice(index, 1);
                updateTags();
            });
            $scope.$on('task.modified', function(event) {
                event.stopPropagation();
                updateTags();
            });
        }

        initialize();

    }
    angular
        .module('ToDoList.PlannerModule')
        .controller('TaskCalendarCtrl', ['$scope', 'ViewState', 'UserService', '$stateParams', '$modal', 'TaskService', 'AlertService', '$filter', 'truncateLimit', TaskCalendarCtrl]);
})();
