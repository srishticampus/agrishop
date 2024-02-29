import React from "react";
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from "../../baseurl";

function AdminKB() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      navigate("/admin");
    }
  });

  const [KBdata, setkbdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const delfn3 = (id) => {
    console.log(id);
    axiosInstance
      .post(`/deletekrishiById/${id}`)
      .then((res) => {
        console.log(res);
        alert("Deleted Krishi Bhavan")
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
  }, []);

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv1" style={{ minHeight: "450px" }}>
        <div className="main">
         

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
              <h1 style={{textAlign:"center"}}
                >
                  View all Krishi Bhavan
                </h1>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="container">
                    <div className="row">
                      {/* KBdata details mapped */}
                      {KBdata.length ? (
                        KBdata.map((a) => {
                          return (
                            <div className="col-4">
                              <div class="card card-body" style={{ boxShadow: "10px 15px 5px grey"  }}>
                                <div className="main">
                                  <div>
                                    <div class="card-body">
                                      <h5 class="card-title">
                                        Krishi Bhavan Village : {a.village}
                                      </h5>
                                      <p class="card-text">
                                        {" "}
                                        Register : {a.regNo}
                                      </p>
                                      <p class="card-text">Pin : {a.pincode}</p>
                                      <p class="card-text">
                                        District : {a.district}
                                      </p>

                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          delfn3(a._id);
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
                      {/* KBData details mapped */}{" "}
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

export default AdminKB;
