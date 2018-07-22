class ClientFacingError extends Error {

    static get(statusText, error) {
        return new ClientFacingError(500, statusText, error);
    }

    static log(...logMessages) {
        if (logMessages.length > 0) {
            console.error(new Date().toUTCString(), ...logMessages);
        }
    }

    constructor(status, statusText, error) {
        super(statusText);
        this.status = status;
        this.statusText = statusText;
        this.originalError = error;
        this.logError();
        Object.setPrototypeOf(this, ClientFacingError.prototype);
    }

    logError() {
        ClientFacingError.log(
            '*****CONSTRUCTED THROWABLE*****',
            '**STATUS**: ', this.status,
            '**STATUS TEXT**: ', this.statusText,
            '**ORIGINAL ERROR**: ', this.originalError,
        );
    }

}

module.exports = ClientFacingError;
