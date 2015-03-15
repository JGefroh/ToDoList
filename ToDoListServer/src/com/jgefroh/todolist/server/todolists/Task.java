package com.jgefroh.todolist.server.todolists;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OrderBy;
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
    
    @ElementCollection(fetch = FetchType.EAGER)
    @Column(length = 100)
    @Size(max = 100, message = "A task tag can only be 100 characters long.")
    @OrderBy
    private List<String> tags;
    
    private boolean isComplete;
    private boolean isTracking;
    private long totalTimeTracked;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampTrackingStarted;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampCreated;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampCompleted;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestampDue;
    
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
    
    public static Task create(final String ownerId, final String name, final String group, final List<String> tags) {
        Task task = Task.create(ownerId, name, group);
        task.setTags(tags);
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
    
    public void updateTask(final String name, final String group, final List<String> tags, final Date timestampDue) {
        setGroup(group);
        setName(name);
        setTags(tags);
        setTimestampDue(timestampDue);
    }
    
    public void tag(final String tag) {
        if (tags == null) {
            tags = new ArrayList<String>();
        }
        
        if (!tags.contains(tag)) {
            tags.add(tag);
        }
    }
    
    public void untag(final String tag) {
        tags.remove(tag);
    }
    
    public long simulateUntrack() {
        if (isTracking()) {
            return getTotalTimeTracked() + (new Date().getTime() - getTimestampTrackingStarted().getTime());
        }
        else {
            return getTotalTimeTracked();
        }
    }

    public void schedule(final Date timestampDue) {
        setTimestampDue(timestampDue);
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
    
    public Date getTimestampDue() {
        return timestampDue;
    }
    
    public List<String> getTags() {
        return tags;
    }

    

    private void setComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    private void setGroup(String group) {
        if (group != null && group.isEmpty()) {
            this.group = null;
        }
        else {
            this.group = group;
        }
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
    
    private void setTimestampDue(Date timestampDue) {
        this.timestampDue = timestampDue;
    }
    
    private void setTags(final List<String> tags) {
        this.tags = tags;
    }
}
