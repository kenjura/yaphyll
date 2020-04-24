import { get, post } from '../helper/api';
import { getParameter } from '../helper/state';

export { createThread, getThreadMetadata, getThread, getThreads };

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
	const thread = (await get(`/api/thread/${threadId}`));
	const posts = await get(`/api/post?threadId=${threadId}`);
	const ret = Object.assign({}, thread, { posts });
	return ret;
}

async function getThreads({ forumId }) {
	const page = getParameter('page');
	const pageSize = getParameter('pageSize');
	const offset = (page-1) * pageSize;
	const url = `/api/thread?forumId=${forumId}&limit=50${offset?`&offset=${offset}`:''}&sort=-createdAt`;
	const forums = await get(url);
	return forums;
}

async function getThreadMetadata({ forumId }) {
	const url = `/api/metadata/posts-per-thread/${forumId}`;
	const md = await get(url);
	return md;
}