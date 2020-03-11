import LoadingIndicator from './LoadingIndicator';
import React from 'react';
import ThreadDetail from './ThreadDetail';

import { getThread } from '../model/thread';

export default class ThreadDetailLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			thread: {},
		}
	}

	componentDidMount() {
		const { threadId } = this.props.match.params;
		this.load({ threadId });
	}

	async load({ threadId }) {
		this.setState({ thread:{}, loading: true });
		const thread = await getThread({ threadId });
		this.setState({ thread, loading:false });
	}

	render() {
		const { thread, loading } = this.state;

		if (loading) return <LoadingIndicator />;
		else return <ThreadDetail {...thread} />
	}
}