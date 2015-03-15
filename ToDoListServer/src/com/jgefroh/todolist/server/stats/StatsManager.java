package com.jgefroh.todolist.server.stats;

import java.util.ArrayList;
import java.util.Collections;
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
    
    
    public List<GroupStats> calculateStatsByGroup(final String ownerId) {
        ToDoList list = listManager.getList(ownerId);
        List<Task> tasks = list.getTasks();
        
        Map<String, GroupStats> uniqueGroups = getUniqueGroups(tasks);
        
        for (Task task : tasks) {
            GroupStats stats = uniqueGroups.get(task.getGroup());
            updateStats(stats, task);
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
    
    private void updateStats(GroupStats stats, Task task) {
        if (task.isComplete()) {
            stats.incrementCompletedTaskCount();
        }
        else {
            stats.incrementRemainingTaskCount();
        }
        stats.incrementTotalHoursTracked(task.simulateUntrack());
    }

    public List<GroupStats> calculateStatsByTag(String ownerId) {
        ToDoList list = listManager.getList(ownerId);
        List<Task> tasks = list.getTasks();
        
        Map<String, GroupStats> uniqueTags = getUniqueTags(tasks);
        
        for (Task task : tasks) {
            for (String tag : task.getTags() == null ? Collections.<String>emptyList() : task.getTags()) {
                GroupStats stats = uniqueTags.get(tag);
                updateStats(stats, task);
            }
        }

        List<GroupStats> stats = new ArrayList<GroupStats>(uniqueTags.values());
        return stats;
    }
    
    private Map<String, GroupStats> getUniqueTags(final List<Task> tasks) {
        Map<String, GroupStats> results = new HashMap<String, GroupStats>();
        
        for (Task task : tasks) {
            for (String tag : task.getTags() == null ? Collections.<String>emptyList() : task.getTags()) {
                if (!results.containsKey(tag)) {
                    GroupStats stat = GroupStats.create(tag);
                    results.put(tag, stat);
                }
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
