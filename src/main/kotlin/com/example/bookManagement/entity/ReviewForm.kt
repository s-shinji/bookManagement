package com.example.bookManagement.entity

data class ReviewForm(
    val bookId: Int,
    val reviewPoint: Double,
    val reviewSentence: String?,
    var userId: Int? = null
)
