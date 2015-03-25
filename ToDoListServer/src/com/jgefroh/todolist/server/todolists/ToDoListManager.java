package com.jgefroh.todolist.server.todolists;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.jgefroh.server.core.validation.IValidationLayer;

@Stateless
public class ToDoListManager {
    
    @Inject private IValidationLayer validationLayer;
    @Inject private Logger logger;
    @Inject private ToDoListDAO listDAO;
    @Inject private TaskDAO taskDAO;

    
    public Task createTask(final String ownerId, final Task taskToCreate) {
        if (isSubtask(taskToCreate)) {
            return createAsSubtask(ownerId, taskToCreate.getName(), taskToCreate.getParentTaskId(), taskToCreate.getOrder());
        }
        else {
            return createAsTask(ownerId, taskToCreate);
        }
    }
    
    private boolean isSubtask(final Task task) {
        return task.getParentTaskId() != null;
    }
    
    private Task createAsTask(final String ownerId, final Task taskToCreate) {
        Task task = Task.create(ownerId, taskToCreate.getName(), taskToCreate.getGroup(), taskToCreate.getTags());
        task.schedule(taskToCreate.getTimestampDue());
        validationLayer.validateThrowIfError(task);
        task = taskDAO.update(task);
        
        ToDoList list = getList(ownerId);
        list.addTask(task);
        listDAO.update(list);
        return task;
    }
    
    private Task createAsSubtask(final String ownerId, final String name, final int parentTaskId, final Integer order) {
        Task subtask = Task.createAsSubtask(ownerId, name, parentTaskId, order);
        validationLayer.validateThrowIfError(subtask);
        subtask = taskDAO.update(subtask);
        return subtask;
    }
    
    public Task updateTask(final String ownerId, final int taskId, final Task dto) {
        Task task = getTask(ownerId, taskId);
        task.updateTask(dto.getName(), dto.getGroup(), dto.getDescription(), dto.getTags(), dto.getTimestampDue(), dto.getTotalTimeTracked());
        validationLayer.validateThrowIfError(task);
        task.syncSubtasks(dto.getSubtasks());
        return taskDAO.update(task);
    }

    public void deleteTask(final int taskId) {
        taskDAO.delete(Task.class, taskId);
    }
    
    
    public Task markTaskComplete(final String ownerId, final int taskId) {
        Task task = getTask(ownerId, taskId);
        task.markComplete();
        return task;
    }
    
    public Task markTaskIncomplete(final String ownerId, final int taskId) {
        Task task = getTask(ownerId, taskId);
        task.markIncomplete();
        return task;
    }
    
    public List<Task> getIncompleteTasks(final String ownerId) {
        ToDoList list = getList(ownerId);
        for (Task task : list.getIncompleteTasks() == null ? Collections.<Task>emptyList() : list.getIncompleteTasks()) {
            task.bankTime();
        }
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
        if (ownerId == null) {
            return null;
        }
        ToDoList list = listDAO.getForOwner(ownerId);
        if (list == null) {
            list = createList(ownerId);
            addTutorialTasks(list);
        }
        return list;
    }
    
    private ToDoList createList(final String ownerId) {
        ToDoList list = ToDoList.create(ownerId);
        list = listDAO.update(list);
        return list;
    }
    
    private void addTutorialTasks(final ToDoList list) {
        Task firstTask = taskDAO.update(Task.create(list.getOwnerId(), "Welcome to ToDoList! You can mark this task as 'Complete', edit its details, or track time on it!", "Tutorial"));
        firstTask.schedule(new Date());
        firstTask.tag("Tutorial");
        list.addTask(firstTask);
        
        Task firstCompletedTask = Task.create(list.getOwnerId(), "You can mark this completed task as 'Incomplete', or delete it forever!", "Tutorial");
        firstCompletedTask.schedule(new Date());
        firstCompletedTask.markComplete();
        firstCompletedTask.tag("Tutorial");
        firstCompletedTask = taskDAO.update(firstCompletedTask);
        list.addTask(firstCompletedTask);
        
        listDAO.update(list);
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
