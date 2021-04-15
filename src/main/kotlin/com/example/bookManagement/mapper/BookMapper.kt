package com.example.bookManagement.mapper

import com.example.bookManagement.entity.BookDetail
import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.entity.Books
import org.apache.ibatis.annotations.*

@Mapper
interface BookMapper {
    @Insert("INSERT INTO books(title, author, type, user_id)" +
                    "VALUES(#{title}, #{author}, #{type}, #{userId})")
    //keyPropertyを用いることでbookFormのid変数にauto_incrementしたidがセットされる
    @Options(useGeneratedKeys = true, keyProperty = "id")
    fun insertBook(bookForm: BookForm)

    @Select("SELECT books.id, title, author, type, user_id, image FROM books " +
                    "INNER JOIN images ON books.id = images.book_id " +
                    "WHERE books.user_id = #{userId}")
    fun getBooks(userId: Int): List<Books>

    @Select("SELECT books.id, title, author, books.user_id, image, reviewPoint, reviewSentence ,reviews.book_id FROM books " +
                    "INNER JOIN images  ON books.id = images.book_id " +
                    "INNER JOIN reviews ON books.id = reviews.id " +
                    "WHERE books.user_id = #{userId} AND books.id = #{bookId}")
    fun getBook(@Param("userId") userId: Int, @Param("bookId") bookId: Int): BookDetail
}
