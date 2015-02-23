package com.jgefroh.todolist.server.todolists;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String ownerId;
    private String name;
    private String group;
    private boolean isComplete;
    private boolean isTracking;
    private long totalTimeTracked;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timeTrackingStarted;
    
    @Transient
    private boolean isReadOnly;
    
    
    public static Task create(final String ownerId, final String name, final String group) {
        Task task = new Task();
        task.setOwnerId(ownerId);
        task.setGroup(group);
        task.setName(name);
        
        return task;
    }
    
    public void markComplete() {
        untrack();
        setComplete(true);
    }
    
    public void markIncomplete() {
        setComplete(false);
    }
    
    public void track() {
        setTracking(true);
        setTimeTrackingStarted(new Date());
    }
    
    public void untrack() {
        if (isTracking()) {
            setTracking(false);
            setTotalTimeTracked(getTotalTimeTracked() + (new Date().getTime() - getTimeTrackingStarted().getTime()));
            setTimeTrackingStarted(null);
        }
    }
    
    public void updateTask(final String name, final String group) {
        setGroup(group);
        setName(name);
    }
    

    
    public boolean isComplete() {
        return isComplete;
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getGroup() {
        return group;
    }
    
    public String getName() {
        return name;
    }
    
    public String getOwnerId() {
        return ownerId;
    }
    
    public Date getTimeTrackingStarted() {
        return timeTrackingStarted;
    }
    
    public long getTotalTimeTracked() {
        return totalTimeTracked;
    }
    
    public boolean isTracking() {
        return isTracking;
    }
    
    public boolean isReadOnly() {
        return isReadOnly;
    }

    

    private void setComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    private void setGroup(String group) {
        this.group = group;
    }
    
    private void setName(String name) {
        this.name = name;
    }
    
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
    
    private void setTimeTrackingStarted(Date timeTrackingStarted) {
        this.timeTrackingStarted = timeTrackingStarted;
    }
    
    private void setTotalTimeTracked(long totalTimeTracked) {
        this.totalTimeTracked = totalTimeTracked;
    }
    
    private void setTracking(boolean isTracking) {
        this.isTracking = isTracking;
    }
    
    public void setReadOnly(boolean isReadOnly) {
        this.isReadOnly = isReadOnly;
    }
}
