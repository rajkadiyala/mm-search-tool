const NEIGHBORS_DATA__READABLE_URI_MAP = [
    {columnName: 'Client Name', displayName: 'Client Name'},
    {columnName: 'Client Current City', displayName: 'Client Current City'},
    {columnName: 'Recording', displayName: 'Date Recorded'},
    {columnName: 'How to reach again', displayName: 'Client Contact Info'},
    {columnName: 'Loved One #1 Name', displayName: 'LO1 Name'},
    {columnName: 'Approximate Age (LO1)', displayName: 'LO1 Approximate Age'},
    {columnName: 'Last Known Location (LO1)', displayName: 'LO1 Last Known Location'},
    {columnName: 'Messenger Name', displayName: 'Messenger Name'},
    {columnName: 'Messenger Email', displayName: 'Messenger Email'},
    {columnName: 'Notes from Submission', displayName: 'Case Notes'},
];

function getDisplayDataIndices(titleRow) {
    return NEIGHBORS_DATA__READABLE_URI_MAP
        .map(d => d.columnName)
        .map(columnName => titleRow.indexOf(columnName));
}

function getDataAtIndices(dataRow, indices) {
    return indices.map((dataIndex, i) => {
        return {
            field: NEIGHBORS_DATA__READABLE_URI_MAP[i].displayName,
            value: dataRow[dataIndex],
        };
    });
}

function processRow(titleRow, dataRow) {
    const displayDataIndices = getDisplayDataIndices(titleRow);
    return getDataAtIndices(dataRow, displayDataIndices);
}

function processRows(titleRow, metaDataRow, ...dataRows) {
    const displayDataIndices = getDisplayDataIndices(titleRow);
    return dataRows.map(dataRow => getDataAtIndices(dataRow, displayDataIndices));
}

module.exports = {processRow, processRows};
