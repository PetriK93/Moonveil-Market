ALTER TABLE users DROP COLUMN salt;

INSERT INTO users (username, email, password) VALUES
    ('test1', 'test1.email@outlook.com', 'password1'),
    ('test2', 'test2.email@outlook.com', 'password2');

    SELECT * FROM users;SELECT * FROM users;