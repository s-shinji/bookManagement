package com.example.bookManagement.service

import com.example.bookManagement.entity.UserIconForm
import com.example.bookManagement.entity.UserRegistration
import com.example.bookManagement.mapper.UserRegistrationMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.io.File
import java.io.IOException

@Service
@Transactional
class UserRegistrationService {
    @Autowired
    lateinit var userRegistrationMapper: UserRegistrationMapper
    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    fun registerUser(regUserInfo: UserRegistration) {
        regUserInfo.password = passwordEncoder.encode(regUserInfo.password)
        regUserInfo.userIcon = "default.jpeg"
        userRegistrationMapper.registerUser(regUserInfo);
    }
    fun findByName(name: String): String? {
        if(userRegistrationMapper.findByName(name) == null) return "OK"
        else return "すでに登録済みのユーザー名です"
    }
    fun findByEmail(email: String): String? {
        if(userRegistrationMapper.findByEmail(email) == null) return "OK"
        else return "すでに登録済みのメールアドレスです"
    }
    fun updateUserIcon(userIconForm: UserIconForm,userId: Int) {
        val beforeChangeIcon = userRegistrationMapper.findUserIcon(userId)
        if(beforeChangeIcon != "default.jpeg") {
            val deleteFile = File("/Users/shinji/bookManagement/frontend/public/images/${beforeChangeIcon}")
            deleteFile.delete()
        }
        val file = File("/Users/shinji/bookManagement/frontend/public/images", "${userIconForm.userIcon?.originalFilename}")
        try {
            userIconForm.userIcon?.transferTo(file)
            userRegistrationMapper.updateUserIcon(userIconForm.userIcon.originalFilename, userId)
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }


    }

}