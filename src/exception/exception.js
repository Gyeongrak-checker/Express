class Exception extends Error {
    constructor(message, httpCode) {
        super(message);
        this.status = httpCode;
    }
}

module.exports = Exception;