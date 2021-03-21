package com.example.bookManagement.entity

import com.example.bookManagement.annotations.NoArg

@NoArg
data class User(
    var id: Int? = null,
    var name: String?  = null,
    var email: String? = null,
    var password: String? = null,
    var passwordConfirmation: String? = null
)
