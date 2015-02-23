(function() {
    function StatsService($http) {
        var endpoints = {
            getGroupStats: function(ownerId) {
                return '../rest/stats?ownerId={ownerId}'.replace('{ownerId}', ownerId);
            }
        };

        this.getGroupStats = function (ownerId) {
            return $http.get(endpoints.getGroupStats(ownerId)).then(function(response) {
                return response.data;
            })
        };
    }
    angular
        .module('ToDoList.StatsModule')
        .service('StatsService', ["$http", StatsService]);
})();
