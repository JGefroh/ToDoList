package com.jgefroh.todolist.server.stats;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


@RequestScoped
@Path("/stats")
public class StatsEndpoint {
    
    @Inject private StatsManager statsManager;

    
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public List<GroupStats> getStats(@QueryParam("ownerId") final String ownerId) {
        return statsManager.calculateStats(ownerId);
    }
}