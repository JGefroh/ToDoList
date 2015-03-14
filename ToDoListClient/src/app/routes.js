(function() {
    function Routes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('splash', {
                url: '/splash/:userID',
                templateUrl: 'modules/splash/Splash.html',
                controller: 'SplashCtrl',
                controllerAs: 'splashCtrl'
            })
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
            .state('calendar', {
                url: '/calendar/:userID',
                templateUrl: 'modules/task/planner/calendar/TaskCalendar.html',
                controller: 'TaskCalendarCtrl',
                controllerAs: 'calendarCtrl'
            })
            .state('planner', {
                url: '/planner',
                templateUrl: 'modules/task/planner/PlannerView.html',
                controller: 'PlannerCtrl',
                controllerAs: 'plannerCtrl'
            })
            .state('planner.calendar', {
                url: '/calendar/:userID',
                templateUrl: 'modules/task/planner/calendar/TaskCalendar.html',
                controller: 'TaskCalendarCtrl',
                controllerAs: 'calendarCtrl'
            })
            .state('statistics', {
                url: '/statistics/:userID',
                templateUrl: 'modules/stats/TaskStatistics.html',
                controller: 'TaskStatisticsCtrl',
                controllerAs: 'statsCtrl'
            });

        $urlRouterProvider.otherwise('/splash/');
    }
    angular
        .module('ToDoList.Routes', [])
        .config(['$stateProvider', '$urlRouterProvider', Routes]);
})();