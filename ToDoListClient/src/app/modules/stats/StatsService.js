(function() {
    function StatsService($http) {
        var endpoints = {
            getStatsByGroup: function(ownerId) {
                return '../rest/stats/byGroup?ownerId={ownerId}'.replace('{ownerId}', ownerId);
            },
            getStatsByTag: function(ownerId) {
                return '../rest/stats/byTag?ownerId={ownerId}'.replace('{ownerId}', ownerId);
            }
        };

        this.getStatsByGroup = function (ownerId) {
            return $http.get(endpoints.getStatsByGroup(ownerId)).then(function(response) {
                return response.data;
            })
        };

        this.getStatsByTag = function (ownerId) {
            return $http.get(endpoints.getStatsByTag(ownerId)).then(function(response) {
                return response.data;
            })
        };
    }
    angular
        .module('ToDoList.StatsModule')
        .service('StatsService', ["$http", StatsService]);
})();
