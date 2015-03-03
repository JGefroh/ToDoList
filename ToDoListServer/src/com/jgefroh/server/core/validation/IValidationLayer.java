package com.jgefroh.server.core.validation;


/**
 * Provides an interface to validate objects and throw errors if they are found.
 * @author Joseph Gefroh
 */
public interface IValidationLayer {
    <T>ValidationResult validate(T objectToValidate);
    <T>void validateThrowIfError(T objectToValidate);
}
