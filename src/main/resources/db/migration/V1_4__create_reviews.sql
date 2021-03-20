CREATE TABLE IF NOT EXISTS reviews (
    id int NOT NULL AUTO_INCREMENT,
    review VARCHAR(500) NOT NULL,
    book_id int NOT NULL,
    user_id int NOT NULL,

    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
)