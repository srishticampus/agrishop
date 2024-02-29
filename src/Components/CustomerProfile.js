import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import profilepic from "../Assets/img/customerprofile.jpeg";

function CusProfile() {
  let navigate = useNavigate();
  const [profile, setprofile] = useState({});
  const [data, setdata] = useState({
    name: "",
    age: "",
    email: "",
    city: "",
    pincode: "",
    contact: "",
    district: "",
  });

  useEffect(() => {
    if (localStorage.getItem("customerlogid") == null) {
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewCustomerById/${localStorage.getItem("customerlogid")}`)
      .then((res) => {
        console.log(res, "result");
        setprofile(res.data.data);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
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
        .post(`/deleteCustomerById/${localStorage.getItem("customerid")}`)
        .then((res) => {
          console.log(res);
          localStorage.clear();
          window.location.reload(false);
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
    axiosInstance
      .post(`/editCustomerById/${localStorage.getItem("customerlogid")}`, data)
      .then((res) => {
        if (res.data.status == 500) {
          console.log(res);
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
  };

  return (
    <div className="productdiv1" style={{ minHeight: "700px" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>
          Hi {profile.name} Welcome to your profile. <br />
        </h2>
        <div class="card card-body">
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
                    <h5 class="card-title">Name : {profile.name}</h5>
                    <p class="card-text">Age : {profile.age} </p>
                    <p class="card-text">City : {profile.city} </p>
                    <p class="card-text">District : {profile.district} </p>
                    <p class="card-text">Pincode : {profile.pincode} </p>
                    <p class="card-text">Email : {profile.email} </p>
                    <p class="card-text">Contact : {profile.contact} </p>


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
                    {/* <p style={{ textAlign: "center" }}>
                  <button
                    class="btn btn-primary"
                    style={{ margin: "20px 20px" }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#multiCollapseExample1"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample2"
                  >
                    Edit Profile
                  </button>
                </p> */}
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
                            <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
                              <div class="wrapper wrapper--w680">
                                <div class="card card-4">
                                  <div class="card-body">
                                    <h2 class="title"> Profile Edit Form</h2>
                                    <div class="row row-space">
                                      <div class="col-8">
                                        <div class="input-group">
                                          <label class="label"> Name</label>
                                          <input
                                            class="input--style-4"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={changefn}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div class="input-group">
                                          <label class="label">Age</label>
                                          <input
                                            class="input--style-4"
                                            type="number"
                                            name="age"
                                            value={data.age}
                                            onChange={changefn}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div class="col-6">
                                        <div class="input-group">
                                          <label class="label">City</label>
                                          <input
                                            class="input--style-4"
                                            type="text"
                                            name="city"
                                            value={data.city}
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
                                      <div class="col-12">
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
                                    </div>

                                    <div class="p-t-15">
                                      <button
                                        class="btn btn-primary"
                                        type="submit"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div>
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
            </div>
          </div>
          <div className="main"></div>
        </div>
      </div>
    </div>
  );
}

export default CusProfile;
