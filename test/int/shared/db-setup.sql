USE yaphyll_test;

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
	username varchar(255) primary key,
	email varchar(255) not null,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forums(
	forumId int auto_increment primary key,
	createdBy varchar(255) not null,
	title varchar(255) not null,
	displayOrder int,
	parentForumId int,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP/*,
	FOREIGN KEY (createdBy)
		REFERENCES users (username)*/
);

CREATE TABLE threads(
	threadId int auto_increment primary key,
	forumId int not null,
	createdBy varchar(255) not null,
	title varchar(255) not null,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	foreign key (forumId)
		references forums (forumId),
	FOREIGN KEY (createdBy)
		REFERENCES users (username)
);

CREATE TABLE posts(
	postId int auto_increment primary key,
	threadId int not null,
	createdBy varchar(255) not null,
	body text,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (threadId)
		REFERENCES threads (threadId),
	FOREIGN KEY (createdBy)
		REFERENCES users (username)
);



INSERT INTO users(username, email) VALUES
  ( 'superman', 'clark.kent@dailyplanet.com' ),
  ( 'batman', 'bruce39@aol.com' ),
  ( 'wonderwoman', 'princess.d@themyscira.gov' ),
  ( 'lexluthor', 'lex@lexcorp.com' ),
  ( 'midnighttoker', 'afleck@compuserve.net' )
;

INSERT INTO forums(createdBy, title, displayOrder, parentForumId) VALUES
  ( 'superman', 'Justice League public', 1, null ),
  ( 'batman', 'Justice League secret', 2, null ),
  ( 'wonderwoman', 'Customer Feedback', 3, 1 )
;

INSERT INTO threads(forumId, createdBy, title) VALUES
  ( 1, 'superman', 'Welcome to the Justice League forums!' ),
  ( 1, 'superman', 'Please introduce yourselves' ),
  ( 2, 'batman', 'Green Lantern: hot or not?' ),
  ( 2, 'batman', 'The Babel Initiative' ),
  ( 3, 'wonderwoman', 'Forum Rules' )
;

INSERT INTO posts(threadId, createdBy, body) VALUES
  ( 1, 'superman', 'This is the Justice League''s official public forum! Please feel welcome to share your questions, concerns, and feedback, and remember: keep it civil!' ),
  ( 1, 'superman', 'This is the Justice League''s official public forum! Please feel welcome to share your questions, concerns, and feedback, and remember: keep it civil!' )
;

