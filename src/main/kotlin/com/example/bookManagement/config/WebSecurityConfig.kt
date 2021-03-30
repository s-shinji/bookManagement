package com.example.bookManagement.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import kotlin.Throws
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.lang.Exception
import java.util.*

@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.cors().configurationSource(corsConfigurationSource())
        http.formLogin()
            .loginPage("/login")
            .loginProcessingUrl("/authenticate")
            .usernameParameter("userName")
            .passwordParameter("password")
            .defaultSuccessUrl("/auth")
            .failureUrl("/login-error")
            .permitAll()
        http.logout()
            .logoutSuccessUrl("/login")
            .permitAll()
        http.csrf().disable().authorizeRequests()
            .antMatchers("/css/**", "/images/**", "/js/**").permitAll()
            .antMatchers("/").permitAll()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowCredentials = true
        configuration.allowedOrigins = Arrays.asList("http://localhost:3000")
        // configuration.setAllowedHeaders(Arrays.asList(  // CORSリクエストで受信を許可するヘッダー情報(以下は例です)
        // 		"Access-Control-Allow-Headers",
        // 		"Access-Control-Allow-Origin",
        // 		"Access-Control-Request-Method",
        // 		"Access-Control-Request-Headers",
        // 		"Cache-Control",
        // 		"Content-Type",
        // 		"Accept-Language"));
        configuration.allowedMethods = Arrays.asList("GET", "POST")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}