CREATE TABLE IF NOT EXISTS books (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    user_id int NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
)