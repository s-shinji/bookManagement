package com.example.bookManagement.controller

import com.example.bookManagement.entity.DbUserDetails
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class LoginController {
    @GetMapping("/auth")
    fun auth(@AuthenticationPrincipal userDetails: DbUserDetails) :Int? {
        return userDetails.account.id
    }
}