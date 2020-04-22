export { getParameter, setParameter };

const DEFAULTS = {
	page: 1,
	pageSize: 50,
}

function getParameter(key) {
	let searchParams = new URLSearchParams(location.search);
	return searchParams.get(key) || DEFAULTS[key];
}

function getState() {
	let searchParams = new URLSearchParams(location.search);;
	return searchParams;
}

function setParameter(key, val) {
	// changes a search param and returns the new string
	// use history.push({ search }) from useHistory (react-router-dom) to implement location change 

	let searchParams = new URLSearchParams(location.search);
	searchParams.set(key, val);

	return searchParams.toString();
}