import NavMain from './components/NavMain';
import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { ForumListLoader } from './components/ForumList';

import ForumDetailLoader from './components/ForumDetailLoader';
import ThreadDetailLoader from './components/ThreadDetailLoader';

import './App.scss';
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

const Home = () => <h2>Home Page TBI</h2>;
const NotImplemented = () => <h2>Not Yet Implemented</h2>;
const ForumList = () => <h2>Forum List Page</h2>;
const Forum = () => <h2>Forum Detail Page</h2>;
const Thread = () => <h2>Thread Detail Page</h2>;
// const DbRoot = props => <ArticleView ...Object.assign({}, props, { match: { params: { path:'_home' }}}) />
// const DbRoot = props => <ArticleView {...props} />

const AppRouter = () => (
  <Router>
    <div id="router-child">
		<Route component={NavMain} />

		<Route path="/" exact component={ForumListLoader} />
		<Route exact path="/forum/:forumId" render={props => <ForumDetailLoader key={props.match.params.forumId+'-'+props.location.search } {...props} />} />
		<Route exact path="/forum/:forumId/thread/:threadId" render={props => <ThreadDetailLoader {...props} />} />

    </div>
  </Router>
);

export default AppRouter;

