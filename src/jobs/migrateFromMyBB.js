require('dotenv').config({ path:'/etc/yaphyll.env' });

const mysql = require('mysql2');
const Forum = require('../api/model/Forum');
const Post = require('../api/model/Post');
const Thread = require('../api/model/Thread');
const User = require('../api/model/User');

const { getConnection } = require('../api/helper/sqlConnection');

// MYSQL connection info
const SOURCE_HOST = '127.0.0.1'
const SOURCE_PORT = 33306;
const SOURCE_USER = 'dev'
const SOURCE_PASS = 'dev'
const SOURCE_DB = 'dev'

let sourceConnection;

start();

async function start() {
  await getSourceConnection();

  if (process.argv.includes('--removeAll') || process.argv.includes('--removeOnly')) {
    await Post.dropTable({ confirm:'posts' });
    await Thread.dropTable({ confirm:'threads' });
    await Forum.dropTable({ confirm:'forums' });
    await User.dropTable({ confirm:'users' });
    console.log('dropped dest tables');
    await User.createTable();
    await Forum.createTable();
    await Thread.createTable();
    await Post.createTable();
    console.log('recreated dest tables');
    if (process.argv.includes('--removeOnly')) process.exit();
  }

  const sourceUsers = await getUsersFromSource();
  const destUsers = convertUsers(sourceUsers);
  console.log(`found ${sourceUsers.length} users`);

	const sourceForums = await getForumsFromSource();
  const destForums = convertForums(sourceForums);
  console.log(`found ${sourceForums.length} forums`);

  const sourceThreads = await getThreadsFromSource();
  const destThreads = convertThreads(sourceThreads);
  console.log(`found ${sourceThreads.length} threads`);

  const sourcePosts = await getPostsFromSource();
  const destPosts = convertPosts(sourcePosts);
  console.log(`found ${sourcePosts.length} posts`);

  if (process.argv.includes('--dry')) {
    console.log({ destForums, destThreads, destPosts });
    process.exit();
  }
  // console.log(mongoPosts);

  const insertedUsers = await User.createMany(destUsers);
  console.log(`inserted ${insertedUsers} users`);

  const insertedForums = await Forum.createMany(destForums);
  console.log(`inserted ${insertedForums} forums`);

  const insertedThreads = await Thread.createMany(destThreads);
  console.log(`inserted ${insertedThreads} threads`);

  const insertedPosts = await Post.createMany(destPosts);
  console.log(`inserted ${insertedPosts} posts`);

  console.log('done!');
  process.exit();
}

/*
## User
dest field    | mysql col
------------- | ---------
username      | username
email         | email
createdAt     | regdate * 1000


## Forum
dest field    | mysql col
------------- | ---------
createdBy     |
forumId       | fid
title         | name
parentForumId | pid
displayOrder  | disporder

## Thread
dest field    | mysql col
------------- | ---------
createdBy     | username
threadId      | tid
title         | subject
forumId       | fid
createdAt     | dateline

## Post
dest field    | mysql col
------------- | ---------
createdBy     | username
postId        | pid
threadId      | tid
body          | message
createdAt     | dateline
*/

async function getUsersFromSource() {
    const query = `SELECT * FROM mybb_users`;
    const [ rows, fields ] = await sourceConnection.execute(query);
    return rows;
}

function convertUsers(users) {
  return users.map(user => ({
    username: user.username,
    email: user.email,
    createdAt: new Date(user.regdate*1000),
  }));
}

async function getForumsFromSource() {
    const query = `SELECT * FROM mybb_forums`;
    const [ rows, fields ] = await sourceConnection.execute(query);
    return rows;
}

function convertForums(forums) {
  return forums.map(forum => ({
    createdBy: 'system',
    forumId: forum.fid,
    title: forum.name,
    parentForumId: forum.pid,
    displayOrder: forum.disporder,
  })).sort((a,b) => a.forumId - b.forumId);
}

async function getThreadsFromSource() {
    const query = `SELECT * FROM mybb_threads`;
    const [ rows, fields ] = await sourceConnection.execute(query);
    return rows;
}

function convertThreads(threads) {
  return threads.map(thread => ({
    createdBy: thread.username,
    threadId: thread.tid,
    title: thread.subject,
    forumId: thread.fid,
    createdAt: new Date(thread.dateline*1000),
  }));
}

async function getPostsFromSource() {
    const query = `SELECT * FROM mybb_posts`;
    const [ rows, fields ] = await sourceConnection.execute(query);
    return rows;
}

function convertPosts(posts) {
  return posts.map(post => ({
    createdBy: post.username,
    postId: post.pid,
    threadId: post.tid,
    body: post.message,
    createdAt: new Date(post.dateline*1000),
  }));
}

async function getSourceConnection() {
  sourceConnection = await getConnection({
    host: SOURCE_HOST,
    port: SOURCE_PORT,
    user: SOURCE_USER,
    password: SOURCE_PASS,
    database: SOURCE_DB,
  });
}

