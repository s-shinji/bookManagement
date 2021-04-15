package com.example.bookManagement.controller

import com.example.bookManagement.entity.*
import com.example.bookManagement.service.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


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
    fun getBooks(@PathVariable("id") userId: Int): List<Books> {
        return bookService.getBooks(userId)
    }

    @GetMapping("api/user/{userId}/book/{bookId}")
    fun getBook(@PathVariable("userId") userId: Int, @PathVariable("bookId") bookId: Int): BookSummary {
        return bookService.getBook(userId, bookId)
    }
}