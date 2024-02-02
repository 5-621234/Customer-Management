package com.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.entities.Role;
import com.entities.User;
import com.exception.UserApiException;
import com.payload.LoginDto;
import com.payload.RegisterDto;
import com.repository.RoleRepo;
import com.repository.UserRepo;
import com.security.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService{

	private AuthenticationManager authenticationManager;
	private UserRepo userRepository;
	private RoleRepo roleRepository;
	private JwtTokenProvider jwtTokenProvider;
	private PasswordEncoder passwordEncoder;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
	
	public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepo userRepository,
			RoleRepo roleRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.jwtTokenProvider = jwtTokenProvider;
		this.passwordEncoder = passwordEncoder;
	}


	@Override
	public String login(LoginDto loginDto) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtTokenProvider.generateToken(authentication);
		logger.info("Token generated successfully");
		logger.info("Login successfull");
		return token;
	}


	@Override
	public String register(RegisterDto registerDto) {
		if(userRepository.existsByUsername(registerDto.getUsername())) {
			logger.error("User already exists");
			throw new UserApiException(HttpStatus.BAD_REQUEST,"User already exists");
		}
			
		
		User user = new User();
		user.setUsername(registerDto.getUsername());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Role role = roleRepository.findByRolename(registerDto.getRole());
		user.setRole(role);
		
		userRepository.save(user);
		logger.info("User registerd successfully");
		return "User registered successfully";
	}


}
