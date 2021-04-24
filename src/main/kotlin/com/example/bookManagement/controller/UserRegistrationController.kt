package com.example.bookManagement.controller

import com.example.bookManagement.entity.UserIconForm
import com.example.bookManagement.entity.UserRegistration
import com.example.bookManagement.service.UserRegistrationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserRegistrationController {
    @Autowired
    lateinit var userRegistrationService: UserRegistrationService

    @PostMapping("/register")
    fun registerUser(@ModelAttribute regUserInfo: UserRegistration): Int {
        if(userRegistrationService.findByName(regUserInfo.name.toString()) == "すでに登録済みのユーザー名です")
            return 1
        if(userRegistrationService.findByEmail(regUserInfo.email.toString()) == "すでに登録済みのメールアドレスです")
            return 2
        if(regUserInfo.password != regUserInfo.passwordConfirmation)
            return 3

        userRegistrationService.registerUser(regUserInfo)
        return 0;
    }

    @PostMapping("/api/user/{id}")
    fun updateUserIcon(@ModelAttribute userIconForm: UserIconForm, @PathVariable("id") userId: Int) {
        userRegistrationService.updateUserIcon(userIconForm, userId)
    }

}