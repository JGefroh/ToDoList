/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList',
    [
        'ui.router',
        'ui.bootstrap',
        'jgefroh.AlertModule',
        'jgefroh.FiltersModule',
        'jgefroh.WidgetModule',
        'ToDoList.Routes',
        'ToDoList.SecurityModule',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.ViewStateModule',
        'ToDoList.SplashModule',
        'ToDoList.PlannerModule'
    ]);
angular
    .module('ToDoList')
    .constant('applicationName', 'ToDoList')
    .constant('versionNumber', 'v2.1.0');