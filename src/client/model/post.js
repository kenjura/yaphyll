import { get, post } from '../helper/api';

export { createPost };

async function createPost(payload={}) {
	if (!payload.threadId) throw new Error('post > createPost > required parameter "threadId" not found.');
	if (!payload.body) throw new Error('post > createPost > required parameter "body" not found.');
	const url = '/api/post';
	const res = await post(url, payload);
	return res;
}