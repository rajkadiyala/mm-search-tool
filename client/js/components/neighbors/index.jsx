import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getNeighbors} from '../../store';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';

function mapStateToProps(state) {
    return {neighbors: state.neighbors.neighbors};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getNeighbors}, dispatch);
}

class Neighbors extends React.Component {

    componentDidMount() {
        this.props.getNeighbors();
    }

	render() {
		return <div>
			<SearchBar onChange={null} value={4} />
			<SearchResults neighbors={this.props.neighbors}/>
		</div>;
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Neighbors);
