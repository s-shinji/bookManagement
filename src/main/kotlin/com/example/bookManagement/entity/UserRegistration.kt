package com.example.bookManagement.entity

import com.example.bookManagement.annotations.NoArg

@NoArg
//新規ユーザ登録用のエンティティ
data class UserRegistration(
    val name: String,
    val email: String,
    //パスワードのみ、エンコードをするためvarを使用
    var password: String,
    val passwordConfirmation: String
)
