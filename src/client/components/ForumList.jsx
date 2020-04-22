import DateDisplay from './DateDisplay';
import React from 'react';

import './ForumList.scss';

import { getForums, getMetadata } from '../model/forum';
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
					{/*<div className="forum-title">{forum.title} d({forum.depth}) fid({forum.forumId}) pid({forum.parentForumId}) tree({forum.pidTree})</div>*/}
					<div className="forum-title">{forum.title}</div>
					<div className="forum-metadata">
						{forum.count} posts
						{forum.latest ? ', latest ' : ''}
						<DateDisplay date={forum.latest} ignoreInvalid={true} />
					</div>
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
		const [ forums, metadata ] = await Promise.all([ getForums(), getMetadata() ]);
		forums.forEach(forum => {
			const { count=0, latest=null } = metadata.find(f => f.forumId === forum.forumId) || {};
			// if (md) {
				forum.count = count;
				forum.latest = latest;
			// }
		})
		this.setState({ forums, loading:false });
	}

	render() {
		const { forums, loading } = this.state;
		if (loading) return <TempLoadingIndicator />;
		else return <ForumList forums={forums} />
	}
}