package com.jgefroh.todolist.server.todolists;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String taskName;
    private String taskGroup;
    private boolean isComplete;
    
    
    
    public static Task create(final String name, final String group) {
        Task task = new Task();
        task.setTaskGroup(group);
        task.setTaskName(name);
        
        return task;
    }
    
    public void markComplete() {
        setComplete(true);
    }
    
    public void markIncomplete() {
        setComplete(false);
    }
    
    public void editTask(final String name, final String group) {
        setTaskGroup(group);
        setTaskName(name);
    }
    

    
    public boolean isComplete() {
        return isComplete;
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getTaskGroup() {
        return taskGroup;
    }
    
    public String getTaskName() {
        return taskName;
    }

    

    private void setComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    private void setTaskGroup(String taskGroup) {
        this.taskGroup = taskGroup;
    }
    
    private void setTaskName(String taskName) {
        this.taskName = taskName;
    }
}
