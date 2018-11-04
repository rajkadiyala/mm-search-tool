import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {getNeighbor} from '../../store';
import * as uris from './uris';

function isValid(neighborId) {
    return neighborId && Number.isInteger(parseInt(neighborId, 10));
}

function mapStateToProps(state) {
    return {neighbor: state.neighbors.selectedNeighbor};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getNeighbor}, dispatch);
}

function isLink(uri, neighbor) {
    return (uri === uris.LINK_TO_MM_VIDEO_URI
        || uri === uris.FACEBOOK_LINK_URI)
        && neighbor[uri] !== '--';
}

function renderInfo(uri, neighbor) {
    const value = isLink(uri, neighbor)
        ? <a href={neighbor[uri]}>{neighbor[uri]}</a>
        : neighbor[uri];
    return <div className='neighbor-info-item' key={uri}>
        <b>{uri}</b>: {value}
    </div>;
}

function renderSearchLink() {
    return <NavLink to='/neighbors'>
        &larr; Return to search
    </NavLink>;
}

class SingleNeighbor extends React.Component {

    componentDidMount() {
        const neighborId = this.props.match.params.id;
        if (isValid(neighborId)) {
            this.props.getNeighbor(neighborId);
        }
    }

    render() {
        const {neighbor} = this.props;
        if (neighbor) {
            return <div className='single-neighbor'>
                {renderSearchLink()}
                {this.renderContent()}
            </div>;
        } else {
            return 'Neighbor not found';
        }
    }

    renderContent() {
        return <div>
            {this.renderGroupedInfo(
                'Client Information',
                uris.NEIGHBOR_NAME_URI,
                uris.NEIGHBOR_CURRENT_CITY_URI,
                uris.NEIGHBOR_CONTACT_INFO_URI,
                uris.LINK_TO_MM_VIDEO_URI,
            )}
            {this.renderGroupedInfo(
                'Loved One Information',
                uris.LOVED_ONE_NAME_URI,
                uris.LOVED_ONE_APPROXIMATE_AGE_URI,
                uris.LOVED_ONE_LAST_KNOWN_LOCATION_URI,
                uris.LOVED_ONE_RELATIONSHIP,
            )}
            {this.renderGroupedInfo(
                'Messenger Information',
                uris.DATE_RECORDED_URI,
                uris.MESSENGER_NAME_URI,
                uris.MESSENGER_EMAIL_URI,
                uris.CASE_NOTES_URI,
            )}
            {this.renderGroupedInfo(
                'Case Status',
                uris.FACEBOOK_LINK_URI,
                uris.DELIVERY_STATUS_URI,
                uris.REUNION_STATUS_URI,
            )}
        </div>;
    }

    renderGroupedInfo(title, ...urisForGroup) {
        return <div className='neighbor-info-group'>
            <h2 className='neighbor-info-group-title'>{title}</h2>
            {urisForGroup.map(u => renderInfo(u, this.props.neighbor))}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNeighbor);

SingleNeighbor.propTypes = {
    neighbor: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    getNeighbor: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({id: PropTypes.string.isRequired}),
    }),
};
