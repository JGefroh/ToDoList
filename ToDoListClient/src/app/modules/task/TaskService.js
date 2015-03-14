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
            deleteTask: function(ownerId, taskId) {
                return '../rest/tasks/{taskId}/{ownerId}'
                    .replace('{taskId}', taskId)
                    .replace('{ownerId}', ownerId);
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

        this.saveTask = function(ownerId, task) {
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

        this.deleteTask = function(ownerId, taskId) {
            return $http({
                method: 'DELETE',
                url: endpoints.deleteTask(ownerId, taskId)
            }).then(function(response) {
                return response.data;
            })
        };

        this.getTasks = function(ownerId, completed) {
            return $http.get(endpoints.getTasks(ownerId, completed)).then(function(response) {
                return response.data;
            })
        };

        this.markComplete = function(ownerId, taskId) {
            return $http.put(endpoints.markComplete(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.markIncomplete = function(ownerId, taskId) {
            return $http.put(endpoints.markIncomplete(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.trackTask = function(ownerId, taskId) {
            return $http.put(endpoints.trackTask(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };

        this.untrackTask = function(ownerId, taskId) {
            return $http.put(endpoints.untrackTask(ownerId, taskId)).then(function(response) {
                return response.data;
            });
        };



        /**
         * Updates the total time tracked on the client side only - not the source of truth for total time tracked.
         */
        this.approximateTotalTimeTracked = function(task) {
            if (task.tracking) {
                var fakeTotalTimeTracked = (new Date() - task.timestampTrackingStarted) + task.totalTimeTracked;
                task.timestampTrackingStarted = new Date();
                task.totalTimeTracked = fakeTotalTimeTracked;
            }
        };

        /**
         * Gets a set of tags that are used by the tasks.
         */
        this.getUsedTags = function(tasks) {
            var usedTags = [];
            angular.forEach(tasks, function(task, index) {
                angular.forEach(task.tags, function(tag, index) {
                    if (usedTags.indexOf(tag) === -1) {
                        usedTags.push(tag);
                    }
                });
            });
            return usedTags;
        };

        this.isUnscheduledTask = function(task) {
            return !task.timestampDue;
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .service('TaskService', ['$http', '$q', '$timeout', '$stateParams', 'UserService', TaskService]);
})();