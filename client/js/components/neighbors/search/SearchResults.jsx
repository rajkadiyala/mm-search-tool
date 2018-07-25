import React from 'react';
import PropTypes from 'prop-types';

import * as uris from '../uris';

function getOptional(data) {
    return data || '--';
}

function getIconNameForUri(uri) {
    switch (uri) {
        case uris.NEIGHBOR_CURRENT_CITY_URI:
            return 'map-marker';
        case uris.NEIGHBOR_CONTACT_INFO_URI:
            return 'address-book';
        case uris.MESSENGER_NAME_URI:
            return 'envelope';
        case uris.MESSENGER_EMAIL_URI:
            return 'commenting';
        case uris.DATE_RECORDED_URI:
            return 'clock-o';
        default:
            return null;
    }
}

function renderIcon(uri) {
    const iconName = getIconNameForUri(uri);
    if (iconName) {
        return <i className={`fa fa-${iconName}`} />;
    } else {
        return null;
    }
}

// TO DO: fix href
function renderSearchResultHeader(neighbor) {
    return <div className='search-result-header'>
        <a className='is-size-5' href='/login'>{neighbor[uris.NEIGHBOR_NAME_URI]}</a>
        <div>
            {renderIcon(uris.DATE_RECORDED_URI)}
            <span> Recorded {getOptional(neighbor[uris.DATE_RECORDED_URI])}</span>
        </div>
    </div>;
}

function renderSearchResultItem(uri, neighbor) {
    return <div className='column'>
        {renderIcon(uri)}
        <span className='has-text-weight-bold'> {uri}</span>
        <p>{getOptional(neighbor[uri])}</p>
    </div>;
}

function renderSearchResult(neighbor) {
    return <div className='search-result'>
        {renderSearchResultHeader(neighbor)}
        <div className='columns'>
            {renderSearchResultItem(uris.NEIGHBOR_CURRENT_CITY_URI, neighbor)}
            {renderSearchResultItem(uris.NEIGHBOR_CONTACT_INFO_URI, neighbor)}
            {renderSearchResultItem(uris.MESSENGER_NAME_URI, neighbor)}
            {renderSearchResultItem(uris.MESSENGER_EMAIL_URI, neighbor)}
        </div>
    </div>;
}

export default function SearchResults({neighbors}) {
    return <div className='search-results'>
        {neighbors.map(n => renderSearchResult(n))}
    </div>;
}

SearchResults.propTypes = {
    neighbors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
