package com.example.bookManagement.mapper

import com.example.bookManagement.entity.BookForm
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param

@Mapper
interface ImageMapper {
    @Insert("INSERT INTO images(image,book_id) " +
                    "VALUES(#{image}, #{bookId})")
    fun insertImage(@Param("bookId") bookId: Int, @Param("image") images: String)
}