import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { authenticateAdmin } from "../utils/Authentication";
import Navbar from "../layout/Navbar";
import Pagination from "../utils/Pagination";

const Dashboard = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    firstname: "",
    lastname: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const [searchOption, setSearchOption] = useState("city");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const itemsPerPage = 20;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    authenticate();
    loadUsers();
  }, []);

  const authenticate = () => {
    if (!authenticateAdmin()) navigate("/");
  };

  // To get all the Customers
  const loadUsers = async () => {
    let token = localStorage.getItem("auth");
    if (authenticateAdmin()) {
      let response = await axios.get(
        "http://localhost:8086/customerapp/getallcustomers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    }
  };

  const deleteUser = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (isConfirmed) {
      performDeleteUser(id);
    }
  };

  const performDeleteUser = async (id) => {
    try {
      let token = localStorage.getItem("auth");
      await axios.delete(
        `http://localhost:8086/customerapp/deletecustomer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Customer Deleted");
      await loadUsers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting customer");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const handleEdit = (id) => {
    setEditUserId(id);
    const selectedUser = users.find((user) => user.customerid === id);
    setEditedUser(selectedUser);
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedUser({
      firstname: "",
      lastname: "",
      street: "",
      address: "",
      city: "",
      state: "",
      email: "",
      phone: "",
    });
  };

  // To update the customer
  const handleSaveEdit = async () => {
    let token = localStorage.getItem("auth");
    try {
      await axios.put(
        `http://localhost:8086/customerapp/updatecustomer/${editUserId}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Customer Updated");
      await loadUsers();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Error updating customer");
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    let token = localStorage.getItem("auth");

    try {
      let response;

      switch (searchOption) {
        case "city":
          response = await axios.get(
            `http://localhost:8086/customerapp/searchByCity?city=${searchValue}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "phone":
          response = await axios.get(
            `http://localhost:8086/customerapp/searchByPhonee?phone=${searchValue}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "firstname":
          response = await axios.get(
            `http://localhost:8086/customerapp/searchByFirstName?firstname=${searchValue}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;

        default:
          console.error("Invalid search option");
          return;
      }

      setUsers(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching customers:", error);
      alert("Error searching customers");
    }
  };

  const handleBackToDashboard = () => {
    setIsSearching(false);
    loadUsers();
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {!isSearching && (
          <div className="row g-3">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="searchOption">
                    Search By:
                  </label>
                  <select
                    className="form-select"
                    id="searchOption"
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                  >
                    <option value="city">City</option>
                    <option value="phone">Phone</option>
                    <option value="firstname">First Name</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 input-group">
                  <label htmlFor="searchValue" className="input-group-text">
                    Search Value:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchValue"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
       

        {isSearching && (
         
          // <div className="mb-3" >
          //   <button
          //     type="button"
          //     className="btn btn-secondary"
          //     onClick={handleBackToDashboard}
          //   >
          //     Back to Dashboard
          //   </button>
          // </div>

          <div className="mb-3" style={{ position: 'absolute', marginTop: '10px', left: '0', zIndex: '1000' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
          
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Street</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(startIndex, endIndex).map((user, index) => (
                <tr key={index}>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="firstname"
                        value={editedUser.firstname}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.firstname
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="lastname"
                        value={editedUser.lastname}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.lastname
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="street"
                        value={editedUser.street}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.street
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="address"
                        value={editedUser.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.address
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="city"
                        value={editedUser.city}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.city
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="state"
                        value={editedUser.state}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.state
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td>
                    {editUserId === user.customerid ? (
                      <>
                        <button
                          className="btn btn-success mx-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-primary mx-2"
                          onClick={() => handleEdit(user.customerid)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteUser(user.customerid)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button className="btn btn-danger mx-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
