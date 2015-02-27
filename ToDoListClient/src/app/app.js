/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList',
    [
        'ui.router',
        'jgefroh.AlertModule',
        'jgefroh.FiltersModule',
        'ToDoList.Routes',
        'ToDoList.SecurityModule',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.ViewStateModule',
        'ToDoList.SplashModule'
    ]);
angular
    .module('ToDoList')
    .constant('applicationName', 'ToDoList')
    .constant('versionNumber', 'v2.0.3');