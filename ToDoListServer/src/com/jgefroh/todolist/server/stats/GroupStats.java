package com.jgefroh.todolist.server.stats;

import java.math.BigDecimal;


public class GroupStats {
    private String group;
    private int remainingTaskCount;
    private int completedTaskCount;
    private long totalTimeTracked;
    
    
    public static GroupStats create(final String group) {
        GroupStats stats = new GroupStats();
        stats.setGroup(group);
        return stats;
    }
    
    
    public void incrementCompletedTaskCount() {
        setCompletedTaskCount(getCompletedTaskCount() + 1);
    }
    
    public void incrementRemainingTaskCount() {
        setRemainingTaskCount(getRemainingTaskCount() + 1);
    }
    
    public void incrementTotalHoursTracked(final long increment) {
        setTotalTimeTracked(getTotalTimeTracked() + increment);
    }
    
    
    public int getCompletedTaskCount() {
        return completedTaskCount;
    }
    
    public String getGroup() {
        return group;
    }
    
    public int getRemainingTaskCount() {
        return remainingTaskCount;
    }
    
    public long getTotalTimeTracked() {
        return totalTimeTracked;
    }
    
    
    
    private void setCompletedTaskCount(int completedTaskCount) {
        this.completedTaskCount = completedTaskCount;
    }
    
    public void setGroup(String group) {
        this.group = group;
    }
    
    private void setRemainingTaskCount(int remainingTaskCount) {
        this.remainingTaskCount = remainingTaskCount;
    }
    
    private void setTotalTimeTracked(long totalTimeTracked) {
        this.totalTimeTracked = totalTimeTracked;
    }
}
