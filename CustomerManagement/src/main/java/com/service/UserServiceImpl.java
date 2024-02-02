package com.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.entities.User;
import com.exception.UserApiException;
import com.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public String saveUser(User user) {
		if(userRepo.existsByUsername(user.getUsername())) {
			logger.error("User already exists");
			throw new UserApiException(HttpStatus.BAD_REQUEST,"User already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepo.save(user);
		logger.info("User Saved Successfully");
		return "User Saved Successfully";
	}

}

