package com.javafest.aifarming.config;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //convert UserInfo to UserDetails in UserInfoUserDetails class
        //because this method returns UserDetails object
        Optional<UserInfo> userInfo = userInfoRepository.findByUserName(username);
        return userInfo.map(UserInfoUserDetails::new)
                .orElseThrow(()->new UsernameNotFoundException("User not found"+username));
    }


}
