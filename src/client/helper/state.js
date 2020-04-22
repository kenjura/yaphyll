import queryString from 'query-string';

export { getParameter, setParameter };

const DEFAULTS = {
	page: 1,
	pageSize: 50,
}

function getParameter(key) {
	let qs = queryString.parse(location.search)	;
	return qs[key] || DEFAULTS[key];
}

function setParameter(key, val) {
	let qs = queryString.parse(location.search);
	qs[key] = val;
	// console.log('updating search string...', queryString.stringify(qs));
	location.search = queryString.stringify(qs);	
}