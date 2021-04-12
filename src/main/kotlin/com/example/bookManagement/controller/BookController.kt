package com.example.bookManagement.controller

import com.example.bookManagement.entity.Book
import com.example.bookManagement.entity.BookForm
import com.example.bookManagement.entity.DbUserDetails
import com.example.bookManagement.service.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
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
        bookForm.userId = (auth.principal as DbUserDetails).account.id
        bookService.insertBook(bookForm)
    }

    @GetMapping("api/user/{id}/books")
    fun getBooks(@PathVariable("id") userId: Int): List<Book> {
        return bookService.getBooks(userId)
    }
}