package com.jgefroh.todolist.server.todolists;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class ToDoList {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @OneToMany
    private List<Task> tasks = new ArrayList<Task>();
    
    public void addTask(final Task task) {
        this.tasks.add(task);
    }
    
    public void removeTask(final Task task) {
        this.tasks.remove(task);
    }
    
    public Task getTask(final int id) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                return task;
            }
        }
        return null;
    }
    
    public List<Task> getCompleteTasks() {
        List<Task> results = new ArrayList<Task>();
        for (Task task : tasks) {
            if (task.isComplete()) {
                results.add(task);
            }
        }
        
        return results;
    }
    
    public List<Task> getIncompleteTasks() {
        List<Task> results = new ArrayList<Task>();
        for (Task task : tasks) {
            if (!task.isComplete()) {
                results.add(task);
            }
        }
        
        return results;
    }

    public List<Task> getTasks() {
        return tasks;
    }
}
