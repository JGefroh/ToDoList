/**
 * Created by Joseph on 8/24/2014.
 */
function Task() {
    /**
     * Fields
     */
    this.group = null;
    this.name = null;
    this.dateAdded = new Date();
    this.dateCompleted = null;
    this.isCompleted = false;
    this.isTracking = false;
    this.timeTrackingStarted = null;
    this.totalTimeTracked = 0;

    this.startTracking = function() {
        this.timeTrackingStarted = new Date();
        this.isTracking = true;
    };

    this.stopTracking = function() {
        if (this.timeTrackingStarted) {
            var timeTracked =  Math.abs(this.timeTrackingStarted.getTime() - new Date().getTime());
            this.totalTimeTracked += timeTracked;
            this.timeTrackingStarted = null;
            this.isTracking = false;
        }
    };

    this.bankTimeTracked = function() {
        if (this.isTracking) {
            this.stopTracking();
            this.startTracking();
        }
    };

    this.markComplete = function() {
        this.isCompleted = true;
        this.dateCompleted = new Date();
        this.stopTracking();
    };
}