import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function Adminpage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      navigate("/admin");
    }
  });
  const [customerdata, setcdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [farmerdata, setfdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);
  const [KBdata, setkbdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [data, setdata] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const delfn = (id) => {
    console.log(id);
    axiosInstance
      .post(`/deleteCustomerById/${id}`)
      .then((res) => {
        console.log(res);
        alert("Deleted Customer");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  const delfn2 = (id) => {
    console.log(id);
    axiosInstance
      .post(`/deleteFarmerById/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delfn3 = (id) => {
    console.log(id);
    axiosInstance
      .post(`/deletekrishiById/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosInstance
      .post(`/viewAllCustomers`)
      .then((res) => {
        if (res.data.data != undefined) {
          console.log(res, "customerdata");
          setcdata(res.data.data);
        } else {
          setcdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllFarmers`)
      .then((res) => {
        if (res.data.data != undefined) {
          console.log(res, "farmerdata");
          setfdata(res.data.data);
        } else {
          setfdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllkrishi`)
      .then((res) => {
        if (res.data.data != undefined) {
          console.log(res, "kbdata");
          setkbdata(res.data.data);
        } else {
          setkbdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllProduct`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
        setFilteredItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axiosInstance
      .post(`/viewDrivers`)
      .then((res) => {
        console.log(res);
        setDrivers(res.data.data);
        // setFilteredItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const setsearchfn = (e) => {
    const filtereddata = data.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    console.log(filtereddata);
    if (filtereddata.length == 0) {
      setFilteredItems(data);
    } else {
      setFilteredItems(filtereddata);
    }
  };

  const approvefn = (id) => {
    axiosInstance
      .post(`/approveFarmer/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv2" style={{ minHeight: "450px" }}>
        <div className="main">
          <h2 style={{ textAlign: "center" }}>Welcome to the Admin Panel</h2>
          <div className="container text-center">
            <div className="row">
              <div className="col-6 ">
                {" "}
                <div class="alert alert-primary" role="alert">
                  <h1>
                    {" "}
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/008/515/085/original/farm-logo-green-logo-landscape-logo-vector.jpg"
                      height={100}
                    />{" "}
                    {customerdata.length} Customer Registered
                  </h1>
                  <Link className="btn btn-danger" to={`/Admin/Customer`}>
                    {" "}
                    More Info
                  </Link>
                </div>
              </div>
              <div className="col-6 ">
                <div class="alert alert-primary" role="alert">
                  <h1>
                    {" "}
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/008/515/085/original/farm-logo-green-logo-landscape-logo-vector.jpg"
                      height={100}
                    />{" "}
                    {farmerdata.length} Farmer Registered
                  </h1>
                  <Link className="btn btn-danger" to={`/Admin/Farmer`}>
                    {" "}
                    More Info
                  </Link>
                </div>
              </div>
              <div className="col-6 ">
                <div class="alert alert-primary" role="alert">
                  <h1>
                    {" "}
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/008/515/085/original/farm-logo-green-logo-landscape-logo-vector.jpg"
                      height={100}
                    />{" "}
                    {KBdata.length} Krishi Bhavan Registered
                  </h1>
                  <Link className="btn btn-danger" to={`/Admin/KB`}>
                    {" "}
                    More Info
                  </Link>
                </div>
              </div>

              <div className="col-6 ">
                <div class="alert alert-primary" s role="alert">
                  <h1>
                    {" "}
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/008/515/085/original/farm-logo-green-logo-landscape-logo-vector.jpg"
                      height={100}
                    />{" "}
                    {filteredItems.length} Products Added
                  </h1>
                  <Link className="btn btn-danger" to={`/Admin/Product`}>
                    {" "}
                    More Info
                  </Link>
                </div>
              </div>
              <div className="col-6 ">
                <div class="alert alert-primary" role="alert">
                  <h1>
                    {" "}
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/008/515/085/original/farm-logo-green-logo-landscape-logo-vector.jpg"
                      height={100}
                    />{" "}
                    {drivers.length} Drivers Registered
                  </h1>
                  <Link className="btn btn-danger" to={`/Admin/Drivers`}>
                    {" "}
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ minHeight: "400px" }}>
        <h1 style={{ textAlign: "center", position: "relative", top: "150px" }}>
          Please{" "}
          <Link style={{ fontSize: "50px" }} to="/Admin">
            log in{" "}
          </Link>
          to see admin panel{" "}
        </h1>
      </div>
    );
  }
}

export default Adminpage;
