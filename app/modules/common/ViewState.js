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
            },
            completedTaskViewState: {
                isAscending: null,
                sortField: null,
                isShowingMinutes: null
            },
            statisticsViewState: {
                isAscending: null,
                sortField: null,
                isShowingMinutes: null
            },
            taskCreationViewState: {
                input: {
                    name: null,
                    group: null
                }
            }
        }
    }
    angular
        .module('ToDoList.ViewStateModule')
        .service('ViewState', ViewState)
})();