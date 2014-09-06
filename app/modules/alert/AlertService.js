/**
 * Created by Joseph on 8/16/2014.
 */
(function() {
    function AlertService($timeout) {
        var alert = {
            subject: null,
            message: null,
            type: null,
            isShowing: false
        };
        var alertPanelTimer = null;

        this.getAlert = function () {
            return alert;
        };

        this.setAlert = function (type, subject, message, timeout) {
            alert.type = type;
            alert.subject = subject;
            alert.message = message;
            alert.isShowing = true;

            if (alertPanelTimer != null) {
                $timeout.cancel(alertPanelTimer);
            }
            alertPanelTimer = $timeout(function () {
                alert.isShowing = false;
                alertPanelTimer = null;
            }, timeout);
        }
    }
    angular
        .module('jgefroh.AlertModule')
        .service('AlertService', ['$timeout', AlertService])
})();