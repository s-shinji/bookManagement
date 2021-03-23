package com.example.bookManagement.controller

import com.example.bookManagement.entity.Account
import com.example.bookManagement.service.HomeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeController {
    @Autowired
    lateinit var homeService: HomeService;

    @GetMapping("/api/home")
    fun getAllUserInfo() : List<Account> {
        return homeService.getAllUserInfo()
    }
}