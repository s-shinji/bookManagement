package com.example.bookManagement.mapper

import com.example.bookManagement.entity.UserRegistration
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select

@Mapper
interface UserRegistrationMapper {
    @Insert("INSERT INTO users(name, email, password) VALUES(#{name}, #{email}, #{password})")
    fun registerUser(regUserInfo: UserRegistration);

    @Select("SELECT name FROM users WHERE name = #{name}")
    fun findByName(name: String): String?;

    @Select("SELECT email FROM users WHERE email = #{email}")
    fun findByEmail(email: String): String?;
}