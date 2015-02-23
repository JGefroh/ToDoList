package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class ToDoListManager {
    
    @Inject private ToDoListDAO listDAO;
    @Inject private TaskDAO taskDAO;

    
    public Task createTask(final String ownerId, final String name, final String group) {
        Task task = Task.create(ownerId, name, group);
        task = taskDAO.update(task);
        ToDoList list = getList(ownerId);
        list.addTask(task);
        listDAO.update(list);
        return task;
    }
    
    public Task updateTask(final String ownerId, final int taskId, final String name, final String group) {
        Task task = getTask(ownerId, taskId);
        task.updateTask(name, group);
        return taskDAO.update(task);
    }
    
    
    public Task markComplete(final String ownerId, final int taskId) {
        Task task = getTask(ownerId, taskId);
        task.markComplete();
        return task;
    }
    
    public Task markIncomplete(final String ownerId, final int taskId) {
        Task task = getTask(ownerId, taskId);
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

    
    public ToDoList getList(final String ownerId) {
        ToDoList list = listDAO.getForOwner(ownerId);
        if (list == null) {
            list = ToDoList.create(ownerId);
            list = listDAO.update(list);
        }
        return list;
    }
    
    private Task getTask(final String ownerId, final int taskId) {
        Task task = taskDAO.get(Task.class, taskId);
        if (task == null) {
            throw new IllegalArgumentException("This task does not exist.");
        }
        if (!task.getOwnerId().equals(ownerId)) {
            throw new IllegalArgumentException("You don't have permission to operate on this task.");
        }
        return task;
    }

    public Task trackTask(String ownerId, int taskId) {
        Task task = getTask(ownerId, taskId);
        task.track();
        return taskDAO.update(task);
    }
    
    public Task untrackTask(String ownerId, int taskId) {
        Task task = getTask(ownerId, taskId);
        task.untrack();
        return taskDAO.update(task);
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
