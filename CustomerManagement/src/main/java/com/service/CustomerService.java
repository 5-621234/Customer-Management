package com.service;




//import com.monocept.insurance.dto.AllSchemeDto;
import com.entities.Customer;
import java.util.*;



public interface CustomerService {
	
	List<Customer> getAllCustomers();

    Optional<Customer> getCustomerById(int customerId);

    //Optional<Task> getTaskByTaskName(String taskName);

    Customer saveCustomer(Customer customer);

    Customer updateCustomer(int customerId, Customer customer);

    void deleteCustomer(int customerId);

    
    
	List<Customer> findByPhone(Long number);
	
	
	
	List<Customer> findByCity(String city );
	
	
	
	List<Customer> findByFirstname(String firstName);


	
	

}
