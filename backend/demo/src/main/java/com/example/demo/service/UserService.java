package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.UserEntity;
import com.example.demo.persistence.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
// 유저 DB에 저장된 유저를 가져올때 사용하는 클래스
// UserRepository를 이용해 사용자를 생성하고 로그인시 인증에 사용할 메서드 작성
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public UserEntity create(final UserEntity userEntity) {
		
		if(userEntity == null || userEntity.getUsername() == null) {
			throw new RuntimeException("Invlid arguments");
		}
		final String username = userEntity.getUsername();
		
		if(userRepository.existsByUsername(username)) {
			log.warn("Username already exists {}", username);
			throw new RuntimeException("Username already exists");
		}
		
		return userRepository.save(userEntity);
	}
	
	public UserEntity getByCredentials(final String username, final String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}

}
