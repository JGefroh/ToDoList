(function() {
    function Routes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('remaining', {
                url: '/remaining/:userID',
                templateUrl: 'modules/task/remaining/RemainingTasks.html',
                controller: 'RemainingTasksCtrl',
                controllerAs: 'remainingCtrl'
            })
            .state('completed', {
                url: '/completed/:userID',
                templateUrl: 'modules/task/completed/CompletedTasks.html',
                controller: 'CompletedTasksCtrl',
                controllerAs: 'completedCtrl'
            })
            .state('statistics', {
                url: '/statistics/:userID',
                templateUrl: 'modules/stats/TaskStatistics.html',
                controller: 'TaskStatisticsCtrl',
                controllerAs: 'statsCtrl'
            });

        $urlRouterProvider.otherwise('/home/newuser');
    }
    angular
        .module('ToDoList.Routes', [])
        .config(['$stateProvider', '$urlRouterProvider', Routes]);
})();