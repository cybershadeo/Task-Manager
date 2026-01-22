class AppError extends Error {
    constructor( message, statusCode ) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}


class ValidationError extends AppError {
    constructor( message ) {
        super(message);
        this.name = 'ValidationAppError';
        this.statusCode = 400;
    }
}


class ConflictError extends AppError {
    constructor( message ) {
        super( message );
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}


class NotFoundError extends AppError {
    constructor( message ) {
        super( message );
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class UnauthorizedError extends AppError { 
    constructor( message ) {
        super( message );
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

class ExternalServiceError extends AppError {
    constructor ( message ) {
        super( message );
        this.name = 'ExternalServiceError';
        this.statusCode = 503;
    }
}

class InternalError extends AppError {
    constructor( message ) {
        super( message );
        this.name = 'InternalError';
        this.statusCode = 500;
    }    

}

class EnvriomentVariableError extends AppError{
    constructor(message) {
        super( message ); 
        this.name = 'EnvriomentVariableError';
        this.statusCode = 500;
    }
}


module.exports = { 
    AppError,
    ValidationError, 
    ConflictError, 
    NotFoundError, 
    UnauthorizedError,
    ExternalServiceError,
    InternalError,
    EnvriomentVariableError
}