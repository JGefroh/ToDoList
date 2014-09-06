/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList.Filters', []);
angular
    .module('ToDoList.StatsModule', []);
angular
    .module('ToDoList.NavigationModule', []);
angular
    .module('ToDoList.ViewStateModule', []);

angular
    .module('ToDoList',
    [
        'ngRoute',
        'jgefroh.AlertModule',
        'jgefroh.HeaderModule',
        'ToDoList.Routes',
        'ToDoList.Filters',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.ViewStateModule'
    ]);
angular
    .module('ToDoList')
    .constant('applicationName', 'ToDoList')
    .constant('versionNumber', 'v0.7.0');