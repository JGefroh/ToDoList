package com.jgefroh.todolist.server.todolists;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;


@Entity
public class ToDoList {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @OneToMany(fetch = FetchType.EAGER)
    private List<Task> tasks;
    
    private String ownerId;
    
    
    public static ToDoList create(final String ownerId) {
        ToDoList list = new ToDoList();
        list.setOwnerId(ownerId);
        return list;
    }
    
    
    public void addTask(final Task task) {
        if (tasks == null) {
            tasks = new ArrayList<Task>();
        }
        this.tasks.add(task);
    }
    
    public void removeTask(final Task task) {
        if (tasks == null) {
            tasks = new ArrayList<Task>();
        }
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
        for (Task task : tasks == null ? Collections.<Task>emptyList() : tasks) {
            if (task.isComplete()) {
                results.add(task);
            }
        }
        
        return results;
    }
    
    public List<Task> getIncompleteTasks() {
        List<Task> results = new ArrayList<Task>();
        for (Task task : tasks == null ? Collections.<Task>emptyList() : tasks) {
            if (!task.isComplete()) {
                results.add(task);
            }
        }
        
        return results;
    }

    public List<Task> getTasks() {
        if (tasks == null) {
            tasks = new ArrayList<Task>();
        }
        return new ArrayList<Task>(tasks);
    }
    

    
    public Integer getId() {
        return id;
    }
    
    public String getOwnerId() {
        return ownerId;
    }
    
    
    
    private void setOwnerId(final String ownerId) {
        this.ownerId = ownerId;
    }
    
}
