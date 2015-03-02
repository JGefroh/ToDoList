package com.jgefroh.server.core.validation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Holds the results of a validation failure.
 * @author Joseph Gefroh
 */
public class ValidationResult {
    private Map<String, List<String>> errorsByField = new HashMap<String, List<String>>();
    
    
    public void addError(final String field, final String error) {
        List<String> errors = errorsByField.get(field);
        if (errors == null) {
            errors = new ArrayList<String>();
            errorsByField.put(field, errors);
        }
        errors.add(error);
    }
    
    public Map<String, List<String>> getErrors() {
        return errorsByField;
    }
    
    public boolean hasErrors() {
        return !errorsByField.isEmpty();
    }
}
