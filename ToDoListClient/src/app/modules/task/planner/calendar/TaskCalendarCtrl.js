/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TaskCalendarCtrl(ViewState, UserService, $stateParams, $modal, TaskService, AlertService, $filter, truncateLimit) {
        var vm = this;
        var SATURDAY = 6;
        var SUNDAY = 0;

        vm.isUnscheduledTask = TaskService.isUnscheduledTask;

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

        vm.getTasksOnDate = function(date) {
            var tasksOnDate = [];
            angular.forEach(vm.tasks, function(task, index) {
                if (task.timestampDue) {
                    var taskDate = new Date(task.timestampDue);
                    if (date.getUTCDate() === taskDate.getUTCDate()
                        && date.getUTCFullYear() === taskDate.getUTCFullYear()
                        && date.getUTCMonth() === taskDate.getUTCMonth()) {
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

        vm.markComplete = function (task) {
            task.readOnly = true;
            vm.operations.markComplete.tasks[task.id] = {
                status: 'LOADING'
            };
            TaskService.markComplete(UserService.user.id, task.id).then(function(completedTask) {
                delete vm.operations.markComplete.tasks[task.id];
                angular.copy(completedTask, task);
            })
            .catch(function() {
                vm.operations.markComplete.tasks[task.id].status = 'ERROR';
                console.error("An error occurred while completing task.");
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.markIncomplete = function(task) {
            task.readOnly = true;
            vm.operations.markIncomplete.tasks[task.id] = {
                status: 'LOADING'
            };
            TaskService.markIncomplete(UserService.user.id, task.id).then(function(incompleteTask) {
                delete vm.operations.markIncomplete.tasks[task.id];
                angular.copy(incompleteTask, task);
            })
            .catch(function() {
                vm.operations.markIncomplete.tasks[task.id].status = 'ERROR';
                console.error("An error occurred while marking task as incomplete.");
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.showEditTask = function(task) {
            var modal = $modal.open(
                {
                    templateUrl: '../../modification/TaskModification.html',
                    controller: 'TaskModificationCtrl',
                    controllerAs: 'modificationCtrl',
                    resolve: {
                        editedTask: function() {
                            return task;
                        }
                    }
                }
            );
            modal.result.then(function(savedTask) {
                if (savedTask.timestampDue && !task.timestampDue) {
                    AlertService.setAlert('alert-info', 'Task Scheduled!', $filter('limitTo')(task.name || 'A task', truncateLimit) + ' has been scheduled.', 2000);
                }
                else if (!savedTask.timestampDue) {
                    AlertService.setAlert('alert-info', 'Task Unscheduled!', $filter('limitTo')(task.name || 'A task', truncateLimit) + ' has been unscheduled.', 2000);
                }
                angular.copy(savedTask, task);
            });
        };


        vm.isToday = function(date) {
            var today = new Date();
            return today.getDate() === date.getDate()
                && today.getMonth() === date.getMonth()
                && today.getFullYear() === date.getFullYear();
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
                getTasks: {},
                markComplete: {
                    tasks: {},
                    status: null
                },
                markIncomplete: {
                    tasks: {},
                    status: null
                }
            };

            vm.monthSelectorAPI = {
            };
        }

        initialize();

    }
    angular
        .module('ToDoList.PlannerModule')
        .controller('TaskCalendarCtrl', ['ViewState', 'UserService', '$stateParams', '$modal', 'TaskService', 'AlertService', '$filter', 'truncateLimit', TaskCalendarCtrl]);
})();
