package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class ToDoListManager {
    
    @Inject private ToDoListDAO listDAO;
    @Inject private TaskDAO taskDAO;

    
    public Task createTask(final String name, final String group) {
        Task task = Task.create(name, group);
        task = taskDAO.update(task);
        return task;
    }
    
    public Task saveTask(final int taskId, final String name, final String group) {
        Task task = getTask(taskId);
        task.editTask(name, group);
        return taskDAO.update(task);
    }
    
    
    public Task markComplete(final int taskId) {
        Task task = getTask(taskId);
        task.markComplete();
        return task;
    }
    
    public Task markIncomplete(final int taskId) {
        Task task = getTask(taskId);
        task.markIncomplete();
        return task;
    }
    
    
    public List<Task> getIncompleteTasks(final String ownerId) {
        ToDoList list = getList(ownerId);
        return list.getIncompleteTasks();
    }
    
    public List<Task> getCompleteTasks(final String ownerId) {
        ToDoList list = getList(ownerId);
        return list.getCompleteTasks();
    }
    
    public List<Task> getTasks(final String ownerId) {
        ToDoList list = getList(ownerId);
        return list.getTasks();
    }

    
    private ToDoList getList(final String ownerId) {
        ToDoList list = listDAO.getForOwner(ownerId);
        if (list == null) {
            throw new IllegalArgumentException("This list does not exist.");
        }
        return list;
    }
    
    private Task getTask(final int taskId) {
        Task task = taskDAO.get(Task.class, taskId);
        if (task == null) {
            throw new IllegalArgumentException("This task does not exist.");
        }
        return task;
    }
    
    
    
    /**
     * Used to enable testing. Do not use for non-testing purposes.
     */
    @Deprecated
    public void setToDoListDAO(final ToDoListDAO dao) {
        this.listDAO = dao;
    }

    /**
     * Used to enable testing. Do not use for non-testing purposes.
     */
    @Deprecated
    public void setTaskDAO(final TaskDAO dao) {
        this.taskDAO = dao;
    }
}
