package com.service;
import com.payload.LoginDto;
import com.payload.RegisterDto;

public interface AuthService {
	String login(LoginDto loginDto);
	String register(RegisterDto registerDto);

}
