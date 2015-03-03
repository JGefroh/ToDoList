(function() {
    function UserService($q, $http, $stateParams) {
        var self = this;
        var endpoints = {
            getID: function() {
               return '../rest/security';
            }
        };
        this.user = {id: $stateParams.userID};

        this.reserveID = function(userID) {
            var deferred = $q.defer();
            if (!userID || userID === 'newuser') {
                $http.get(endpoints.getID()).then(function(response) {
                    $stateParams.userID = response.data;
                    self.user.id = response.data;
                    deferred.resolve(self.user.id);
                });
            }
            else {
                $stateParams.userID = userID;
                self.user.id = userID;
                deferred.resolve(self.user.id);
            }
            return deferred.promise;
        }
    }
    angular
        .module('ToDoList.SecurityModule', [])
        .service('UserService', ['$q', '$http', '$stateParams', UserService]);
})();