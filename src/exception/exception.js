class Exception extends Error {
    constructor(message, httpCode) {
        super(message);
        this.httpCode = httpCode;
    }
}