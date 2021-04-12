package com.example.bookManagement.mapper

import com.example.bookManagement.entity.Book
import com.example.bookManagement.entity.BookForm
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Select

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
    fun getBooks(userId: Int): List<Book>
}