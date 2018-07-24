import React from 'react';

export default function SearchResults({neighbors}) {
	return <div className='search-results'>
        {neighbors.map(n => <p>{n[0].value}</p>)}
	</div>;
}
