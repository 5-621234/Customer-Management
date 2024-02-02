package com.entities;




import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


 
@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name="customer")
public class Customer {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int customerid;

    
    @Column
    private String firstname;

    @Column(length = 1000)
    private String lastname;

    
    @Column
    private String street;

    @Column
    private String address;

 
    @Column
    private String city;

    
    @Column
    private String state;
    
    
    @Column
    private String email;
    
    @Column
    private Long phone;
    
    


}
