package com.jgefroh.todolist.server.core;

import javax.ejb.ApplicationException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.xml.ws.soap.AddressingFeature.Responses;

import com.jgefroh.server.core.validation.ValidationResult;

@ApplicationException(rollback = true)
public class ToDoListException extends WebApplicationException {
    private static final long serialVersionUID = -7522610841733635756L;
    private ValidationResult payload;
    
    
    public ToDoListException(final ValidationResult payload) {
        super(Response.status(Response.Status.BAD_REQUEST).entity(payload).build());
        this.payload = payload;
    }

    public ValidationResult getPayload() {
        return payload;
    }
}
