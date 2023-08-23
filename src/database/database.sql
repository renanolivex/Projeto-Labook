-- Active: 1692662146231@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
)

SELECT * FROM users;


CREATE TABLE posts (
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    creator_id TEXT NOT NULL, 
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')),
    update_at TEXT DEFAULT (DATETIME('now', 'localtime')),
    FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
)

SELECT * FROM posts;

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
)

SELECT * FROM likes_dislikes;

INSERT INTO users(id, name, email, password, role)
VALUES("u001","Renan", "renan@hotmail.com", "asduihas8we","admin" ),
("u002","Julia", "ju@hotmail.com", "asduihas8sadwe","normal" ),
("u003","Luan", "luan@hotmail.com", "aswwss","normal" );


INSERT INTO posts(id, creator_id, content, likes, dislikes)
VALUES("p001","u001", "estou sem tempo!", 5 , 20 ),
("p002","u003", "estou sem tempo!", 1 , 10 ),
("p003","u002", "estou sem tempo!", 50 , 20 );


INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES("u001", "p001",5),
("u003", "p002",1),
("u002", "p003",50);

DROP TABLE users