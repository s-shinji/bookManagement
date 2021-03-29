package com.example.bookManagement.service

import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.mapper.BookMapper
import com.example.bookManagement.mapper.ImageMapper
import com.example.bookManagement.mapper.ReviewMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

@Service
@Transactional
class BookService {
    @Autowired
    lateinit var bookMapper: BookMapper;
    @Autowired
    lateinit var imageMapper: ImageMapper;
    @Autowired
    lateinit var reviewMapper: ReviewMapper;

    fun insertBook(bookForm: BookForm) {
        //booksテーブルに書籍情報を追加
        val lastBookId = bookMapper.insertBook(bookForm)

        //指定パスに画像ファイルを保存
        val postDate: Date = Date()
        val sdf: SimpleDateFormat = SimpleDateFormat("yyyyMMddHHmmssSS")
        val dateStr = sdf.format(postDate)
        //第一引数のパスに第二引数で指定したファイル名でオブジェクト作成？
        val file = File("/Users/shinji/bookManagement/frontend/src/images/", "${dateStr}_${bookForm.image?.originalFilename}")
        try {
            //画像データを指定したパスに指定したファイル名・拡張子で配置
            bookForm.image?.transferTo(file)
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        //imagesテーブルに画像ファイルのパス情報を追加
        lateinit var imagePath: String;
        if(bookForm.image == null) {
            imagePath = "../images/noImage.jpg"
        } else {
            imagePath = "../images/${dateStr}_${bookForm.image?.originalFilename}"
        }
        imageMapper.insertImage(lastBookId, imagePath)

        //reviewsテーブルにレビュー情報を追加
        reviewMapper.insertReview(bookForm.reviewPoint, bookForm.reviewSentence, lastBookId, bookForm.userId)
    }
}