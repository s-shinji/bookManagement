package com.example.bookManagement.entity

data class BookSummary(
    val bookDetail: BookDetail,
    val othersReviews: List<Reviews>,
    val reviewAverage: Double
)
