(function() {
    function StatsService($timeout, TaskService) {
        var groupStats = [];
        var tasks = TaskService.getTasks();
        var STAT_UPDATE_INTERVAL_IN_MS = 30000;
        startStatisticsUpdateRepeatingTimer();


        function startStatisticsUpdateRepeatingTimer() {
            var statisticsUpdateTimer = $timeout(function () {
                updateStats();
                startStatisticsUpdateRepeatingTimer();
            }, STAT_UPDATE_INTERVAL_IN_MS);
        }

        this.getGroupStats = function() {
            return groupStats;
        };

        this.requestStatUpdate = function() {
            updateStats();
        };

        function updateStats() {
            TaskService.requestUpdateTimeTrackedForAllTasks();
            var uniqueGroups = getUniqueGroupStats();
            groupStats.length = 0;
            for (index = 0; index < tasks.length; index++) {
                var currentTask = tasks[index];
                currentTask.bankTimeTracked();
                var groupStat = uniqueGroups[currentTask.group];
                groupStat.taskCount++;
                groupStat.totalTimeTracked += currentTask.totalTimeTracked;

                if (currentTask.isCompleted) {
                    groupStat.completedCount++;
                }
                else {
                    groupStat.remainingCount++;
                }
            }

            for (var group in uniqueGroups) {
                groupStats.push(uniqueGroups[group]);
            }
        }

        function getUniqueGroupStats() {
            var uniqueGroups = {};
            for (taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
                var group = tasks[taskIndex].group;
                if (!uniqueGroups[group]) {
                    var groupStat = new GroupStat();
                    groupStat.group = group;
                    uniqueGroups[group] = groupStat;
                }
            }
            return uniqueGroups;
        }

        this.getGroupStats = function() {
            return groupStats;
        };
    }
    angular
        .module('ToDoList.StatsModule')
        .service('StatsService', ["$timeout", "TaskService", StatsService]);
})();
