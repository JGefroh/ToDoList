(function () {
    function PlannerController ($state) {
        var vm = this;
        vm.isShowing = function(view) {
            return $state.includes(view);
        };

        vm.goTo = function(place) {
            $state.go(place);
        };
    }

    angular
        .module('ToDoList.PlannerModule')
        .controller('PlannerCtrl', ['$state', PlannerController]);
})();