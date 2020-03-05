import { createThread } from '../model/thread';

export default async function({ createdBy, forumId, title }={}) {
	const res = await createThread({ createdBy, forumId, title });
	window.location.reload(); // TODO: replace with something more abstract, or at least a react-router call
}