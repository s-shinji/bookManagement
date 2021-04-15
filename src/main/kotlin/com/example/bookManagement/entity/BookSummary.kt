package com.example.bookManagement.entity

data class BookSummary(
    val bookDetail: BookDetail,
    val othersReivews: List<Reviews>,
    val reviewAverage: Double
)
