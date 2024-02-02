import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddCustomer() {

  let username = useParams().username
  let navigate = useNavigate();
  

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const { firstname, lastname, street, address, city, state, email, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  

  const AddCustomer = async() =>{
    let token =localStorage.getItem("auth")
    let response = await axios.post('http://localhost:8086/customerapp/addnewcustomer',{
       firstname,
        lastname,
        street,
        address,
        city,
        state,
        email,
        phone
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    alert("Customer Add")
    window.location.reload(false)
    //navigate(`/dashboard/${username}`);
   }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.post("http://localhost:8086/customerapp/addnewcustomer", user);
  //   navigate(`/dashboard/${username}`);
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Customer</h2>

          {/* <form onSubmit={(e) => onSubmit(e)}> */}
          <form>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Street
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your street"
                name="street"
                value={street}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                City
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your city"
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                State
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your state"
                name="state"
                value={state}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Phone
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter your phone"
                name="phone"
                value={phone}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary" onClick={AddCustomer}>
              Submit
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
}