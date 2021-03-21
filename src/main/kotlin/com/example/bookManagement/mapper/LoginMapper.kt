package com.example.bookManagement.mapper

import com.example.bookManagement.entity.Account
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select

@Mapper
interface LoginMapper {
    @Select("SELECT * FROM users WHERE name = #{username}")
    fun findAccountByName(username: String): Account?;
}