import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";

function ViewFarmers() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("kblogid") == null) {
      // alert("You're not Krishi Bhavan. please log in to view this page.")
      navigate("/home");
    }
  });
  const [mydata, setmydata] = useState({});
  const [farmerdata, setfdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [apprfarmerdata, setaprfdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [complaints, setcomplaints] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);
  useEffect(() => {
    if (localStorage.getItem("kblogid") == null) {
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewFarmerReqs/${localStorage.getItem("kblogid")}`)
      .then((res) => {
        console.log(res, "apprfarmer");

        if (res.data.data != undefined) {
          setaprfdata(res.data.data);
        } else {
          setaprfdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllFarmers`)
      .then((res) => {
        if (res.data.data != undefined) {
          console.log(res, "farmer");
          setfdata(res.data.data);
        } else {
          setfdata([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewFarmerComplaints/${localStorage.getItem("kblogid")}`)
      .then((res) => {
        console.log(res, "complaints");

        if (res.data.data != undefined) {
          setcomplaints(res.data.data);
        } else {
          setcomplaints([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewkrishiById/${localStorage.getItem("kblogid")}`)
      .then((res) => {
        console.log(res, "mydata");
        if (res.data.data != undefined) {
          setmydata(res.data.data);
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
  const deletefn = (id) => {
    axiosInstance
      .post(`/deleteFarmerById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Deleted");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="productdiv1" style={{ minHeight: "500px" }}>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              View All Farmers
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {/* farmer details mapped */}
                  {farmerdata.length ? (
                    farmerdata.map((a) => {
                      if (a.village == mydata.village) {
                        return (
                          <div className="col-4">
                            <>
                              <div className="main">
                                <div
                                  class="card"
                                  style={{ boxShadow: "10px 15px 5px grey" }}
                                >
                                  <div class="card-body">
                                    <h5 class="card-title">
                                      Farmer name : {a.name}{" "}
                                      {a.isactive ? (
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/768px-Twitter_Verified_Badge.svg.png?20230122073352"
                                          height={40}
                                        />
                                      ) : null}
                                    </h5>
                                    <p class="card-text">Age : {a.age}</p>
                                    <p class="card-text">
                                      Contact : {a.contact}
                                    </p>
                                    <p class="card-text">
                                      Village : {a.village}
                                    </p>
                                    <p class="card-text">
                                      Pincode : {a.pincode}
                                    </p>
                                    <p class="card-text">
                                      District : {a.district}
                                    </p>
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

                                        <button
                                          className="btn btn-danger"
                                          style={{margin:"20px"}}
                                          onClick={() => {
                                            deletefn(a._id);
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="col">
                      <div class="card" style={{ width: "18rem;" }}>
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* farmer details mapped */}
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Farmer Complaints
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {/* farmer details mapped */}
                  {complaints.length ? (
                    complaints.map((a) => {
                      return (
                        <div className="col-4">
                          <div className="main">
                            <div
                              class="card"
                              style={{ boxShadow: "10px 15px 5px grey" }}
                            >
                              <div class="card-body">
                                <h5 class="card-title">
                                  Farmer name : {a.name}
                                </h5>
                                <p class="card-text">Village : {a.village}</p>
                                <p class="card-text">Contact : {a.contact}</p>

                                <p class="card-text">Category : {a.category}</p>
                                <p class="card-text">
                                  Description : {a.description}
                                </p>

                                <Link
                                  to={`/compensation/${a.farm_id}/${a._id}`}
                                  className="btn btn-primary"
                                >
                                  Allow compensation
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="card">
                      <div class="card-body">
                        <h5 style={{ textAlign: "center" }} class="card-title">
                          No Data to display
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
                {/* farmer details mapped */}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFarmers;
