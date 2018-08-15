const NEIGHBORS_DATA__READABLE_URI_MAP = [
    {columnName: 'Client Name', displayName: 'Client Name'},
    {columnName: 'Client Current City', displayName: 'Client Current City'},
    {columnName: 'Recording', displayName: 'Recorded'},
    {columnName: 'How to reach again', displayName: 'Client Contact Info'},
    {columnName: 'Loved One #1 Name', displayName: 'LO1 Name'},
    {columnName: 'Approximate Age (LO1)', displayName: 'LO1 Approximate Age'},
    {columnName: 'Last Known Location (LO1)', displayName: 'LO1 Last Known Location'},
    {columnName: 'Messenger Name', displayName: 'Messenger Name'},
    {columnName: 'Messenger Email', displayName: 'Messenger Email'},
    {columnName: 'Notes from Submission', displayName: 'Case Notes'},
];

function getOptional(data) {
    return data || '--';
}

function getDisplayDataIndices(titleRow) {
    return NEIGHBORS_DATA__READABLE_URI_MAP
        .map(d => d.columnName)
        .map(columnName => titleRow.indexOf(columnName));
}

function getDataAtIndices(dataRow, dataIndices) {
    return dataIndices.reduce((accum, dataIndex, i) => {
        return {
            ...accum,
            [NEIGHBORS_DATA__READABLE_URI_MAP[i].displayName]: getOptional(dataRow[dataIndex]),
        };
    }, {});
}

function sortByName(row1, row2) {
    const row1ClientName = row1['Client Name'].toLowerCase();
    const row2ClientName = row2['Client Name'].toLowerCase();
    if (row1ClientName < row2ClientName) {
        return -1;
    } else if (row1ClientName > row2ClientName) {
        return 1;
    } else {
        return 0;
    }
}

function provideId(data, id) {
    return {...data, id};
}

function processRow(titleRow, dataRow, id) {
    const displayDataIndices = getDisplayDataIndices(titleRow);
    return provideId(getDataAtIndices(dataRow, displayDataIndices), id);
}

function processRows(titleRow, metaDataRow, ...dataRows) {
    const displayDataIndices = getDisplayDataIndices(titleRow);
    return dataRows.map((dataRow, i) => {
        return provideId(getDataAtIndices(dataRow, displayDataIndices), i + 1);
    }).sort(sortByName);
}

module.exports = {processRow, processRows};
