export { get, post };

async function get(url) {
	const res = await fetch(url);
	const json = await res.json();
	json.filterCount = res.headers.get('x-filter-count');
	return json;
}

async function post(url, body) {
	const options = {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin', 
		headers: {
	      'Content-Type': 'application/json'
	    },
    	redirect: 'follow', 
    	referrerPolicy: 'no-referrer', 
    	body: typeof(body)==='object' ? JSON.stringify(body) : body,
	}

	const res = await fetch(url, options);
	const json = await res.json();
	return json;
}
