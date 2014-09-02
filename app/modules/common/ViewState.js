/**
 * Created by Joseph on 8/16/2014.
 */
(function() {
    function ViewState() {
        return {
            remainingTaskViewState: {
                isAscending: null,
                sortField: null,
                isShowingMinutes: null
            }
        }
    }
    angular
        .module('ToDoList.ViewStateModule')
        .factory('ViewState', ViewState)
})();