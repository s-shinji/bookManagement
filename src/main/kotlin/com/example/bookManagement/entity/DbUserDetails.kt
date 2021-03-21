package com.example.bookManagement.entity

import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.User
//mybatisを使用するわけではないため@NoArgは必要ない？
//プライマリコンストラクタと継承が2行に並んでいる
data class DbUserDetails(var account: Account)
        : User(account.name,account.password,AuthorityUtils.createAuthorityList("ROLE_USER")) {

    private val serialVersionUID: Long = 1L;
}
