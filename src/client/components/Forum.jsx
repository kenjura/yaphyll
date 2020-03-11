import ForumList from './ForumList';
import React from 'react';
import ThreadList from './ThreadList';
import ThreadCreate from './ThreadCreate';

import './ForumList.scss';

import { getChildForums, getForum } from '../model/forum';
import { createThread, getThreads } from '../model/thread';

const TempLoadingIndicator = props => <div>loading...</div>;

export default function Forum(props) {
	const { forum={} } = props;
	const { threads=[] } = forum;

	return <div id="forum">
		<h2>{forum.title}</h2>

		<div className="child-forums-list">
			<ForumList forums={forum.childForums} />
		</div>

		<div className="thread-list">
			<ThreadList threads={threads} />
		</div>

		<div className="thread-create">
			<ThreadCreate forumId={forum.forumId} />
		</div>
	</div>
}


export class ForumLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forum: null,
			loading: true,
		};
	}

	componentDidMount() {
		const { forumId } = this.props.match.params;
		this.load({ forumId });
	}

	async load({ forumId }={}) {
		this.setState({ forum:null, loading:true });
		const [ forum, childForums, threads ] = await Promise.all([
			getForum({ forumId }),
			getChildForums({ forumId }),
			getThreads({ forumId }),
		]);
		forum.childForums = childForums;
		forum.threads = threads;
		this.setState({ forum, loading:false });
	}

	render() {
		const { forum, loading } = this.state;
		if (loading) return <TempLoadingIndicator />;
		else return <Forum key={forum.forumId} forum={forum} />
	}
}