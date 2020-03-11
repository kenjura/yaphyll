import React from 'react';

import './ForumList.scss';

import { getForums } from '../model/forum';
import { Link } from 'react-router-dom';

const TempLoadingIndicator = props => <div>loading...</div>;

export default function ForumList(props) {
	const { forums } = props;

	return <div id="forum-list">
		ForumList:
		{forums
			.map(forum => <Link to={`/forum/${forum.forumId}`} key={forum.forumId}>
				<div className="forum">
					<div className="forum-title">{forum.title}</div>
					{/*<div className="forum-children">{forum.childForums.map(f => f.title).join(',')}</div>*/}
				</div>
			</Link>)
			
		}
	</div>
}


export class ForumListLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forums: [],
			loading: true,
		}
	}

	componentDidMount() {
		this.load();
	}

	async load() {
		this.setState({ forums:[], loading:true });
		const forums = await getForums();
		this.setState({ forums, loading:false });
	}

	render() {
		const { forums, loading } = this.state;
		if (loading) return <TempLoadingIndicator />;
		else return <ForumList forums={forums} />
	}
}