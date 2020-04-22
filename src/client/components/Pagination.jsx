import React from 'react';

import './Pagination.scss';

export default function Pagination(props) {
	const { currentPage, pageCount, onChange } = props;

	const prevEnabled = currentPage > 1 && pageCount > 1;
	const nextEnabled = currentPage < pageCount && pageCount > 1;
	let pageButtons = [];
	for (let i = 1; i <= pageCount; i++) {
		pageButtons.push(<div className="page" key={i} active={String(i === currentPage)} onClick={evt => onChange(i)}>{i}</div>);
	}

	return <div className="pagination">
		<div className="page" enabled={prevEnabled.toString()} onClick={evt => onChange(currentPage-1)}>prev</div>
		{pageButtons}
		<div className="page" enabled={nextEnabled.toString()} onClick={evt => onChange(currentPage+1)}>next</div>
	</div>
}