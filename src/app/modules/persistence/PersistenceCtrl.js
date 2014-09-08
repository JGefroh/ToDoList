/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function PersistenceCtrl(TaskService, AlertService) {
        var vm = this;
        vm.export = {json: null};
        vm.import = {json: null};
        getTasksAsJSON();


        function getTasksAsJSON() {
           vm.export.json = angular.toJson(TaskService.getTasks());
        }

        vm.load = function(tasksToLoad) {
            try {
                TaskService.setTasks(angular.fromJson(tasksToLoad.json));
                getTasksAsJSON();
                AlertService.setAlert("alert-info", "Load successful!", TaskService.getTasks().length + " tasks have been loaded.", 2000);
                tasksToLoad.json = null;
            }
            catch(error) {
                AlertService.setAlert("alert-danger", "Load failed!", "We couldn't read your saved tasks properly. Please ensure there are no typos and try again.", 5000);
            }
        }
    }
    angular
        .module('ToDoList.PersistenceModule', [])
        .controller('PersistenceCtrl', ['TaskService', 'AlertService', PersistenceCtrl]);
})();
