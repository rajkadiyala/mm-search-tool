const {google} = require('googleapis');
const {promisify} = require('util');

const ClientFacingError = require('../util/ClientFacingError');

function setServiceAuth() {
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

function getAllNeighborsNames() {
    return getData(googleSheets.spreadsheets.values.get, {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Cases!A3:A',
    });
}

function getSingleNeighborRow(id) {
    const row = parseIntRadix10(id) + HEADER_ROWS_OFFSET;
    return getData(googleSheets.spreadsheets.values.batchGet, {
        spreadsheetId: SPREADSHEET_ID,
        ranges: ['Cases!1:1', `Cases!${row}:${row}`],
    });
}

function isColdCaseColumn(columnName) {
    return columnName.startsWith('Case Managers_if you mark');
}

function getFormattedNeighborData([columnNamesRaw, valuesRaw]) {
    const COLD_CASE_READABLE_URI = 'Cold Case';
    const columnNames = columnNamesRaw.values[0];
    const values = valuesRaw.values[0];
    return columnNames.reduce((accum, columnName, i) => {
        return isColdCaseColumn(columnName)
            ? {...accum, [COLD_CASE_READABLE_URI]: values[i]}
            : {...accum, [columnName]: values[i]};
    }, {});
}

module.exports = {

    async getNeighbors() {
        try {
            const dataValues = (await getAllNeighborsNames()).values;
            return dataValues.map(([name], i) => {
                return {name, id: parseIntRadix10(i) + 1};
            });
        } catch (e) {
            throw ClientFacingError.get('Failed to get neighbors data', e);
        }
    },

    async getNeighborById(id) {
        try {
            const dataValues = (await getSingleNeighborRow(id)).valueRanges;
            return getFormattedNeighborData(dataValues);
        } catch (e) {
            throw ClientFacingError.get('Failed to load neighbor data', e);
        }
    },

};
