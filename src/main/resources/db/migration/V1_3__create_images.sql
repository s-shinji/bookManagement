CREATE TABLE IF NOT EXISTS images (
    id int NOT NULL AUTO_INCREMENT,
    image mediumblob NOT NULL,
    book_id int NOT NULL,
    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
)