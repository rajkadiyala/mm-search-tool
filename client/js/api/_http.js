import axios from 'axios';

class HttpError extends Error {
    constructor(status, statusText) {
        super(statusText);
        this.status = status;
        this.statusText = statusText;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

function handleError(error) {
    if (error.response) {
        throw new HttpError(error.status, error.response.data);
    } else if (error.request) {
        throw new HttpError(
            500,
            error.message || 'No response from server',
        );
    } else {
        throw new HttpError(
            400,
            error.message || 'Bad request sent from client',
        );
    }
}

function getData(response) {
    return response.data;
}

export async function get(url) { // eslint-disable-line consistent-return
    try {
        return getData(await axios.get(url));
    } catch (e) {
        handleError(e);
    }
}

export async function post(url, request) { // eslint-disable-line consistent-return
    try {
        return getData(await axios.post(url, request));
    } catch (e) {
        handleError(e);
    }
}
