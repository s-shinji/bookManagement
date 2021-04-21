package com.example.bookManagement.entity

data class Reviews(
    val reviewPoint: Double,
    val reviewSentence: String?,
    val userId: Int,
    //usersテーブルから取得
    val userIcon: String
)
