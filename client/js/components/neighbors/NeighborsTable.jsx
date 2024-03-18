import React from 'react';
import PropTypes from 'prop-types';

import * as uris from './uris';

const ORDERED_URIS = [
    uris.NEIGHBOR_NAME_URI,
    uris.NEIGHBOR_CURRENT_CITY_URI,
    uris.NEIGHBOR_CONTACT_INFO_URI,
    uris.DATE_RECORDED_URI,
    uris.LOVED_ONE_NAME_URI,
    uris.LOVED_ONE_APPROXIMATE_AGE_URI,
    uris.LOVED_ONE_LAST_KNOWN_LOCATION_URI,
    uris.MESSENGER_NAME_URI,
    uris.MESSENGER_EMAIL_URI,
    uris.CASE_NOTES_URI,
];

const CHUNK_SIZE_LIMIT = 20;

function getChunks(neighbors) {
    const chunks = [];
    let chunkedCount = 0;
    while (chunkedCount < neighbors.length) {
        const chunk = neighbors.slice(chunkedCount, chunkedCount + CHUNK_SIZE_LIMIT);
        chunks.push(chunk);
        chunkedCount += chunk.length;
    }
    return chunks;
}

function renderTableHeader() {
    return <thead>
        <tr>
            {ORDERED_URIS.map(uri => <th>{uri}</th>)}
        </tr>
    </thead>;
}

function renderTableDataRow(neighbor) {
    return <tr>
        {ORDERED_URIS.map(uri => <td>{neighbor[uri]}</td>)}
    </tr>;
}

function renderTableBody(neighbors) {
    if (neighbors) {
        return <tbody>
            {neighbors.map(renderTableDataRow)}
        </tbody>;
    } else {
        return null;
    }
}

export default class NeighborsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            neighbors: getChunks(props.neighbors),
            currentChunk: 0,
        };
        this.handleNavigateToPage = this.handleNavigateToPage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.neighbors !== this.props.neighbors) {
            this.setNeighbors(this.props.neighbors);
        }
    }

    render() {
        return <div>
            {this.renderPagination()}
            <table
                className='table neighbors-table is-narrow is-fullwidth is-striped'
            >
                {renderTableHeader()}
                {renderTableBody(this.state.neighbors[this.state.currentChunk])}
            </table>
        </div>;
    }

    renderPagination() {
        return <nav
            className='pagination'
            aria-label='pagination'
        >
            <a
                className='pagination-previous'
                data-page={this.state.currentChunk - 1}
                onClick={this.handleNavigateToPage}
            >
                Previous
            </a>
            <a
                className='pagination-next'
                data-page={this.state.currentChunk + 1}
                onClick={this.handleNavigateToPage}
            >
                Next
            </a>
            <ul>
                {this.renderPageList()}
            </ul>
        </nav>;
    }

    renderPageList() {
        return this.state.neighbors.map((chunk, i) => {
            if (this.shouldDisplayClickable(i)) {
                const isActiveClassName = this.state.currentChunk === i
                    ? ' is-current' : '';
                return <li>
                    <a
                        className={`pagination-link${isActiveClassName}`}
                        data-page={i}
                        onClick={this.handleNavigateToPage}
                    >
                        {i + 1}
                    </a>
                </li>;
            } else {
                return <li>
                    <span className='pagination-ellipsis'>&hellip;</span>
                </li>;
            }
        });
    }

    handleNavigateToPage(event) {
        const page = event.currentTarget.getAttribute('data-page');
        this.setState({currentChunk: +page});
    }

    setNeighbors(neighbors) {
        this.setState({neighbors: getChunks(neighbors)});
    }

    shouldDisplayClickable(index) {
        return index === 0
            || index === this.state.neighbors.length - 1
            || Math.abs(index - this.state.currentChunk) <= 1;
    }

}

NeighborsTable.propTypes = {
    neighbors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
