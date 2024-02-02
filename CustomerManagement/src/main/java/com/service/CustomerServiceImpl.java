package com.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import com.exception.NullValueException;
import com.entities.Customer;

import com.exception.UserApiException;

import com.repository.CustomerRepo;




@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerRepo customerRepo;
	
	
	
	private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
	
	@Override
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(int customerId) {
        return customerRepo.findById(customerId);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
    	Optional<Customer> existingCustomer = customerRepo.findByEmail(customer.getEmail());

        if (existingCustomer.isPresent()) {
        	 logger.info("Customer Already Exists");
            throw new UserApiException(HttpStatus.BAD_REQUEST,"Customer Already Exists");
        }

        logger.info("Customer Added Successfully");
        return customerRepo.save(customer);
    }

    @Override
    public Customer updateCustomer(int customerId, Customer updatedCustomer) {
        Optional<Customer> existingCustomerOptional = customerRepo.findById(customerId);

        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();
            existingCustomer.setFirstname(updatedCustomer.getFirstname());
            existingCustomer.setLastname(updatedCustomer.getLastname());
            existingCustomer.setStreet(updatedCustomer.getStreet());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setCity(updatedCustomer.getCity());
            existingCustomer.setState(updatedCustomer.getState());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            existingCustomer.setPhone(updatedCustomer.getPhone());
            logger.info("Customer Updated Successfully");
            return customerRepo.save(existingCustomer);
        } else {
        	  logger.info("No Customer with this Id is present");
            throw new NullValueException("No Customer with this id is present", HttpStatus.NOT_FOUND);
        }
    }

    
    
    @Override
    public List<Customer> findByPhone(Long number) {
   	 List<Customer> customers = customerRepo.findByPhone(number);

        if (customers.isEmpty()) {
       	 logger.info("No Customer found for the given search criteria");
            throw new NullValueException("No Customer found for the given search criteria", HttpStatus.NOT_FOUND);
           
        }
        logger.info("Customers for this phone feteched successfully");
        return customers;
    }
    
    
    
    
    @Override
    public List<Customer> findByCity(String city) {
   	 List<Customer> customers = customerRepo.findByCity(city);

        if (customers.isEmpty()) {
       	 logger.info("No Customer found for the given search criteria");
            throw new NullValueException("No Customer found for the given search criteria", HttpStatus.NOT_FOUND);
           
        }
        logger.info("Customers for this city feteched successfully");
        return customers;
    }
    
    
     
    @Override
    public List<Customer> findByFirstname(String firstName) {
        List<Customer> customers = customerRepo.findByFirstname(firstName);

        if (customers.isEmpty()) {
            logger.info("No Customer found for the given search criteria");
            throw new NullValueException("No Customer found for the given search criteria", HttpStatus.NOT_FOUND);
        }

        logger.info("Customers with the given first name fetched successfully");
        return customers;
    }
    
   
    
    


   

    @Override
    public void deleteCustomer(int customerId) {
        if (customerRepo.existsById(customerId)) {
        	 logger.info("Customer deleted Successfully");
            customerRepo.deleteById(customerId);
        } 
        else {
        	 throw new NullValueException("No Customer with this id is present",HttpStatus.NOT_FOUND);
        }
    }

}
