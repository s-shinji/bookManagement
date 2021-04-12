package com.example.bookManagement.entity

import org.springframework.web.multipart.MultipartFile

data class BookForm(
    val id: Int? = null,
    var image: MultipartFile? = null,
    val title: String,
    val author: String,
    val type: String,
    val reviewPoint: Double,
    val reviewSentence: String? = null,
    var userId: Int? = null
)
