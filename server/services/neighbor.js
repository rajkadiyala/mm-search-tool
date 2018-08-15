const {google} = require('googleapis');
const {promisify} = require('util');

const ClientFacingError = require('../util/ClientFacingError');
const {processRow, processRows} = require('../util/processData');

function setServiceAuth() {
    console.log('env', process.env);
    console.log('env spreadsheet id', process.env.GOOGLESHEETS__SPREADSHEET_ID);
    console.log('env client email', process.env.GOOGLESHEETS__CLIENT_EMAIL);
    console.log('env api key', process.env.GOOGLESHEETS__API_KEY);
    console.log('env endpoint', process.env.GOOGLESHEETS__ENDPOINT);
    return google.sheets({
        version: 'v4',
        auth: new google.auth.JWT(
            process.env.GOOGLESHEETS__CLIENT_EMAIL,
            null,
            process.env.GOOGLESHEETS__API_KEY,
            process.env.GOOGLESHEETS__ENDPOINT,
            null,
        ),
    });
}

const googleSheets = setServiceAuth();
const SPREADSHEET_ID = process.env.GOOGLESHEETS__SPREADSHEET_ID;
const HEADER_ROWS_OFFSET = 2;

function parseIntRadix10(str) {
    return parseInt(str, 10);
}

async function getData(fn, options) {
    return (await promisify(fn).call(googleSheets, options)).data;
}

function getNeighborsData() {
    return getData(googleSheets.spreadsheets.values.get, {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Cases!A1:AO',
    });
}

function getSingleNeighborData(id) {
    const row = parseIntRadix10(id) + HEADER_ROWS_OFFSET;
    return getData(googleSheets.spreadsheets.values.batchGet, {
        spreadsheetId: SPREADSHEET_ID,
        ranges: ['Cases!1:1', `Cases!${row}:${row}`],
    });
}

module.exports = {

    async getNeighbors() {
        try {
            const dataValues = (await getNeighborsData()).values;
            return processRows(...dataValues);
        } catch (e) {
            throw ClientFacingError.get('Failed to get neighbors data', e);
        }
    },

    async getNeighborById(id) {
        try {
            const [
                {values: [titleRowValues]},
                {values: [dataRowValues]},
            ] = (await getSingleNeighborData(id)).valueRanges;
            return processRow(titleRowValues, dataRowValues, id);
        } catch (e) {
            throw ClientFacingError.get('Failed to load neighbor data', e);
        }
    },

};
