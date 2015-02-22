/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function PersistenceCtrl(TaskService, AlertService) {
    }
    angular
        .module('ToDoList.PersistenceModule', [])
        .controller('PersistenceCtrl', ['TaskService', 'AlertService', PersistenceCtrl]);
})();
