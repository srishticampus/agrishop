import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Assets/styles/style.css";
import "./Assets/styles/Footer.css";
import "./Assets/styles/register.css";
import "./Assets/styles/Navbar.css";
import './Assets/styles/style2.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main";
import About from "./Components/About";
import Products from "./Components/Products/Products";
import KBLog from "./Components/Login/KBLog";
import CusLog from "./Components/Login/CusLog";
import FarmerLog from "./Components/Login/FarmerLog";
import CustomerReg from "./Components/Registration/CustomerReg";
import FarmerReg from "./Components/Registration/FarmerReg";
import Cart from "./Components/Cart";
import AddProduct from "./Components/Products/AddProduct";
import AdminLog from "./Components/Admin";
import Adminpage from "./Components/Adminpage";
import Forgotpasscus from "./Components/Login/Forgotpasscus";
import FotgotPassKb from './Components/Login/ForgotPasskb'
import CusProfile from "./Components/CustomerProfile";
import FarmerProfile from "./Components/FarmerProfile";
import KBProfile from "./Components/KBProfile";
import ViewFarmers from "./Components/ViewFarmers";
import KrishiBhavanReg from "./Components/Registration/KrishiBhavanReg";
import FarmerAddProduct from "./Components/Products/FarmerAddProduct";
import FarmerEditProduct from "./Components/Products/FarmerEditProduct";
import Forgotpassfarmer from "./Components/Login/Forgotpassfarmer";
import FarmerProducts from "./Components/Products/FarmerProducts";
import FarmerComplaintspage from "./Components/FarmerComplaintspage";
import AddGuidelines from "./Components/AddGuidelines";
import ViewGuidelines from "./Components/ViewGuidelines";
import Compensation from "./Components/Compensation";
import Wishlist from "./Components/Wishlist";
import Orders from "./Components/Orders";
import MyOrders from "./Components/Products/MyOrders";
import NavCus from "./Components/Navbar/NavCus";
import NavFarm from "./Components/Navbar/NavFarm";
import NavKB from "./Components/Navbar/NavKB";
import Admincust from "./Components/Admin/Admincust";
import Adminfarm from "./Components/Admin/Adminfarm";
import AdminKB from "./Components/Admin/AdminKB";
import AdminProduct from "./Components/Admin/AdminProduct";
import DriverLog from "./Components/Login/DriverLog";
import DeliveryAgentReg from "./Components/Registration/DeliveryAgentReg";
import DriverHome from "./Components/Delivery/DriverHome";
import AdminDelivery from "./Components/Admin/AdminDelivery";
import UpdateStatus from "./Components/Delivery/UpdateStatus";

function App() {
  const [auth, setauth] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("customerlogid") != null) {
      setauth(1);
    } else if (localStorage.getItem("kblogid") != null) {
      setauth(2);
    } else if (localStorage.getItem("farmerid") != null) {
      setauth(3);
    } else if (localStorage.getItem("adminlog") != null) {
      setauth(4);
    } else if (localStorage.getItem("driverlog") != null) {
      setauth(5);
    } else {
      setauth(0);
    }
  });

  return (
    <BrowserRouter basename="projects/agri_shop">
      <div className="App">
        {/* <button className="btn btn-light" onClick={()=>{setauth(0);}}> Logout</button>
        <button className="btn btn-light" onClick={()=>{setauth(1);}}> Login Customer </button>
        <button className="btn btn-light" onClick={()=>{setauth(2);}}> Login KB </button>
        <button className="btn btn-light" onClick={()=>{setauth(3);}}> Login Farmer </button> */}
        <Navbar auth={auth} />
        <Routes>
          <Route exact path="/" element={<Main auth={auth}/>} />
          <Route path="/Admin" element={<AdminLog />} />
          <Route path="/Admin/Adminpage" element={<Adminpage />} />


          <Route path="/Admin/Customer" element={<Admincust />} />
          <Route path="/Admin/Farmer" element={<Adminfarm />} />
          <Route path="/Admin/KB" element={<AdminKB />} />
          <Route path="/Admin/Product" element={<AdminProduct/>} />
          <Route path="/Admin/Drivers" element={<AdminDelivery/>} />


          <Route path="/Home" element={<Main auth={auth} />} />
          <Route path="/About" element={<About />} />
          
          <Route path="/Orders" element={<Orders/>}/>


          <Route path="/Login/kblog" element={<KBLog />} />
          <Route path="/Fotgotpasskb" element={<FotgotPassKb />} />


          <Route path="/Login/cuslog" element={<CusLog />} />
          <Route path="/Fotgotpasscus" element={<Forgotpasscus />} />
          <Route path="/FarmerComplaints" element={<FarmerComplaintspage/>} />

        
          <Route path="/Login/farmlog" element={<FarmerLog />} />
          <Route path="/Fotgotpassfarm" element={<Forgotpassfarmer />} />
          
          
          <Route path="/Register/CusReg" element={<CustomerReg />} />
          <Route path="/Register/FarmReg" element={<FarmerReg />}/>
          <Route path="/Register/KBReg" element={<KrishiBhavanReg />} />

          <Route path="/CustomerProfile" element={<CusProfile />} />

          <Route path="/FarmerProfile" element={<FarmerProfile />} />
          <Route path="/ViewGuidelines" element={<ViewGuidelines />} />
          
          <Route path="/KBProfile" element={<KBProfile />} /> 
          <Route path="/AddGuidelines" element={<AddGuidelines />} />
          <Route path="/compensation/:id/:compid" element={<Compensation />} />

          


          <Route path="/viewfarmers" element={<ViewFarmers/>} />

          <Route path="/FarmerAddProduct" element={<FarmerAddProduct />} />
          <Route path="/FarmerEditProduct/:id" element={<FarmerEditProduct />} />
          <Route path="/FarmerProducts" element={<FarmerProducts />} />
          <Route path="/FarmerOrders" element={<MyOrders />} />

          

          <Route path="/Products" element={<Products />} />
          <Route path="/Products/AddtoCart/:id" element={<AddProduct />} />


          <Route path="/Cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          

          {/* Delivery Agent Routes */}
          <Route path="/Register/DeliveryAgentReg" element={<DeliveryAgentReg />} />
          <Route path="/Login/driverlog" element={<DriverLog />} />
          <Route path="/Delivery/driverhome" element={<DriverHome />} />
          <Route path="/delivery/updateStatus/:orderid/:userid" element={<UpdateStatus />} />

          <Route path="/Admin/delivery" element={<AdminDelivery />} />

          <Route path="/*" element={<div className="errorpage"> </div>} />
        </Routes>

        <Footer auth={auth} />
      </div>
    </BrowserRouter>
  );
}

export default App;
