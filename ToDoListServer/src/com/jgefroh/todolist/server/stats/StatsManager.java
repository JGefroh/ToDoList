package com.jgefroh.todolist.server.stats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.jgefroh.todolist.server.todolists.Task;
import com.jgefroh.todolist.server.todolists.ToDoList;
import com.jgefroh.todolist.server.todolists.ToDoListManager;

@Stateless
public class StatsManager {
    
    @Inject private ToDoListManager listManager;
    
    
    public List<GroupStats> calculateStats(final String ownerId) {
        ToDoList list = listManager.getList(ownerId);
        List<Task> tasks = list.getTasks();
        
        Map<String, GroupStats> uniqueGroups = getUniqueGroups(tasks);
        
        for (Task task : tasks) {
            GroupStats stats = uniqueGroups.get(task.getGroup());
            if (task.isComplete()) {
                stats.incrementCompletedTaskCount();
            }
            else {
                stats.incrementRemainingTaskCount();
            }
            stats.incrementTotalHoursTracked(task.simulateUntrack());
        }
        

        List<GroupStats> stats = new ArrayList<GroupStats>(uniqueGroups.values());
        return stats;
    }
    
    private Map<String, GroupStats> getUniqueGroups(final List<Task> tasks) {
        Map<String, GroupStats> results = new HashMap<String, GroupStats>();
        
        for (Task task : tasks) {
            if (!results.containsKey(task.getGroup())) {
                GroupStats stat = GroupStats.create(task.getGroup());
                results.put(task.getGroup(), stat);
            }
        }
        
        return results;
    }
    
    
    /**
     * Used to enable testing. Do not use for non-testing purposes.
     */
    @Deprecated
    public void setToDoListManager(final ToDoListManager manager) {
        this.listManager = manager;
    }
}
