import React from 'react';
import PropTypes from 'prop-types';

// TO DO: fix href
export default function SearchBar({
    value,
    onChange,
}) {
    return <div className='search-bar-container'>
        <a className='all-cases-link' href='/neighbors'>
            <i className='fa fa-list-alt' />
            <span> View all cases</span>
        </a>
        <div className='control has-icons-left'>
            <input
                className='input is-large search-bar'
                type='text'
                value={value}
                placeholder='Search by name'
                onChange={onChange}
            />
            <span className='icon is-left'>
                <i className='fa fa-search' />
            </span>
        </div>
    </div>;
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
