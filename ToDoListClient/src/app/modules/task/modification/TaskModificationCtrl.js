(function() {
    function TaskModificationCtrl($scope, $modalInstance, UserService, TaskService, editedTask, options) {
        var ENTER_KEY_ID = 13;
        $scope.saveTask = function (taskFields) {
            console.info(taskFields);
            $scope.addTag($scope.form.tag);
            $scope.operations.editTask.status = 'LOADING';
            TaskService.saveTask(UserService.user.id, taskFields).then(function(savedTask) {
                $scope.operations.editTask.status = null;
                $modalInstance.close(savedTask);
                $scope.inputCopy = null;
            })
            .catch(function(error) {
                $scope.operations.editTask.status = 'ERROR';
                console.error('An error occurred while saving a task.');
            });
        };

        $scope.addTagOnEnterKeyPressed = function(tag, key) {
            if (key.which === ENTER_KEY_ID) {
                $scope.addTag(tag);
            }
        };

        $scope.addTag = function(tag) {
            if (!$scope.inputCopy.tags) {
                $scope.inputCopy.tags = [];
            }

            if (tag && $scope.inputCopy.tags.indexOf(tag) === -1) {
                $scope.inputCopy.tags.push(tag);
            }

            $scope.form.tag = null;
        };

        $scope.removeTag = function(tag) {
            $scope.inputCopy.tags.splice($scope.inputCopy.tags.indexOf(tag), 1);
        };

        $scope.addSubtaskOnEnterKeyPressed = function(subtask, key) {
            if (key.which === ENTER_KEY_ID) {
                $scope.addSubtask(subtask);
            }
        };

        $scope.addSubtask = function(subtaskName) {
            if (!$scope.inputCopy.subtasks) {
                $scope.inputCopy.subtasks = [];
            }
            var subtask = {
                name: subtaskName,
                parentTaskId: $scope.inputCopy.id
            };

            if (!subtask.name) {
                return;
            }
            $scope.inputCopy.subtasks.push(subtask);
            $scope.form.subtaskName = null;
        };

        $scope.removeSubtask = function(subtask) {
            $scope.inputCopy.subtasks.splice($scope.inputCopy.subtasks.indexOf(subtask), 1);
        };

        $scope.increaseSubtaskPriority = function(subtask) {
            var currentIndex = $scope.inputCopy.subtasks.indexOf(subtask);
            $scope.inputCopy.subtasks.splice(currentIndex - 1, 0, $scope.inputCopy.subtasks.splice(currentIndex, 1)[0]);
        };

        $scope.decreaseSubtaskPriority = function(subtask) {
            var currentIndex = $scope.inputCopy.subtasks.indexOf(subtask);
            $scope.inputCopy.subtasks.splice(currentIndex + 1, 0, $scope.inputCopy.subtasks.splice(currentIndex, 1)[0]);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


        function initialize() {
            $scope.form = {};
            $scope.options = options;
            $scope.operations = {
                editTask: {}
            };
            $scope.inputCopy = angular.copy(editedTask);
        }

        initialize();
    }
    angular
        .module('ToDoList.TaskModule')
        .controller('TaskModificationCtrl', ['$scope', '$modalInstance', 'UserService', 'TaskService', 'editedTask', 'options', TaskModificationCtrl]);
})();
