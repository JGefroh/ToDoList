/**
 * Created by Joseph on 8/16/2014.
 */
(function() {
    function TaskService($http, $q, $timeout, $stateParams, UserService) {
        var taskList = [];

        var endpoints = {
            getTasks: function(ownerId, completed) {
                var url = '../rest/tasks?ownerId={ownerId}'.replace('{ownerId}', ownerId);
                if (completed === true || completed === false) {
                    return url + '&completed={completed}'.replace('{completed}', completed);
                }
                else {
                    return url;
                }
            },
            saveTask: function(ownerId) {
                return '../rest/tasks?ownerId={ownerId}'.replace('{ownerId}', ownerId);
            },
            markComplete: function(ownerId, taskId) {
                return '../rest/tasks/{taskId}/{ownerId}/markComplete'
                    .replace('{taskId}', taskId)
                    .replace('{ownerId}', ownerId);
            },
            markIncomplete: function(ownerId, taskId) {
                return '../rest/tasks/{taskId}/{ownerId}/markIncomplete'
                    .replace('{taskId}', taskId)
                    .replace('{ownerId}', ownerId);
            },
            trackTask: function(ownerId, taskId) {
                return '../rest/tasks/{taskId}/{ownerId}/track'
                    .replace('{taskId}', taskId)
                    .replace('{ownerId}', ownerId);
            },
            untrackTask: function(ownerId, taskId) {
                return '../rest/tasks/{taskId}/{ownerId}/untrack'
                    .replace('{taskId}', taskId)
                    .replace('{ownerId}', ownerId);
            }
        };

        this.saveTask = function (ownerId, task) {
            var deferred = $q.defer();
            if (task && isValidInput(task.name, task.group)) {
                return $http.put(endpoints.saveTask(ownerId), task).then(function(response) {
                    return response.data;
                });
            }
            else {
                deferred.reject();
            }
            return deferred.promise;
        };

        function isValidInput(taskName, taskGroup) {
            return taskName || taskGroup;
        }

        this.getTasks = function (ownerId, completed) {
            return $http.get(endpoints.getTasks(ownerId, completed)).then(function(response) {
                return response.data;
            })
        };

        this.markComplete = function (ownerId, taskId) {
            return $http.put(endpoints.markComplete(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.markIncomplete = function (ownerId, taskId) {
            return $http.put(endpoints.markIncomplete(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.trackTask = function (ownerId, taskId) {
            return $http.put(endpoints.trackTask(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.untrackTask = function (ownerId, taskId) {
            return $http.put(endpoints.untrackTask(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .service('TaskService', ['$http', '$q', '$timeout', '$stateParams', 'UserService', TaskService]);
})();