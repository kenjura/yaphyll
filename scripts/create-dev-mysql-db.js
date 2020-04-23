require('dotenv').config({ path:'/etc/yaphyll.env' });

const Forum = require('../src/api/model/Forum');
const Post = require('../src/api/model/Post');
const Thread = require('../src/api/model/Thread');
const User = require('../src/api/model/User');

start();


async function start() {
  await Post.dropTable({ confirm:'posts' });
  await Thread.dropTable({ confirm:'threads' });
  await Forum.dropTable({ confirm:'forums' });
  await User.dropTable({ confirm:'users' });


  await createUsers();
  await createForums();
  await createThreads();
  await createPosts();

  process.exit();
}

async function createForums() {
  await Forum.createTable();
  await Forum.create({ createdBy:'superman', title:'Justice League public', displayOrder:1, parentForumId:null });
  await Forum.create({ createdBy:'batman', title:'Justice League secret', displayOrder:2, parentForumId:null });
  await Forum.create({ createdBy:'wonderwoman', title:'Customer Feedback', displayOrder:3, parentForumId:1 });
}

async function createThreads() {
  await Thread.createTable();
  await Thread.create({ forumId:1, createdBy:'superman', title:'Welcome to the Justice League forums!' });
  await Thread.create({ forumId:1, createdBy:'superman', title:'Please introduce yourselves' });
  await Thread.create({ forumId:2, createdBy:'batman', title:'Green Lantern: hot or not?' });
  await Thread.create({ forumId:2, createdBy:'batman', title:'The Babel Initiative' });
  await Thread.create({ forumId:3, createdBy:'wonderwoman', title:'Forum Rules' });
}

async function createPosts() {
  await Post.createTable();
  await Post.create({ threadId:1, createdBy:'superman', body:`This is the Justice League's official public forum! Please feel welcome to share your questions, concerns, and feedback, and remember: keep it civil!` });
  await Post.create({ threadId:1, createdBy:'superman', body:`This is the Justice League's official public forum! Please feel welcome to share your questions, concerns, and feedback, and remember: keep it civil!` });
}

async function createUsers() {
  await User.createTable();
  await User.create({ username:'superman', email:'clark.kent@dailyplanet.com' });
  await User.create({ username:'batman', email:'bruce39@aol.com' });
  await User.create({ username:'wonderwoman', email:'princess.d@themyscira.gov' });
  await User.create({ username:'lexluthor', email:'lex@lexcorp.com' });
  await User.create({ username:'midnighttoker', email:'afleck@compuserve.net' });
}

