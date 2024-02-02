package com.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import com.entities.Customer;

import com.service.CustomerService;
import com.repository.CustomerRepo;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customerapp")
@CrossOrigin(origins="*")
public class CustomerController {
	
	@Autowired
    private CustomerService customerService;
	
	
	@Autowired
    private CustomerRepo customerRepo;

   
	 @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getallcustomers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

	 @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getcustomer/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int customerId) {
        Optional<Customer> task = customerService.getCustomerById(customerId);
        return task.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
	 
	 
	 

	 @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addnewcustomer")
    public ResponseEntity<String> createTask(@RequestBody Customer customer) {
            customerService.saveCustomer(customer);
            return new ResponseEntity<>("Customer saved successfully",HttpStatus.CREATED);
        
    }
	 
	 
	 @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("/updatecustomer/{customerId}")
	    public ResponseEntity<String> updateCustomer(@PathVariable int customerId, @RequestBody Customer updatedCustomer) {
	       
	             customerService.updateCustomer(customerId, updatedCustomer);
	             return new ResponseEntity<> ("Customer updated successfully",HttpStatus.OK);
	           
	        
	    }
	 
	 @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/deletecustomer/{customerId}")
	    public ResponseEntity<String> deleteCustomer(@PathVariable int customerId) {
	        
	            customerService.deleteCustomer(customerId);
	            return new ResponseEntity<> ("Customer deleted successfully",HttpStatus.OK);
	       
	    }
	 
	 
	 
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("/searchByCity")
	 public List<Customer> searchByCity(@RequestParam String city) {
	     return customerService.findByCity(city);
	 }
	 
	 
	 
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("/searchByFirstName")
	 public List<Customer> searchByFirstName(@RequestParam String firstname) {
	     return customerService.findByFirstname(firstname);
	 }
	 
	 
	 
	 
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("/searchByPhonee")
	 public List<Customer> searchByPhone(@RequestParam Long phone) {
	     return customerService.findByPhone(phone);
	 }
	 
	 
	 @PreAuthorize("hasRole('ADMIN')")
	 @GetMapping("/searchByEmail")
	 public Optional<Customer> searchByEmail(@RequestParam String email ) {
	     return customerRepo.findByEmail(email);
	 }
	 
	 

}
