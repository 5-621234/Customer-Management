import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigation=useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire('Error', 'Please fill both fields', 'error');
      return;
    }

   


    let resp = await axios.post("http://localhost:8086/api/auth/loginuser", {
      username,
      password
    });
   // console.log(resp.data);
    
    localStorage.setItem("auth", resp.data.accessToken);
    let role =resp.data.rolename
    localStorage.setItem("role",role);

   
    if(role =="ROLE_ADMIN"){
      navigation(`/dashboard/${username}`)
      return
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Customer Management</h2>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

