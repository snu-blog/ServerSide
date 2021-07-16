CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	--- fullname, nickname, password, email, image
	full_name VARCHAR(200) NOT NULL,
	password VARCHAR(100) NOT NULL,
	nickname VARCHAR(100) NOT NULL,
	UNIQUE(nickname)
	image_url TEXT UNIQUE,
	email varchar(255) UNIQUE NOT NULL,
	email_verified BOOLEAN DEFAULT FALSE,
	verification_email_sent BOOLEAN DEFAULT FALSE,
	-- created_at, updated_at
	date_created DATE NOT NULL,
	last_login DATE NOT NULL,
	--- Bio & contactInfo
	bio TEXT,
	user_location TEXT,
	user_website TEXT,
	user_twitter TEXT,
	user_linkedIn TEXT, 
	user_instagram TEXT,
	user_github TEXT,
	user_phoneNo varchar(13),
);

CREATE TABLE posts (
	pid SERIAL PRIMARY KEY,
	broad_category VARCHAR NOT NULL,
	title VARCHAR NOT NULL,
	body VARCHAR NOT NULL,
	user_id INT NOT NULL REFERENCES users(uid),
	nickname VARCHAR(100) NOT NULL REFERENCES users(nickname),
	image_url TEXT REFERENCES users(image_url),
	user_email VARCHAR NOT NULL REFERENCES users(email),
	date_created TIMESTAMP,
	like_user_id INT[] DEFAULT ARRAY[]::INT[],
	likes INT default 0
);

CREATE TABLE comments (
	cid SERIAL PRIMARY KEY,
	comment VARCHAR,
	nickname VARCHAR(100) NOT NULL REFERENCES users(nickname),
	user_id INT REFERENCES users(uid),
	image_url TEXT REFERENCES users(image_url),
	post_id INT REFERENCES posts(pid),
	date_created TIMESTAMP
);


--Alter Sequence
ALTER SEQUENCE users_uid_seq RESTART WITH 10;