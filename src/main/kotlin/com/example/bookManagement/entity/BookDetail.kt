package com.example.bookManagement.entity

data class BookDetail(
    val id: Int,
    val title: String,
    val author: String,
    /*
       userIdはDBのカラム名と異なるが、問題ない。
       SQLのSELECT文で記述した順番に取ってきてエンティティに詰め込むため、データ型が順番通りになっていることが重要
     */
    val userId: Int,
    //usersテーブルから取得
    val userIcon: String,
    //imagesテーブルから取得
    val image: String,
    //reviewsテーブルから取得
    var myReviewPoint: Double?,
    val myReviewSentence: String?,
    val bookId: Int
)
