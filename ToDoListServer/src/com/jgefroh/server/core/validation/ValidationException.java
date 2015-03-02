package com.jgefroh.server.core.validation;

import javax.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class ValidationException extends RuntimeException {
    private static final long serialVersionUID = 8763528418515373751L;
    private ValidationResult result;
    
    public ValidationException(ValidationResult result) {
        this.result = result;
    }
    
    public ValidationResult getResult() {
        return result;
    }
}
