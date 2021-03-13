package com.example.bookManagement.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping




@Controller
class SinglePageController {
    @GetMapping("/{path:[^.]*}")
    fun any(): String? {
        return "forward:/index.html"
    }
}