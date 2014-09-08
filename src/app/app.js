/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList',
    [
        'ngRoute',
        'jgefroh.AlertModule',
        'jgefroh.FiltersModule',
        'ToDoList.PersistenceModule',
        'ToDoList.Routes',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.ViewStateModule'
    ]);
angular
    .module('ToDoList')
    .constant('applicationName', 'ToDoList')
    .constant('versionNumber', 'v1.0.0');