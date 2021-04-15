package com.example.bookManagement.service

import com.example.bookManagement.entity.BookDetail
import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.entity.BookSummary
import com.example.bookManagement.entity.Books
import com.example.bookManagement.mapper.BookMapper
import com.example.bookManagement.mapper.ImageMapper
import com.example.bookManagement.mapper.ReviewMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.awt.print.Book
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
        bookMapper.insertBook(bookForm)
        //insert時にセットされたidを取得する
        val lastBookId = bookForm.id

        //指定したフォルダまでの絶対パス取得
        //val filePath = File("images")
        //val str: String = filePath.absolutePath

        //指定パスに画像ファイルを保存
        val postDate: Date = Date()
        val sdf: SimpleDateFormat = SimpleDateFormat("yyyyMMddHHmmssSS")
        val dateStr = sdf.format(postDate)
        //第一引数のパスに第二引数で指定したファイル名でオブジェクト作成？
        val file = File("/Users/shinji/bookManagement/frontend/public/images", "${dateStr}_${bookForm.image?.originalFilename}")
        try {
            //画像データを指定したパスに指定したファイル名・拡張子で配置
            bookForm.image?.transferTo(file)
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        //imagesテーブルに画像ファイルのパス情報を追加
        lateinit var image: String;
        if(bookForm.image == null) {
            image = "noImage.jpg"
        } else {
            image = "${dateStr}_${bookForm.image?.originalFilename}"
        }
        imageMapper.insertImage(image, lastBookId)

        //reviewsテーブルにレビュー情報を追加
        reviewMapper.insertReview(bookForm.reviewPoint, bookForm.reviewSentence, lastBookId, bookForm.userId)
    }

    fun getBooks(userId: Int): List<Books> {
        return bookMapper.getBooks(userId)
    }

    fun getBook(userId: Int, bookId: Int): BookSummary {
        var bookDetail    = bookMapper.getBook(userId, bookId)
        var othersReviews = reviewMapper.getReviews(userId, bookId)
        var reviewAverage = 0.0
        if (othersReviews.isNotEmpty()) {
            //全てのレビューをfor文で取り出し、平均値をbookDetailsに格納する処理を記述
            var sum = 0.0
            var num = 0
            for (review in othersReviews) {
                sum += review.reviewPoint
                num++
            }
            reviewAverage = sum / num
        }
        var bookSummary   = BookSummary(bookDetail, othersReviews, reviewAverage)
        return bookSummary
    }
}