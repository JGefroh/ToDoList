(function() {
    function Routes($routeProvider) {
        $routeProvider
            .when("/remaining", {
                templateUrl: 'modules/task/remaining/RemainingTasks.html',
                controller: 'RemainingTasksCtrl',
                controllerAs: 'remainingCtrl'
            })
            .when("/completed", {
                templateUrl: 'modules/task/completed/CompletedTasks.html',
                controller: 'CompletedTasksCtrl',
                controllerAs: 'completedCtrl'
            })
            .when("/statistics", {
                templateUrl: 'modules/stats/TaskStatistics.html',
                controller: 'TaskStatisticsCtrl',
                controllerAs: 'statsCtrl'
            })
            .otherwise({
                templateUrl: 'app404.html'
            });
    }
    angular
        .module('ToDoList.Routes', [])
        .config(['$routeProvider', Routes]);
})();