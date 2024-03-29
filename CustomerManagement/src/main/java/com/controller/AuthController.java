package com.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Role;
import com.entities.User;
import com.payload.JwtAuthResponse;
import com.payload.LoginDto;
import com.payload.RegisterDto;
import com.repository.UserRepo;
import com.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping(value= {"/loginuser", "/signin"})
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
		String token = authService.login(loginDto);
		
		User user = null;
		Role role = null;
		String rolename;
		Optional<User> findUser = userRepo.findByUsername(loginDto.getUsername());
		if(findUser.isPresent()) {
			user = findUser.get();
			role = user.getRole();
			
		}
		String username = user.getUsername();
		rolename = role.getRolename();
		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
		jwtAuthResponse.setAccessToken(token);
		jwtAuthResponse.setRolename(rolename);
		jwtAuthResponse.setUsername(username);
		return ResponseEntity.ok(jwtAuthResponse);
	}
	
	@PostMapping("/registeruser")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response,HttpStatus.CREATED);

	}
	
}
