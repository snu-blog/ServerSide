CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	first_name varchar(100),
	last_name varchar(100),
	email varchar(255) UNIQUE,
	email_verified BOOLEAN,
	date_created date,
	last_login DATE
);

CREATE TABLE posts (
	pid SERIAL PRIMARY KEY,
	title VARCHAR(500),
	body VARCHAR,
	user_id INT REFERENCES users(uid),
	author VARCHAR REFERENCES users(email),
	date_created TIMESTAMP,
	like_user_id INT[] DEFAULT ARRAY[]::INT[],
	likes INT default 0 
);

CREATE TABLE comments (
	cid SERIAL PRIMARY KEY,
	comment VARCHAR,
	author VARCHAR REFERENCES users(email),
	user_id INT REFERENCES users(uid),
	post_id INT REFERENCES posts(pid),
	date_created TIMESTAMP
);


