import React from "react";
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from "../../baseurl";

function Adminfarm() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      navigate("/admin");
    }
  });

  const [farmerdata, setfdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [data, setdata] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const delfn2 = (id) => {
    console.log(id);
    axiosInstance
      .post(`/deleteFarmerById/${id}`)
      .then((res) => {
        console.log(res);
        alert("Farmer Deleted")
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
  }, []);

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
      <div className="productdiv1" style={{ minHeight: "450px" }}>
        <div className="main">
         

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
              <h1 style={{textAlign:"center"}}
                >
                  View all Farmers
                </h1>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* farmer details mapped */}
                      {farmerdata.length ? (
                        farmerdata.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body"style={{ boxShadow: "10px 15px 5px grey"  }}>
                                <div className="main">
                                  <div  >
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Farmer name : {a.name}{" "}
                                        {a.isactive ? (
                                          <span>
                                            <img
                                              src="https://media.istockphoto.com/id/1313547780/vector/profile-verification-check-marks-icons-vector-illustration.jpg?s=612x612&w=0&k=20&c=XDWxGC05gd-sTn_cBvlI2aG1onqOdiVdPb0IeFO-Q2M="
                                              height={50}
                                            />
                                          </span>
                                        ) : null}
                                      </h5>
                                      <p class="card-text">Age : {a.age}</p>
                                      <p class="card-text">
                                        {" "}
                                        Contact : {a.contact}
                                      </p>
                                      <p class="card-text">
                                        {" "}
                                        Village : {a.village}
                                      </p>
                                      <p class="card-text">
                                        {" "}
                                        District : {a.district}
                                      </p>
                                      <p class="card-text">
                                        {" "}
                                        pincode : {a.pincode}
                                      </p>
                                      <p class="card-text">
                                        {" "}
                                        Aadhar : {a.aadhar}
                                      </p>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          delfn2(a._id);
                                        }}
                                      >
                                        {" "}
                                        Delete
                                      </button>
{/* 
                                      {a.isactive ? null : (
                                        <>
                                          <hr />
                                          <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                              approvefn(a._id);
                                            }}
                                          >
                                            {" "}
                                            Approve
                                          </button>
                                        </>
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">No Data to display</h5>
                          </div>
                        </div>
                      )}
                      {/* farmer details mapped */}{" "}
                    </div>
                  </div>
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

export default Adminfarm;
