CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	user_name VARCHAR(200) NOT NULL,
	password VARCHAR(100) NOT NULL,
	image_url TEXT UNIQUE,
	email varchar(255) UNIQUE NOT NULL,
	email_verified BOOLEAN DEFAULT FALSE,
	verification_email_sent BOOLEAN DEFAULT FALSE,
	date_created DATE NOT NULL,
	last_login DATE NOT NULL
);

CREATE TABLE posts (
	pid SERIAL PRIMARY KEY,
	broad_category VARCHAR NOT NULL,
	title VARCHAR NOT NULL,
	body VARCHAR NOT NULL,
	user_id INT NOT NULL REFERENCES users(uid),
	user_name VARCHAR(200) NOT NULL,
	image_url TEXT REFERENCES users(image_url),
	user_email VARCHAR NOT NULL REFERENCES users(email),
	date_created TIMESTAMP,
	like_user_id INT[] DEFAULT ARRAY[]::INT[],
	likes INT default 0 
);

CREATE TABLE comments (
	cid SERIAL PRIMARY KEY,
	comment VARCHAR,
	author VARCHAR REFERENCES users(email),
	user_id INT REFERENCES users(uid),
	user_name VARCHAR(200) NOT NULL,
	image_url TEXT REFERENCES users(image_url),
	post_id INT REFERENCES posts(pid),
	date_created TIMESTAMP
);


--Alter Sequence
ALTER SEQUENCE users_uid_seq RESTART WITH 10;