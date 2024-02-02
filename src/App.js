
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import AddCustomer from './users/AddCustomer';



function App() {
  return (
   
   <div className="App">

  
      

      
      <Routes>
      {/* <Route element={<Spinner/>}></Route> */}
     <Route exact path='/' element={<Home/>} />

  
     <Route exact path='/dashboard/:username' element={<Dashboard />} />
     {/* <Route exact path="/addtask" element={<AddTask/>} /> */}
     <Route exact path="/addcustomer" element={<AddCustomer/>} />

      </Routes>


      
      </div>
  
  );
}

export default App;
