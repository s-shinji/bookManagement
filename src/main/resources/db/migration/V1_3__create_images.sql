CREATE TABLE IF NOT EXISTS images (
    id int NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    book_id int NOT NULL,

    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
)