package com.example.bookManagement.controller

import com.example.bookManagement.entity.User
import com.example.bookManagement.service.UserRegistrationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserRegistrationController {
    @Autowired
    lateinit var userRegistrationService: UserRegistrationService

    @PostMapping("/register")
    fun registerUser(@ModelAttribute regUserInfo: User): Int {
        if(userRegistrationService.findByName(regUserInfo.name.toString()) == "すでに登録済みのユーザー名です")
            return 1
        if(userRegistrationService.findByEmail(regUserInfo.email.toString()) == "すでに登録済みのメールアドレスです")
            return 2
        if(regUserInfo.password != regUserInfo.passwordConfirmation)
            return 3

        userRegistrationService.registerUser(regUserInfo)
        return 0;
    }

}