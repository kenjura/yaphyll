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

function getState() {
	let qs = queryString.parse(location.search);
	return qs;
}

function setParameter(key, val) {
	let qs = queryString.parse(location.search);
	qs[key] = val;

	const search = queryString.stringify(qs);	
	const newLocation = Object.assign({}, location, { search });
	
	return newLocation;
}