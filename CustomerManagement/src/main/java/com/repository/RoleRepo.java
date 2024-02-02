package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Role;

public interface RoleRepo extends JpaRepository<Role,Integer>{
	
	Role findByRolename(String rolename);
}
