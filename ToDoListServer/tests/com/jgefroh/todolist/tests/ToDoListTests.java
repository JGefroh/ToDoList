package com.jgefroh.todolist.tests;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.jgefroh.todolist.server.todolists.Task;
import com.jgefroh.todolist.server.todolists.ToDoList;


public class ToDoListTests {
    
    private Task createTask() {
        Task task = Task.create("testName", "testGroup");
        return task;
    }
    
    private Task createTaskWithId(final int id) {
        Task task = Task.create("testName", "testGroup");
        task.setId(id);
        return task;
    }
    private Task createCompleteTaskWithId(final int id) {
        Task task = Task.create("testName", "testGroup");
        task.setId(id);
        task.markComplete();
        return task;
    }

    private Task createIncompleteTaskWithId(final int id) {
        Task task = Task.create("testName", "testGroup");
        task.setId(id);
        task.markIncomplete();
        return task;
    }
    
    
    @Test
    public void toDoList_whenAddTask_expectAdded() {
        ToDoList list = new ToDoList();
        Task createdTask = createTask();
        list.addTask(createdTask);
        
        List<Task> tasks = list.getTasks();
        
        assertEquals(1, tasks.size());
        assertEquals(createdTask.getName(), tasks.get(0).getName());
        assertEquals(createdTask.getGroup(), tasks.get(0).getGroup());
    }
    
    @Test
    public void toDoList_whenRemoveTask_expectRemoved() {
        ToDoList list = new ToDoList();
        Task createdTask = createTask();
        list.addTask(createdTask);

        assertEquals(1, list.getTasks().size());
        
        list.removeTask(createdTask);
        assertEquals(0, list.getTasks().size());
    }
    
    @Test
    public void toDoList_whenGetExistingTaskById_expectTask() {
        ToDoList list = new ToDoList();
        Task task1 = createTaskWithId(1);
        Task task2 = createTaskWithId(2);
        Task task3 = createTaskWithId(3);
        list.addTask(task1);
        list.addTask(task2);
        list.addTask(task3);

        assertEquals(3, list.getTasks().size());
        
        assertEquals(task2, list.getTask(2));
        assertEquals(task1, list.getTask(1));
        assertEquals(task3, list.getTask(3));
        assertNotEquals(task3, list.getTask(2));
    }
    
    @Test
    public void toDoList_whenGetCompleteTasks_expectCompleteTasks() {
        ToDoList list = new ToDoList();
        Task task1 = createCompleteTaskWithId(1);
        Task task3 = createCompleteTaskWithId(3);
        Task task5 = createCompleteTaskWithId(5);
        Task task2 = createIncompleteTaskWithId(2);
        Task task4 = createIncompleteTaskWithId(4);
        
        list.addTask(task1);
        list.addTask(task2);
        list.addTask(task3);
        list.addTask(task4);
        list.addTask(task5);

        assertEquals(5, list.getTasks().size());
        
        List<Task> completeTasks = list.getCompleteTasks();
        assertEquals(3, completeTasks.size());
        for (Task task : completeTasks) {
            assertTrue(task.isComplete());
            assertNotEquals(task2, task);
            assertNotEquals(task4, task);
        }
    }
    @Test
    public void toDoList_whenGetIncompleteTasks_expectIncompleteTasks() {
        ToDoList list = new ToDoList();
        Task task1 = createCompleteTaskWithId(1);
        Task task3 = createCompleteTaskWithId(3);
        Task task5 = createCompleteTaskWithId(5);
        Task task2 = createIncompleteTaskWithId(2);
        Task task4 = createIncompleteTaskWithId(4);
        
        list.addTask(task1);
        list.addTask(task2);
        list.addTask(task3);
        list.addTask(task4);
        list.addTask(task5);

        assertEquals(5, list.getTasks().size());
        
        List<Task> incompleteTasks = list.getIncompleteTasks();
        assertEquals(2, incompleteTasks.size());
        for (Task task : incompleteTasks) {
            assertFalse(task.isComplete());
            assertNotEquals(task1, task);
            assertNotEquals(task3, task);
            assertNotEquals(task5, task);
        }
    }
}
