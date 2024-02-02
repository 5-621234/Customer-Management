package com.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Customer;


public interface CustomerRepo extends JpaRepository<Customer,Integer>{
	Optional<Customer> findByEmail(String email);
	
	List<Customer> findByPhone(Long number);
	List<Customer> findByCity(String city);
	List<Customer> findByFirstname(String firstName);
	

	//List<Customer> findByEmail(Long number);
	

	

}
