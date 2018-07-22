class ClientFacingError extends Error {

    static getNewThrowable(error) {
        console.log('*****RE-THROWING ERROR*****');
        console.error('ERROR MESSAGE: ', error);
        console.error('ERROR STACK: ', error.stack); // stop gap to 'chain' error :(
        throw new ClientFacingError(500, error.message);
    }

    static log(logMessages) {
        if (logMessages.length > 0) {
            console.error(...logMessages);
        }
    }

    constructor(status, statusText, ...logMessages) {
        super(statusText);
        this.status = status;
        this.statusText = statusText;
        ClientFacingError.log(logMessages);
        Object.setPrototypeOf(this, ClientFacingError.prototype);
    }

}

module.exports = ClientFacingError;
