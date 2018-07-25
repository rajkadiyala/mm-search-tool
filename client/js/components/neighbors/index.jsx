import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getNeighbors} from '../../store';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';
import {NEIGHBOR_NAME_URI} from './uris';

function mapStateToProps(state) {
    return {neighbors: state.neighbors.neighbors};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getNeighbors}, dispatch);
}

const SEARCH_RESULTS_LIMIT = 50;

function limitSearchResults(results) {
    return results.slice(0, SEARCH_RESULTS_LIMIT);
}

function searchByName(neighbors, searchInput) {
    return neighbors.filter(n => {
        return n[NEIGHBOR_NAME_URI].toLowerCase()
            .includes(searchInput.toLowerCase());
    });
}

class Neighbors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.getNeighbors();
    }

    render() {
        return <div className='search'>
            <SearchBar
                value={this.state.searchInput}
                onChange={this.handleSearch}
            />
            <SearchResults neighbors={this.getNeighbors()} />
        </div>;
    }

    handleSearch(event) {
        this.setState({
            searchInput: event.currentTarget.value,
        });
    }

    getNeighbors() {
        const {searchInput} = this.state;
        if (searchInput) {
            return limitSearchResults(
                searchByName(this.props.neighbors, searchInput),
            );
        } else {
            return [];
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Neighbors);

Neighbors.propTypes = {
    neighbors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    getNeighbors: PropTypes.func.isRequired,
};
