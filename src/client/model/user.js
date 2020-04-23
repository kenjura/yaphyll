import { get } from '../helper/api.js';

export { getUser };

let i = 0;

async function getUser() {
	if (i++ > 10) return console.warn('nope');
	const url = '/api/profile';
	const user = await get(url);
	return user;
}