package com.example.bookManagement.mapper

import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.entity.Reviews
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.Select

@Mapper
interface ReviewMapper {
    @Insert("INSERT INTO reviews(reviewPoint, reviewSentence, book_id, user_id) " +
                    "VALUES(#{reviewPoint}, #{reviewSentence}, #{bookId}, #{userId})")
    fun insertReview(@Param("reviewPoint") reviewPoint: Double,
                     @Param("reviewSentence") reviewSentence: String?,
                     @Param("bookId") bookId: Int?,
                     @Param("userId") userId: Int?
                    )
    @Select("SELECT reviewPoint, reviewSentence, user_id FROM reviews " +
                    "WHERE user_id != #{userId} AND book_id = #{bookId}")
    fun getReviews(userId: Int, bookId: Int): List<Reviews>
}