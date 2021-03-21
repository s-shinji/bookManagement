package com.example.bookManagement.service

import com.example.bookManagement.entity.Account
import com.example.bookManagement.entity.DbUserDetails
import com.example.bookManagement.mapper.LoginMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class LoginService : UserDetailsService{
    @Autowired
    lateinit var loginMapper: LoginMapper;

    override
    @Transactional(readOnly = true)
    @Throws(UsernameNotFoundException::class)
    fun loadUserByUsername(username: String): UserDetails {
        val account: Account? = loginMapper.findAccountByName(username);
        return account?.let{ DbUserDetails(it) } ?: throw UsernameNotFoundException("User not found.")
    }




}