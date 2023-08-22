package com.javafest.aifarming.filter;

import com.javafest.aifarming.config.UserInfoUserDetailsService;
import com.javafest.aifarming.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private JwtService jwtService;
    private UserInfoUserDetailsService userInfoUserDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserInfoUserDetailsService userInfoUserDetailsService) {
        this.jwtService = jwtService;
        this.userInfoUserDetailsService = userInfoUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        //Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXllbSIsImlhdCI6MTY5MDQ2NTcyNiwiZXhwIjoxNjkwNDY3NTI2fQ.zGn_Ae1-7lF_GOcBlily454eWHAf9HKQGuWgRtJjKIY
        //remove the first 7 character (Bearer). cz Spring Boot does not need it now

        String userName = null;
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            token = authHeader.substring(7);
            userName = jwtService.extractUsername(token);
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Check if the token is blacklisted
            if (!jwtService.isTokenBlacklisted(token)) {
                UserDetails userDetails = userInfoUserDetailsService.loadUserByUsername(userName);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
