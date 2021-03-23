package com.example.bookManagement.service

import com.example.bookManagement.entity.Account
import com.example.bookManagement.mapper.HomeMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class HomeService {
    @Autowired
    lateinit var homeMapper: HomeMapper

    fun getAllUserInfo(): List<Account> {
       return homeMapper.getAllUserInfo();
    }
}