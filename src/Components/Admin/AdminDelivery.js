import React from 'react'
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from "../../baseurl";
import "../../Assets/styles/delivery.css"

function AdminDelivery() {
 
    const navigate = useNavigate();
    const [oprMode, setfOprMode] = useState({flag:false});

    const changeState=(x)=>{
        setfOprMode({flag:x})
        console.log("mode changed");
        console.log("modeo",x);
    }
    useEffect(() => {
      if (localStorage.getItem("adminlog") == null) {
        navigate("/admin");
      }
    });
    
    const [driverdata, setfdata] = useState([]);
    const [driverreqs, setsdata] = useState([]);

  
    const delfn2 = (id) => {
      console.log(id);
      axiosInstance
        .post(`/deleteDriverById/${id}`)
        .then((res) => {
          console.log(res);
          alert("Driver  Deleted")
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  useEffect(()=>{
    axiosInstance
    .post(`/viewDrivers`)

    .then((res) => {
      console.log(res, "drivers data 1");

      if (res.data.data != undefined) {
        console.log(res, "drivers data");
        console.log("tt",res.data.data);
        setfdata(res.data.data);
      } else {
        setfdata([]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
    useEffect(() => {
      
        axiosInstance
        .post(`/viewDriverReqs`)
        .then((res) => {
          console.log(res, "drivers data reqs 1");

          if (res.data.data != undefined) {
            console.log(res, "drivers data reqs");
            setsdata(res.data.data);
          } else {
            setsdata([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    console.log(driverdata);

    const approvefn = (id) => {
      axiosInstance
        .post(`/acceptDriverById/${id}`)
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
  
    if (localStorage.getItem("adminlog") != 1) {
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
        else{
            
      return (
        
        <div className="productdiv1" style={{ minHeight: "450px" }}>
          <div className="main">
           
  
            <div class="accordion" id="accordionExample">
              <div class="divforTwohead">
               
             
                    <button onClick={()=>changeState(true)} className='sepButton'>
                    View All Drivers
                    </button>
                 
                    <button type="button" onClick={()=>changeState(false)} className='sepButton'>
                    View Driver Requests
                    </button>
               </div>
              
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div className="container">
                    {(oprMode.flag)? (
                      <div className="row">
                                              <div className="divDown">

                        {/* farmer details mapped */}
                        {driverdata.length ? (
                          driverdata.map((a) => {
                            return (
                              <div className="col-4">
                                <div class="card card-body"style={{ boxShadow: "10px 15px 5px grey"  }}>
                                  <div className="main">
                                    <div  >
                                      <div class="card-body">
                                        <h5 class="card-title">
                                          Driver name : {a.name}{" "}
                                          
                                           
                                        </h5>
                                        <p class="card-text">Email : {a.email}</p>
                                        <p class="card-text">
                                          {" "}
                                          Contact : {a.contact}
                                        </p>
                                         <p class="card-text">
                                          {" "}
                                          Licence : 
                                        </p>
                                        <p class="card-text">
                                          {" "}
                                          Place : {a.location} 
                                        </p>
                                        <img className='imgInDiv' src={`http://localhost:4009/${a.licence.originalname}`}/> 
                                       
                                        {/* <p class="card-text">
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
                                        </p> */}
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
                      </div>):(
                        <>
                        <div className='divDown'>
                        <div className="row">
                        {/* farmer details mapped */}
                        {driverreqs.length ? (
                          driverreqs.map((a) => {
                            return (
                              <div className="col-4">
                                <div class="card card-body"style={{ boxShadow: "10px 15px 5px grey"  }}>
                                  <div className="main">
                                    <div  >
                                      <div class="card-body">
                                        <h5 class="card-title">
                                          Name : {a.name}{" "}
                                         
                                        </h5>
                                        <p class="card-text">Email : {a.email}</p>
                                        <p class="card-text">
                                          {" "}
                                          Contact : {a.contact}
                                        </p>
                                         <p class="card-text">
                                          {" "}
                                          Licence : 
                                        </p>
                                        <p class="card-text">
                                          {" "}
                                          Place : {a.location} 
                                        </p>
                                        <img className='imgInDiv' src={`http://localhost:4009/${a.licence.originalname}`}/> 
                                       {/* <p class="card-text">
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
                                        </p> */}
                                                                                    <hr />

                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            delfn2(a._id);
                                          }}
                                        >
                                          {" "}
                                          Delete
                                        </button>
   
                                        
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
                      </>)}
                    </div>
                  </div>
                </div>



    
           
            </div>
          </div>
        </div>
      );
                       
    
    }

}

export default AdminDelivery