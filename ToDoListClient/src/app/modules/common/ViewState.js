/**
 * Created by Joseph on 8/16/2014.
 */
(function() {
    function ViewState() {
        return {
            remainingTaskViewState: {
                isShowingMinutes: null,
                tagsToFilterBy: [],
                input: {
                    name: null,
                    group: null
                },
                filter: ''
            },
            completedTaskViewState: {
                isAscending: null,
                sortField: null,
                isShowingMinutes: null,
                tagsToFilterBy: []
            },
            statisticsViewState: {
                isAscending: null,
                sortField: null,
                isShowingMinutes: null
            },
            taskCreationViewState: {
            },
            calendarViewState: {
                selectedDate: new Date(),
                isShowingScheduled: true,
                tagsToFilterBy: [],
                input: {
                    name: null,
                    timestampDue: new Date()
                }
            }
        }
    }
    angular
        .module('ToDoList.ViewStateModule', [])
        .service('ViewState', ViewState)
})();