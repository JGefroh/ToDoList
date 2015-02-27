/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    var $jQuery = jQuery.noConflict();
    function RemainingTasksCtrl($scope, $timeout, ViewState, UserService, $stateParams, TaskService, AlertService, truncateLimit, $filter, $rootScope) {
        var vm = this;
        var ENTER_KEY_ID = 13;
        var TRACKED_TIME_UPDATE_INTERVAL_IN_MS = 30000;
        var isDestroyed = false;

        vm.operations = {
            addTask: {
                status: null
            },
            getTasks: {
                status: null
            },
            editTask: {
                status: null
            },
            markComplete: {
                status: null
            }
        };

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id, false).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.addTask = function(taskFields) {
            vm.operations.addTask.status = 'LOADING';
            TaskService.saveTask(UserService.user.id, taskFields).then(function(task) {
                vm.operations.addTask.status = null;
                vm.tasks.push(task);
                resetInputFields(taskFields);
            })
            .catch(function(error) {
                vm.operations.addTask.status = 'ERROR';
                console.error("An error occured while adding task.");
            });
        };

        vm.markComplete = function (task) {
            task.readOnly = true;
            vm.operations.markComplete.status = 'LOADING';
            TaskService.markComplete(UserService.user.id, task.id).then(function(completedTask) {
                vm.operations.markComplete.status = null;
                angular.copy(completedTask, task);
                if (task.name != null) {
                    AlertService.setAlert('alert-success', 'Task Complete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as complete.', 2000);
                }
                else {
                    AlertService.setAlert('alert-success', 'Task Complete!', 'A task has been marked as complete.', 2000);
                }
            })
            .catch(function() {
                vm.operations.markComplete.status = 'ERROR';
                console.error("An error occurred while completing task.");
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.prepareEditTask = function (task) {
            currentlyEditedTask = task;
            vm.inputCopy = angular.copy(currentlyEditedTask);
        };

        vm.editTask = function (taskFields) {
            vm.operations.editTask.status = 'LOADING';
            TaskService.saveTask(UserService.user.id, taskFields).then(function(savedTask) {
                vm.operations.editTask.status = null;
                angular.copy(savedTask, currentlyEditedTask);
                vm.inputCopy = null;
                currentlyEditedTask = null;
                $jQuery("#editTaskView").modal("hide");
            })
            .catch(function(error) {
                vm.operations.editTask.status = 'ERROR';
                console.error('An error occurred while saving a task.');
            });
        };

        vm.startTrackingTask = function (task) {
            task.readOnly = true;
            TaskService.trackTask(UserService.user.id, task.id).then(function(trackedTask) {
                angular.copy(trackedTask, task);
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.stopTrackingTask = function (task) {
            task.readOnly = true;
            TaskService.untrackTask(UserService.user.id, task.id).then(function(untrackedTask) {
                angular.copy(untrackedTask, task);
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.addTaskOnEnterKeyPressed = function(taskFields, key) {
            if (key.which === ENTER_KEY_ID) {
                vm.addTask(taskFields);
            }
        };

        function resetInputFields(taskFields) {
            taskFields.name = null;
            taskFields.group = null;
        }

        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            initializeModalWatcher();
            initializeTimeTrackedUpdater();
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.remainingTaskViewState;
            vm.viewState.isAscending = false;
            vm.viewState.sortField = {value:'timestampCreated', label:'Date Added'};
        }

        function initializeModalWatcher() {
            var modalWatcherHandler = $rootScope.$on('$locationChangeStart', function(next, current) {
                var modalBackdrop = $jQuery('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.remove();
                }
            });
            $scope.$on('$destroy', function() {
                isDestroyed = true;     //[JG]: Used to signal to the timer not to repeat.
                modalWatcherHandler();  //[JG]: Deregister from root scope to avoid memory leaks.
            });
        }

        function initializeTimeTrackedUpdater() {
            $timeout(function() {
                if (!isDestroyed) {
                    angular.forEach(vm.tasks, function(task) {
                        TaskService.approximateTotalTimeTracked(task);
                    });
                    initializeTimeTrackedUpdater();
                }
            }, TRACKED_TIME_UPDATE_INTERVAL_IN_MS);
        }

        initialize();

    }
    angular
        .module('ToDoList.TaskModule')
        .controller('RemainingTasksCtrl', ['$scope', '$timeout', 'ViewState', 'UserService', '$stateParams',  'TaskService', 'AlertService', 'truncateLimit', '$filter', '$rootScope',  RemainingTasksCtrl]);
})();
