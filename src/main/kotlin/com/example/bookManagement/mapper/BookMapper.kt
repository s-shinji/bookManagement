package com.example.bookManagement.mapper

import com.example.bookManagement.entity.BookForm
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Options

@Mapper
interface BookMapper {
    @Insert("INSERT INTO books(title, author, type, user_id)" +
                    "VALUES(#{title}, #{author}, #{type}, #{userId})")
    @Options(useGeneratedKeys = true)
    fun insertBook(bookForm: BookForm): Int
}