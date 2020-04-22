import React from 'react';

import './ForumList.scss';

import { getForums } from '../model/forum';
import { Link } from 'react-router-dom';
import { sortByScore } from '../helper/score';

const TempLoadingIndicator = props => <div>loading...</div>;

export default function ForumList(props) {
	const { forums } = props;

	const sortedForums = sortByScore(forums, forum => (forum.pidTree||'').split(','))
	return <div id="forum-list">
		ForumList:
		{sortedForums
			.map(forum => <Link to={`/forum/${forum.forumId}`} key={forum.forumId}>
				<div className="forum" depth={forum.depth}>
					<div className="forum-title">{forum.title} d({forum.depth}) fid({forum.forumId}) pid({forum.parentForumId}) tree({forum.pidTree})</div>
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