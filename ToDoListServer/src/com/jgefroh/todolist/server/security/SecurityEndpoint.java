package com.jgefroh.todolist.server.security;

import java.util.UUID;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;


@RequestScoped
@Path("/security")
public class SecurityEndpoint {
    
    @GET
    public String generateUUID() {
        return UUID.randomUUID().toString();
    }
}