/**
 * Created by Joseph on 8/16/2014.
 */
var alertModule = angular.module('ToDoList.AlertModule');
alertModule.service('AlertService', function($timeout) {
    var alert  = {
        subject: null,
        message: null,
        type: null,
        isShowing: false
    };
    var alertPanelTimer = null;

    this.getAlert = function() {
        return alert;
    };

    this.setAlert = function(type, subject, message, timeout) {
        alert.type = type;
        alert.subject = subject;
        alert.message = message;
        alert.isShowing = true;

        if (alertPanelTimer != null) {
            $timeout.cancel(alertPanelTimer);
        }
        alertPanelTimer = $timeout(function() {
           alert.isShowing = false;
            alertPanelTimer = null;
        }, timeout);
    }
});
alertModule.constant('truncateLimit', 30);