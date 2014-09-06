/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList.Filters', []);
angular
    .module('ToDoList.AlertModule', []);
angular
    .module('ToDoList.StatsModule', []);
angular
    .module('ToDoList.HeaderModule', []);
angular
    .module('ToDoList.NavigationModule', []);
angular
    .module('ToDoList.ViewStateModule', []);

angular
    .module('ToDoList',
    [
        'ngRoute',
        'ToDoList.Routes',
        'ToDoList.Filters',
        'ToDoList.AlertModule',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.HeaderModule',
        'ToDoList.ViewStateModule'
    ]);
angular
    .module('ToDoList')
    .constant('versionNumber', 'v0.6.0');