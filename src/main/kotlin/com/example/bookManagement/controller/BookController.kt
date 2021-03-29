package com.example.bookManagement.controller

import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.entity.DbUserDetails
import com.example.bookManagement.service.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*


@RestController
class BookController {
    @Autowired
    lateinit var bookService: BookService;

    @PostMapping("/api/registerBook")
    fun registerBook(@ModelAttribute bookForm: BookForm) {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
//        if (auth is DbUserDetails) {
            bookForm.userId = (auth.principal as DbUserDetails).account.id
//        }
        bookService.insertBook(bookForm)
    }
        //指定したフォルダまでの絶対パス取得
        //val filePath = File("images")
        //val str: String = filePath.absolutePath

//        val postDate: Date = Date()
//        val sdf: SimpleDateFormat = SimpleDateFormat("yyyyMMddHHmmssSS")
//        val dateStr = sdf.format(postDate)
//        //第一引数のパスに第二引数で指定したファイル名でオブジェクト作成？
//        val file = File("/Users/shinji/bookManagement/frontend/src/images/", "${dateStr}_${bookForm.image?.originalFilename}")
//        try {
//            //画像データを指定したパスに指定したファイル名・拡張子で配置
//            bookForm.image?.transferTo(file)
//        } catch (e: IllegalStateException) {
//            e.printStackTrace()
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }
//    }
}