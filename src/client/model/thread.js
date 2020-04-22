import { get, post } from '../helper/api';
import { getParameter } from '../helper/state';

export { createThread, getThread, getThreads };

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

async function getThread({ threadId }) {
	// const url = `/api/thread?threadId=${threadId}`;
	const thread = (await get(`/api/thread?threadId=${threadId}`))[0];
	const posts = await get(`/api/post?threadId=${threadId}`);
	const ret = Object.assign({}, thread, { posts });
	return ret;
}

async function getThreads({ forumId }) {
	const page = getParameter('page');
	const pageSize = getParameter('pageSize');
	const offset = (page-1) * pageSize;
	const url = `/api/thread?forumId=${forumId}&offset=${offset}`;
	const forums = await get(url);
	return forums;
}