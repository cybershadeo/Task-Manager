class ValidationError extends Error {
    constructor( message ) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}


class ConflictError extends Error {
    constructor( message ) {
        super( message );
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}


class NotFoundError extends Error {
    constructor( message ) {
        super( message );
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class UnauthorizedError extends Error { 
    constructor( message ) {
        super( message );
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

class ExternalServiceError extends Error {
    constructor ( message ) {
        super( message );
        this.name = 'ExternalServiceError';
        this.statusCode = 503;
    }
}

class InternalError extends Error {
    constructor( message ) {
        super( message );
        this.name = 'InternalError';
        this.statusCode = 500;
    }
}

module.exports = { 
    ValidationError, 
    ConflictError, 
    NotFoundError, 
    UnauthorizedError,
    ExternalServiceError,
    InternalError
}