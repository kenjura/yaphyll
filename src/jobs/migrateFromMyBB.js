require('dotenv').config({ path:'/etc/yaphyll.env' });

const mysql = require('mysql');
const Forum = require('../api/model/Forum');
const Post = require('../api/model/Post');
const Thread = require('../api/model/Thread');


// MYSQL connection info
const MYSQL_HOST = '127.0.0.1'
const MYSQL_PORT = 33306;
const MYSQL_USER = 'dev'
const MYSQL_PASS = 'dev'
const MYSQL_DB = 'dev'

start();

async function start() {
  if (process.argv.includes('--removeAll') || process.argv.includes('--removeOnly')) {
    const forums = await Forum.deleteMany({}).exec();
    const threads = await Thread.deleteMany({}).exec();
    const posts = await Post.deleteMany({}).exec();
    console.log(`removed ${forums.deletedCount} forums, ${threads.deletedCount} threads, and ${posts.deletedCount} posts.`);
    if (process.argv.includes('--removeOnly')) process.exit();
  }

	const mysqlForums = await getForumsFromMyBB();
  const mongoForums = convertForumsToMongo(mysqlForums);
  console.log(`found ${mongoForums.length} forums`);

  const mysqlThreads = await getThreadsFromMyBB();
  const mongoThreads = convertThreadsToMongo(mysqlThreads);
  console.log(`found ${mongoThreads.length} threads`);

  const mysqlPosts = await getPostsFromMyBB();
  const mongoPosts = convertPostsToMongo(mysqlPosts);
  console.log(`found ${mongoPosts.length} posts`);

  if (process.argv.includes('--dry')) {
    console.log({ mongoForums, mongoThreads, mongoPosts });
    process.exit();
  }
  // console.log(mongoPosts);

  const insertedForums = await Forum.insertMany(mongoForums, { rawResult:false });
  console.log(`inserted ${insertedForums.length} forums`);

  const insertedThreads = await Thread.insertMany(mongoThreads, { rawResult:false });
  console.log(`inserted ${insertedThreads.length} threads`);

  const insertedPosts = await Post.insertMany(mongoPosts, { rawResult:false });
  console.log(`inserted ${insertedPosts.length} posts`);

  console.log('done!');
  process.exit();
}

/*
## Forum
mongo field   | mysql col
------------- | ---------
createdBy     |
forumId       | fid
title         | name
parentForumId | pid
displayOrder  | disporder

## Thread
mongo field   | mysql col
------------- | ---------
createdBy     | username
threadId      | tid
title         | subject
forumId       | fid
createdAt     | dateline

## Post
mongo field   | mysql col
------------- | ---------
createdBy     | username
postId        | pid
threadId      | tid
body          | message
createdAt     | dateline
*/

async function getForumsFromMyBB() {
    const query = `SELECT * FROM mybb_forums ORDER BY parentlist, disporder`;
    return await executeMysqlQuery(query);
}

function convertForumsToMongo(forums) {
  return forums.map(forum => ({
    createdBy: 'system',
    forumId: forum.fid,
    title: forum.name,
    parentForumId: forum.pid,
    displayOrder: forum.disporder,
  })).sort((a,b) => a.forumId - b.forumId);
}

async function getThreadsFromMyBB() {
    const query = `SELECT * FROM mybb_threads`;
    return await executeMysqlQuery(query);
}

function convertThreadsToMongo(threads) {
  return threads.map(thread => ({
    createdBy: thread.username,
    threadId: thread.tid,
    title: thread.subject,
    forumId: thread.fid,
    createdAt: new Date(thread.dateline*1000),
  }));
}

async function getPostsFromMyBB() {
    const query = `SELECT * FROM mybb_posts`;
    return await executeMysqlQuery(query);
}

function convertPostsToMongo(posts) {
  return posts.map(post => ({
    createdBy: post.username,
    postId: post.pid,
    threadId: post.tid,
    body: post.message,
    createdAt: new Date(post.dateline*1000),
  }));
}


function executeMysqlQuery(query) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DB,
      port: MYSQL_PORT,
      flags: 'PLUGIN_AUTH',
    });

    connection.connect();

    console.log('sending query...', query);

    connection.query(query, (err, data, fields) => {
      if (err) reject(err);
      resolve(data);
    });

    connection.end();
  });
}
