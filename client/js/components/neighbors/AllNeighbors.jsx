import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getNeighbors} from '../../store';
import NeighborsTable from './NeighborsTable';
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

const SEARCH_WORKFLOW = 'SEARCH';
const VIEW_ALL_CASES_WORKFLOW = 'VIEW_ALL_CASES';

class Neighbors extends React.Component {

    static SHOW_NEIGHBORS_TABLE_LINK = false;

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            workflow: SEARCH_WORKFLOW,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeWorkflow = this.handleChangeWorkflow.bind(this);
    }

    componentDidMount() {
        this.props.getNeighbors();
    }

    render() {
        if (this.state.workflow === VIEW_ALL_CASES_WORKFLOW) {
            return <NeighborsTable neighbors={this.props.neighbors} />;
        } else {
            return this.renderSearch();
        }
    }

    renderSearch() {
        return <div className='search'>
            <div className='search-bar-container'>
                {this.renderLink(VIEW_ALL_CASES_WORKFLOW)}
                <SearchBar
                    value={this.state.searchInput}
                    onChange={this.handleSearch}
                />
            </div>
            <SearchResults neighbors={this.getNeighbors()} />
        </div>;
    }

    renderLink(workflow) {
        if (Neighbors.SHOW_NEIGHBORS_TABLE_LINK) {
            const iconName = workflow === VIEW_ALL_CASES_WORKFLOW
                ? 'list-alt' : 'clock-o';
            const text = workflow === VIEW_ALL_CASES_WORKFLOW
                ? 'View all cases' : 'Search for case by client name';
            return <a
                className='all-cases-link'
                href='#'
                data-workflow={workflow}
                onClick={this.handleChangeWorkflow}
            >
                <i className={`fa fa-${iconName}`} />
                <span> {text}</span>
            </a>;
        } else {
            return null;
        }
    }

    handleSearch(event) {
        this.setState({
            searchInput: event.currentTarget.value,
        });
    }

    handleChangeWorkflow(event) {
        const workflow = event.currentTarget.getAttribute('data-workflow');
        this.setState({workflow});
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
