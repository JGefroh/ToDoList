/**
 * Defines and configures all modules.
 */
angular
    .module('ToDoList',
    [
        'ui.router',
        'jgefroh.AlertModule',
        'jgefroh.FiltersModule',
        'ToDoList.PersistenceModule',
        'ToDoList.Routes',
        'ToDoList.SecurityModule',
        'ToDoList.TaskModule',
        'ToDoList.StatsModule',
        'ToDoList.NavigationModule',
        'ToDoList.ViewStateModule'
    ]);
angular
    .module('ToDoList')
    .constant('applicationName', 'ToDoList')
    .constant('versionNumber', 'v1.0.0')
    .constant('endpoints', {
        tasks: {
            getTasks: function(userID) {
                return '../rest/tasks?userID=' + userID;
            }
        }
    });