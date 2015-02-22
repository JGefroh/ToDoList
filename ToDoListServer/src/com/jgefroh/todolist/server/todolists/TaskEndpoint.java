package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;


@RequestScoped
@Path("/tasks")
public class TaskEndpoint {
    
    @Inject private ToDoListManager listManager;
    
    @GET
    public List<Task> getTasks(@QueryParam("ownerId") final String ownerId,
                                @QueryParam("completed") final Boolean gettingCompletedTasks) {
        if (Boolean.TRUE.equals(gettingCompletedTasks)) {
            return listManager.getCompleteTasks(ownerId);
        }
        else if (Boolean.FALSE.equals(gettingCompletedTasks)) {
            return listManager.getIncompleteTasks(ownerId);
        }
        else {
            return listManager.getTasks(ownerId);
        }
    }
    
    @PUT
    @Consumes("application/json")
    public Task saveTask(final Task task) {
        return listManager.saveTask(task.getId(), task.getTaskName(), task.getTaskGroup());
    }
    
    @GET
    @Path("{ownerId}/task/{taskId}/markComplete")
    public void markComplete(@PathParam("taskId") final int taskId, final String ownerId) {
        listManager.markComplete(taskId);
    }
    
    @GET
    @Path("{ownerId}/task/{taskId}/markIncomplete")
    public void markIncomplete(@PathParam("taskId") final int taskId, final String ownerId) {
        listManager.markIncomplete(taskId);
    }
}