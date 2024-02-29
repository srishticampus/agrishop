import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../baseurl';
import "../../Assets/styles/delivery.css"
function DriverHome() {
  const mainnavigate = useNavigate();
  const [oprMode, setfOprMode] = useState({ flag: 0 });
  const [delreqs, setdelreqs] = useState([]);
  const [deliveries, setdeliveries] = useState([]);
  const [data, setdata] = useState({
    name: "",
    contact: "",
    pincode: "",
    password: "",
    image: null, email: ""
  });
  const changeState = (x) => {
    setfOprMode({ flag: x })
    console.log("mode changed");
    console.log("modeo", x);
  }
  const acceptOrder=(id,userid)=>{
    axiosInstance
    .post(`/acceptorderbyDriverId/${id}`,{driverid:localStorage.getItem(`driverid`),userid:userid})
    .then((res) => {
      console.log(res, "driver");
    })
    .catch((err) => {
      console.log(err, "error");
    });
  }
 
  useEffect(() => {

    if (localStorage.getItem(`driverid`) != null) {
      axiosInstance
        .post(`/viewDriverById/${localStorage.getItem(`driverid`)}`)
        .then((res) => {
          console.log(res, "driver");
          setdata(res.data.data)
        
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    else
      mainnavigate("/Login/driverlog")

    // upcoming deliveries
    axiosInstance
      .post(`/viewOrdersforDelivery`)
      .then((res) => {
        console.log(res);
        if(res.data.data.length>0)
        setdelreqs(res.data.data)
      else
      setdelreqs(null)
      })
      .catch((err) => {
        console.log(err, "error");
      });
    // reqs deliveries

    axiosInstance
    .post(`/viewOrdersbyDriverId/${localStorage.getItem(`driverid`)}`)
    .then((res) => {
       console.log(res);
       if(res.data.data.length>0)

       setdeliveries(res.data.data)
       else
       setdeliveries(null)
    }) 
    .catch((err) => {
      console.log(err, "error");
    });


  }, [])
  console.log(data);
  console.log("delreqs",delreqs);
  console.log("deliveries",deliveries);

  return (

    <div className="productdiv1" style={{ minHeight: "450px" }}>
      <div className="main">
        <div class="divforTwohead">


          <button onClick={() => changeState(0)} className='sepButton'>
            Upcoming Deliveries
          </button>

          <button type="button" onClick={() => changeState(1)} className='sepButton'>
            Delivery Requests
          </button>



        </div>

        <div class="accordion-body">
          <div className="container">
            {(oprMode.flag == 0) ? (
              <div className="row">
                <div className="divDown">

                  
                  {(deliveries.length>0)? (
                    deliveries.map((a, i) => {
                      return (
                        <div className="col-4">
                          <p>huhuhuh</p>
                          <div class="card card-body" style={{ boxShadow: "10px 15px 5px grey" }}>
                            <div className="main">
                              <div  >
                                <div class="card-body">
                                   <h5 class="card-title">
                                          Customer name : {a.userid.name}{" "}
                                          
                                           
                                        </h5>
                                        <p class="card-text">Delivery Status : {a.status}</p>
                                        <p class="card-text">
                                          {" "}
                                          Contact : {a.userid.contact}
                                        </p>
                                    <p class="card-text">Email : {a.userid.email}</p>
                                       

                                            <p class="card-text">
                                          {" "}
                                          City : {a.userid.city} 
                                        </p>
                                        
                                   <p class="card-text">
                                          {" "}
                                          Districct : {a.userid.district}
                                        </p>
                                       
                                        <p class="card-text">
                                          {" "}
                                          pincode : {a.userid.pincode}
                                        </p> 
                                       
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      mainnavigate(`/delivery/updateStatus/${a._id}/${a.userid._id}`)
                                    }}
                                  >
                                    {" "}
                                    Update Status

                                  </button>

                              
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
              </div>) : (

                
                <div className="row">
                <div className="divDown">

                  {/* farmer details mapped */}
                  {delreqs.length ? (
                    delreqs.map((a, i) => {
                      return (
                        <div className="col-4">
                          <div class="card card-body" style={{ boxShadow: "10px 15px 5px grey" }}>
                            <div className="main">
                              <div  >
                                <div class="card-body">
                                   <h5 class="card-title">
                                          Customer name : {a.userid.name}{" "}
                                          
                                           
                                        </h5>
                                        <p class="card-text">Email : {a.userid.email}</p>
                                        <p class="card-text">
                                          {" "}
                                          Contact : {a.userid.contact}
                                        </p>
                                         <p class="card-text">
                                          {" "}
                                          Licence : 
                                        </p>
                                        <p class="card-text">
                                          {" "}
                                          City : {a.userid.city} 
                                        </p>
                                        
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
                                      acceptOrder(a._id,a.userid._id);
                                    }}
                                  >Accept Order
                                    {" "}
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
            )}
          </div>
        </div>
      </div>
    </div>



  )
}

export default DriverHome