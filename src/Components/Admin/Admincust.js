import React from "react";
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from "../../baseurl";
function Admincust() {
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

  const [data, setdata] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

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
  }, []);

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv1" style={{ minHeight: "400px" }}>
        <div className="main">
         

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <h1 style={{textAlign:"center"}}
                >
                  View all Customers
                </h1>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* customer details mapped */}
                      {customerdata.length ? (
                        customerdata.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body" style={{ boxShadow: "10px 15px 5px grey"  }}>
                                <div className="main">
                                  <div >
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Customer name : {a.name}
                                      </h5>
                                      <p class="card-text"> Age : {a.age}</p>
                                      <p class="card-text">
                                        {" "}
                                        Email : {a.email}
                                      </p>
                                      <p class="card-text">
                                        {" "}
                                        Contact : {a.contact}
                                      </p>
                                      <p class="card-text"> City : {a.city}</p>
                                      <p class="card-text">
                                        {" "}
                                        Pincode : {a.pincode}
                                      </p>

                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          delfn(a._id);
                                        }}
                                      >
                                        {" "}
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div class="card" style={{ width: "18rem;" }}>
                          <div class="card-body">
                            <h5 class="card-title">No Data to display</h5>
                          </div>
                        </div>
                      )}
                      {/* customer details mapped */}
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

export default Admincust;
