import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import profilepic from "../Assets/img/customerprofile.jpeg";

function KBProfile() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("kblogid") == null) {
      // alert("You're not Krishi Bhavan. please log in to view this page.")
      navigate("/home");
    }
  });
  
  const [data, setdata] = useState({
    village: "",
    regNo: "",
    pincode: "",
    contact: "",
    district: "",
    email: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewkrishiById/${localStorage.getItem("kblogid")}`)
      .then((res) => {
        console.log(res, "viewkb");
       if(res.data.data!=undefined){
        setdata(res.data.data);
       }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const deletefn = () => {
    let x = prompt("Are you sure you want to delete? (Yes/No) ");
    if (x.toLowerCase() == "yes") {
      axiosInstance
        .post(`/deletekrishiById/${localStorage.getItem("kblogid")}`)
        .then((res) => {
          console.log(res);
          alert("deleted")
          localStorage.clear()
          window.location.reload(false)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("did not delete");
    }
  };

  const submitfn = (e) => {
    e.preventDefault();
    if(data.pincode.length==6){
      axiosInstance
      .post(`/editkrishiById/${localStorage.getItem("kblogid")}`, data)
      .then((res) => {
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    }
  };

  return (
    <div className="productdiv1" style={{ minHeight: "700px" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>
          Hi {data.village} Krishi Bhavan, Welcome to your profile. <br />
        </h2>


      <div style={{padding:"20px"}}>
      <div class="">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div class="card" style={{ width: "400px", margin: "auto" }}>
                  <img
                    src={profilepic}
                    class="card-img-top"
                    alt="alt"
                    height={"200px"}
                    width={"100px"}
                  />
                  <div class="card-body">
                    <h5 class="card-title">Village : {data.village}</h5>
                    <p class="card-text">Email : {data.email} </p>
                    <p class="card-text">Contact : {data.contact} </p>
                    <p class="card-text">Pincode : {data.pincode} </p>

                    <button
                      class="btn btn-primary"
                      style={{ margin: "0px 20px" }}
                      onClick={deletefn}
                    >
                      Delete Profile
                    </button>
                    <p class="d-inline-flex gap-1">
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Edit Profile
                    </button>
                  </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  class="collapse multi-collapse show"
                  id="multiCollapseExample1"
                  style={{
                    position: "relative",
                    top: "100px",
                    margin: "0px 0px 100px",
                  }}
                >
                  <div class="collapse" id="collapseExample">
                    <div class="">
                      <div
                        class="card card-body"
                        style={{ position: "relative", bottom: "100px" }}
                      >
                        <div className="">
                          <form onSubmit={submitfn}>
                            <div class="wrapper wrapper--w780">
                              <div class="card card-4">
                                <div class="card-body">
                                  <h2 class="title"> Profile Edit Form</h2>
                                  <div class="row row-space">
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label"> Village</label>
                                        <input
                                          class="input--style-4"
                                          type="text"
                                          name="village"
                                          value={data.village}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label">District</label>
                                        <input
                                          class="input--style-4"
                                          type="text"
                                          name="district"
                                          value={data.district}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label">Pincode</label>
                                        <input
                                          class="input--style-4"
                                          type="tel"
                                          minLength="6"
                                          maxLength="6"
                                          name="pincode"
                                          value={data.pincode}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label">Contact</label>
                                        <input
                                          class="input--style-4"
                                          type="tel"
                                          minLength="10"
                                          maxLength="10"
                                          name="contact"
                                          value={data.contact}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label">Email</label>
                                        <input
                                          class="input--style-4"
                                          type="email"
                                          name="email"
                                          value={data.email}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-6">
                                      <div class="input-group">
                                        <label class="label">Password</label>
                                        <input
                                          class="input--style-4"
                                          type="password"
                                          name="password"
                                          value={data.password}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="input-group">
                                        <label class="label">Reg No.</label>
                                        <input
                                          class="input--style-4"
                                          type="number"
                                          name="regno"
                                          value={data.regNo}
                                          onChange={changefn}
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="p-t-15" style={{ margin: "10px" }}>
                                  <button class="btn btn-primary" type="submit">
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default KBProfile;
