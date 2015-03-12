/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function CompletedTasksCtrl(ViewState, TaskService, AlertService, truncateLimit, $filter, $stateParams, UserService) {
        var vm = this;
        vm.operations = {
            getTasks: {
                status: null
            },
            markIncomplete: {
                tasks: {},
                status: null
            },
            deleteTask: {
                tasks: {},
                status: null
            }
        };

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasks(UserService.user.id, true).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
                updateTags();
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.deleteTask = function(task) {
            task.readOnly = true;
            vm.operations.deleteTask.tasks[task.id] = {
                status: 'LOADING'
            };
            TaskService.deleteTask(UserService.user.id, task.id).then(function() {
                delete vm.operations.deleteTask.tasks[task.id];
                if (task.name != null) {
                    AlertService.setAlert('alert-danger', 'Task Deleted!', $filter('limitTo')(task.name, truncateLimit) + ' has been deleted.', 2000);
                }
                else {
                    AlertService.setAlert('alert-danger', 'Task Deleted!', 'A task has been marked deleted.', 2000);
                }
                var index = vm.tasks.indexOf(task);
                vm.tasks.splice(index, 1);
                updateTags();
            })
            .catch(function() {
                vm.operations.deleteTask.tasks[task.id].status = 'ERROR';
                console.error("An error occurred while deleting this task.");
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
                if (task.name != null) {
                    AlertService.setAlert('alert-warning', 'Task Incomplete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as incomplete.', 2000);
                }
                else {
                    AlertService.setAlert('alert-warning', 'Task Incomplete!', 'A task has been marked as incomplete.', 2000);
                }
                updateTags();
            })
            .catch(function() {
                vm.operations.markIncomplete.tasks[task.id].status = 'ERROR';
                console.error("An error occurred while marking task as incomplete.");
            })
            .finally(function() {
                task.readOnly = false;
            });
        };

        vm.toggleTagFilter = function(tag) {
            if (vm.viewState.tagsToFilterBy.indexOf(tag) === -1) {
                vm.viewState.tagsToFilterBy.push(tag);
            }
            else {
                vm.viewState.tagsToFilterBy.splice(vm.viewState.tagsToFilterBy.indexOf(tag), 1);
            }
        };

        function updateTags() {
            updateUsedTags();
            updateFilterTags();
        }

        function updateUsedTags() {
            vm.usedTags = TaskService.getUsedTags($filter('filter')(vm.tasks, {complete: true}));
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
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.completedTaskViewState;
            if (!vm.viewState.sortField) {
                vm.viewState.sortField = {value:'timestampCompleted', label:'Date Completed'};
            }
        }

        initialize();
    }
    angular
        .module('ToDoList.TaskModule')
        .controller('CompletedTasksCtrl', ['ViewState', 'TaskService', 'AlertService', 'truncateLimit', '$filter', '$stateParams', 'UserService', CompletedTasksCtrl]);
})();