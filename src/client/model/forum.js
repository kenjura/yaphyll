import { get, post } from '../helper/api';

export { getChildForums, getForums, getForum };

async function getChildForums({ forumId }) {
	const url = `/api/forum?parentForumId=${forumId}`;
	const forum = await get(url);
	return forum;
}

async function getForum({ forumId }) {
	const url = `/api/forum?forumId=${forumId}`;
	const forum = await get(url);
	return forum[0];
}

async function getForums() {
	const url = '/api/forum';
	const forums = await get(url);
	return forums;
}