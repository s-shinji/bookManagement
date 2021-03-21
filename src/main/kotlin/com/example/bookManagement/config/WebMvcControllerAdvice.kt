package com.example.bookManagement.config

import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.InitBinder
import org.springframework.web.bind.WebDataBinder
import org.springframework.beans.propertyeditors.StringTrimmerEditor

/**
 * 全てのControllerで共通処理を定義
 */
@ControllerAdvice
class WebMvcControllerAdvice {
    /*
     * This method changes empty character to null
     * こちらのメソッドを用意しておくと送信された空文字はnullに変換されます
     */
    @InitBinder
    fun initBinder(dataBinder: WebDataBinder) {
        dataBinder.registerCustomEditor(String::class.java, StringTrimmerEditor(true))
    }
}

