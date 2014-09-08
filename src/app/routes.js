(function() {
    function Routes($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: '/remaining'
            })
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
            .when("/persistence", {
                templateUrl: 'modules/persistence/Persistence.html',
                controller: 'PersistenceCtrl',
                controllerAs: 'persistenceCtrl'
            })
            .otherwise({
                templateUrl: 'app404.html'
            });
    }
    angular
        .module('ToDoList.Routes', [])
        .config(['$routeProvider', Routes]);
})();