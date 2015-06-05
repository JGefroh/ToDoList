/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    var $jQuery = jQuery.noConflict();
    function RemainingTasksCtrl($scope, $timeout, $modal, $sce, ViewState, UserService, $stateParams, TaskService, AlertService, truncateLimit, $filter, $rootScope) {
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
            }
        };

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id, false).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
                updateTags();
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.getUniqueGroups = function() {
            vm.uniqueGroups = {};
            var completedTasks = $filter('filter')(vm.tasks, {complete: false});
            var filteredCompletedTasks = $filter('tagFilter')(completedTasks, vm.viewState.tagsToFilterBy);
            angular.forEach(filteredCompletedTasks, function(task, index) {
                vm.uniqueGroups[task.group] = task.group;
            });
            return vm.uniqueGroups;
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
                console.error("An error occured while adding task.");
            });
        };

        function updateTags() {
            updateUsedTags();
            updateFilterTags();
        }

        function updateUsedTags() {
            vm.usedTags = TaskService.getUsedTags($filter('filter')(vm.tasks, {complete: false}));
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


        vm.trustHTML = function(text) {
            return $sce.trustAsHtml(text);
        };

        vm.removeFilters = function() {
            vm.viewState.tagsToFilterBy = [];
            vm.viewState.filter = '';
        };

        function resetInputFields(taskFields) {
            taskFields.name = null;
        }

        function initialize() {
            UserService.reserveID($stateParams.userID);
            vm.datePickerConfig = {};
            initializeViewState();
            initializeModalWatcher();
            initializeTimeTrackedUpdater();
            initializeTaskEventHandlers();
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.remainingTaskViewState;
            if (!vm.viewState.sortField) {
                vm.viewState.sortField = {value:'timestampCreated', label:'Date Added'};
            }
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

        function initializeTaskEventHandlers() {
            $scope.$on('task.modified', function(event) {
                event.stopPropagation();
                updateTags();
            });
            $scope.$on('task.incompleted', function(event) {
                event.stopPropagation();
                updateTags();
            });
            $scope.$on('task.completed', function(event) {
                event.stopPropagation();
                updateTags();
            })
        }

        initialize();

    }
    angular
        .module('ToDoList.TaskModule')
        .controller('RemainingTasksCtrl', ['$scope', '$timeout', '$modal', '$sce', 'ViewState', 'UserService', '$stateParams',  'TaskService', 'AlertService', 'truncateLimit', '$filter', '$rootScope',  RemainingTasksCtrl]);
})();
