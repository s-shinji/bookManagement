package com.example.bookManagement.entity

import com.example.bookManagement.annotations.NoArg

@NoArg
//DBに格納されているアカウント情報のエンティティ
data class Account(
    var id: Int? = null,
    var name: String?  = null,
    var email: String? = null,
    var password: String? = null
)
