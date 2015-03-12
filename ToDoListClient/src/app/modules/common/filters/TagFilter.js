/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function TagFilter() {
        return function(tasks, tagsToFilterBy) {
            if (tagsToFilterBy.length === 0) {
                return tasks;
            }

            return tasks.filter(function(task, index, array) {
                var isIncluded = false;
                angular.forEach(task.tags, function(taskTag, index) {
                    angular.forEach(tagsToFilterBy, function(filterTag, index) {
                        if (filterTag === taskTag) {
                            isIncluded = true;
                        }
                    });
                });
                return isIncluded;
            });
        };
    }
    angular
        .module('jgefroh.FiltersModule')
        .filter('tagFilter', TagFilter);
})();