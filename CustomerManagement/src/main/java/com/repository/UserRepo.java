package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.User;

public interface UserRepo extends JpaRepository<User,Integer> {
	
	Optional<User> findByUsername(String username);
	boolean existsByUsername(String username);
   // void save (User user);
	

}