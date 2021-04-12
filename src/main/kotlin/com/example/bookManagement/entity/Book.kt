package com.example.bookManagement.entity

data class Book(
    val id: Int,
    val title: String,
    val author: String,
    val type: String,
    /* userIdはDBのカラム名と異なるが、問題ない。
       SQLのSELECT文で記述した順番に取ってきてエンティティに詰め込むため、データ型が順番通りになっていることが重要
     */
    val userId: Int,
    val image: String
)
