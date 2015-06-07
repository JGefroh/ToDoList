/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function CompletedTasksCtrl($scope, ViewState, TaskService, AlertService, truncateLimit, $filter, $stateParams, UserService) {
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

        vm.getUniqueGroups = function() {
            vm.uniqueGroups = {};
            var completedTasks = $filter('filter')(vm.tasks, {complete: true});
            var filteredCompletedTasks = $filter('tagFilter')(completedTasks, vm.viewState.tagsToFilterBy);
            angular.forEach(filteredCompletedTasks, function(task, index) {
                vm.uniqueGroups[task.group] = task.group;
            });
            return vm.uniqueGroups;
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
            initializeTaskEventHandlers();
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.completedTaskViewState;
            if (!vm.viewState.sortField) {
                vm.viewState.sortField = {value:'timestampCompleted', label:'Date Completed'};
            }
        }

        function initializeTaskEventHandlers() {
            $scope.$on('task.deleted', function(event, task) {
                event.stopPropagation();
                var index = vm.tasks.indexOf(task);
                vm.tasks.splice(index, 1);
                updateTags();
            });
            $scope.$on('task.incompleted', function(event) {
                event.stopPropagation();
                updateTags();
            });
        }

        initialize();
    }
    angular
        .module('ToDoList.TaskModule')
        .controller('CompletedTasksCtrl', ['$scope', 'ViewState', 'TaskService', 'AlertService', 'truncateLimit', '$filter', '$stateParams', 'UserService', CompletedTasksCtrl]);
})();