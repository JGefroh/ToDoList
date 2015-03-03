package com.jgefroh.todolist.server.todolists;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Size;


@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String ownerId;
    
    @Column(length = 1000)
    @Size(max = 1000, message = "A task name can only be 1000 characters long.")
    private String name;
    
    @Column(length = 1000)
    @Size(max = 1000, message = "A task group name can only be 1000 characters long.")
    private String group;
    
    private boolean isComplete;
    private boolean isTracking;
    private long totalTimeTracked;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampTrackingStarted;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampCreated;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampCompleted;
    
    @Transient
    private boolean isReadOnly;
    
    
    public static Task create(final String ownerId, final String name, final String group) {
        Task task = new Task();
        task.setOwnerId(ownerId);
        task.setGroup(group);
        task.setName(name);
        task.setTimestampCreated(new Date());
        return task;
    }
    
    public void markComplete() {
        untrack();
        setTimestampCompleted(new Date());
        setComplete(true);
    }
    
    public void markIncomplete() {
        setTimestampCompleted(null);
        setComplete(false);
    }
    
    public void bankTime() {
        if (isTracking()) {
            untrack();
            track();
        }
    }
    
    public void track() {
        setTracking(true);
        setTimestampTrackingStarted(new Date());
    }
    
    public void untrack() {
        if (isTracking()) {
            setTracking(false);
            setTotalTimeTracked(getTotalTimeTracked() + (new Date().getTime() - getTimestampTrackingStarted().getTime()));
            setTimestampTrackingStarted(null);
        }
    }
    
    public void updateTask(final String name, final String group) {
        setGroup(group);
        setName(name);
    }
    
    public long simulateUntrack() {
        if (isTracking()) {
            return getTotalTimeTracked() + (new Date().getTime() - getTimestampTrackingStarted().getTime());
        }
        else {
            return getTotalTimeTracked();
        }
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
    
    public Date getTimestampTrackingStarted() {
        return timestampTrackingStarted;
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
    
    public Date getTimestampCompleted() {
        return timestampCompleted;
    }
    
    public Date getTimestampCreated() {
        return timestampCreated;
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
    
    private void setTimestampTrackingStarted(Date timestampTrackingStarted) {
        this.timestampTrackingStarted = timestampTrackingStarted;
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
    
    private void setTimestampCompleted(Date timestampCompleted) {
        this.timestampCompleted = timestampCompleted;
    }
    
    private void setTimestampCreated(Date timestampCreated) {
        this.timestampCreated = timestampCreated;
    }
}
