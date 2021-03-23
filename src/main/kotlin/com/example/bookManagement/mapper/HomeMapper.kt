package com.example.bookManagement.mapper

import com.example.bookManagement.entity.Account
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select

@Mapper
interface HomeMapper {
    @Select("SELECT * FROM users")
    fun getAllUserInfo(): List<Account>;
}