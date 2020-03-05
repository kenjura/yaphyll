import { get, post } from '../helper/api';

export { createThread, getThreads };

async function createThread(body) {
	const url = '/api/thread';
	const res = await post(url, body);
	return res;
}

// async function getForum({ forumId }) {
// 	const url = `/api/forum?forumId=${forumId}`;
// 	const forum = await get(url);
// 	return forum[0];
// }

async function getThreads({ forumId }) {
	const url = `/api/thread?forumId=${forumId}`;
	const forums = await get(url);
	return forums;
}