package com.jgefroh.todolist.server.todolists;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Size;


@Entity
public class Subtask {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @Column(length = 1000)
    @Size(max = 1000, message = "A task name can only be 1000 characters long.")
    private String name;
    
    private boolean isComplete;
    
    @Transient
    private boolean isReadOnly;
    
    
    public static Subtask create(final String name) {
        Subtask task = new Subtask();
        task.setName(name);
        return task;
    }
    
    public void update(final String name) {
        setName(name);
    }
    
    
    public void markComplete() {
        setComplete(true);
    }
    
    public void markIncomplete() {
        setComplete(false);
    }
    
    public boolean isComplete() {
        return isComplete;
    }
    
    public boolean isReadOnly() {
        return isReadOnly;
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    

    private void setComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    
    private void setName(String name) {
        this.name = name;
    }
    
    
    public void setReadOnly(boolean isReadOnly) {
        this.isReadOnly = isReadOnly;
    }
}
