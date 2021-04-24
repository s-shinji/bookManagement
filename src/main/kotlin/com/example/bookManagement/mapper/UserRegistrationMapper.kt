package com.example.bookManagement.mapper

import com.example.bookManagement.entity.UserIconForm
import com.example.bookManagement.entity.UserRegistration
import org.apache.ibatis.annotations.*

@Mapper
interface UserRegistrationMapper {
    @Insert("INSERT INTO users(name, email, password, icon) VALUES(#{name}, #{email}, #{password}, #{userIcon})")
    fun registerUser(regUserInfo: UserRegistration);

    @Select("SELECT name FROM users WHERE name = #{name}")
    fun findByName(name: String): String?;

    @Select("SELECT email FROM users WHERE email = #{email}")
    fun findByEmail(email: String): String?;

    @Select("SELECT icon FROM users WHERE id = #{userId}")
    fun findUserIcon(userId: Int): String;

    @Update("UPDATE users SET icon = #{userIcon} WHERE id = #{userId}")
    fun updateUserIcon(@Param("userIcon") userIcon: String?, @Param("userId") userId: Int);
}