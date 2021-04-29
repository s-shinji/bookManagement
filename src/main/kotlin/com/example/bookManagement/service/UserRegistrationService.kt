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
import java.util.*

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
//        画像をパスに保存
//        val beforeChangeIcon = userRegistrationMapper.findUserIcon(userId)
//        if(beforeChangeIcon != "default.jpeg") {
//            val deleteFile = File("/Users/shinji/bookManagement/frontend/public/images/${beforeChangeIcon}")
//            deleteFile.delete()
//        }
//        val file = File("/Users/shinji/bookManagement/frontend/public/images", "${userIconForm.userIcon?.originalFilename}")
//        try {
//            userIconForm.userIcon?.transferTo(file)
//            userRegistrationMapper.updateUserIcon(data.toString(), userId)
//        } catch (e: IllegalStateException) {
//            e.printStackTrace()
//        } catch (e: IOException) {
//            e.printStackTrace()
//        }

        //画像をDBに保存
        var data = StringBuffer()
        val base64 = Base64.getEncoder().encodeToString(userIconForm.userIcon.bytes)
        data.append("data:image/;base64,")
        data.append(base64)
        userRegistrationMapper.updateUserIcon(data.toString(), userId)
    }

}