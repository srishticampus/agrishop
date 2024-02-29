import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import profilepic from "../Assets/img/customerprofile.jpeg";
import ViewCompensation from "./ViewCompensation";
import QRCode from "qrcode.react";
function FarmerProfile() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("farmerid") == null) {
      // alert("You're not a Farmer. please log in to view this page.");
      navigate("/home");
    }
  });

  const [color1, setcolor] = useState("");
  const [display, setdisplay] = useState("");

  const [status, setstatus] = useState({ status: "", data: {} });
  const [editprofile, seteditprofile] = useState("");
  const [profile, setprofile] = useState({});
  const [data, setdata] = useState({
    name: "",
    age: "",
    contact: "",
    city: "",
    district: "",
    pincode: "",
    password: "",
    aadhar: "",
    localbody: "",
  });
  const [dispstatus, setdispstatus] = useState("");

  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    axiosInstance
      .post(`/viewFarmerById/${localStorage.getItem("farmerid")}`)
      .then((res) => {
        // console.log(res);
        setprofile(res.data.data);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/checkIdStatus/${localStorage.getItem("farmerid")}`)
      .then((res) => {
        console.log(res, "checkstatus");

        if (res.data.idstatus == "Approved") {
          setcolor("green");
          setdisplay("block");
          setstatus({
            ...status,
            status: res.data.idstatus,
            data: res.data.data,
          });
          setdispstatus("block");
        } else {
          setcolor("red");
          setdisplay("none");
          setstatus({
            ...status,
            status: res.data.idstatus,
            data: {
              name: "",
              _id: "Not yet created. Please wait for Krishi bhavan to approve",
            },
          });
          setdispstatus("none");
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
        .post(`/deleteFarmerById/${localStorage.getItem("farmerid")}`)
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

  const subfn = (e) => {
    e.preventDefault();

    if(data.pincode.length==6){
      axiosInstance
      .post(`/editFarmerById/${localStorage.getItem("farmerid")}`, data)
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
    }
  };

  return (
    <div className="productdiv1" style={{ minHeight: "500px" }}>
      <div style={{ position: "relative", top: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: " 'Edu SA Beginner', cursive",
            color: color1,
          }}
        >
          Hi {profile.name}. Welcome to your profile.
        </h2>

        <div className="container text-center">
          <div className="row">
            {/* edit */}
            <div className="col-5">
           
              <div class="card">
                <div class="card-body">
                <>
                    <img 
                    
                      height="200"
                      src="https://www.nicepng.com/png/full/75-752613_indian-farmer-png-indian-farmer-logo-png.png"
                      class="card-img-top"
                      alt="..."
                    />
                    </>
                  <h5 class="card-title">
                    {data.name}
                    
                   
                  </h5>
                  <p class="card-text">Age : {data.age}</p>
                  <p class="card-text">Contact : {data.contact}</p>
                  <p class="card-text">Village : {data.village}</p>
                  <p class="card-text">City : {data.city}</p>
                  <p class="card-text">District : {data.district}</p>
                  <p class="card-text">Pincode : {data.pincode}</p>
                  <p class="card-text">Aadhar : {data.aadhar}</p>
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

            {/* view comp and id */}
            <div className="col-7">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      View Compensation
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ViewCompensation />
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
                      onClick={() => {
                        if (editprofile == "col-8") {
                          seteditprofile("");
                        } else if (editprofile == "") {
                          seteditprofile("col-8");
                        }
                      }}
                    >
                      View ID Card
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div
                        class="card"
                        // style={{ width: "400px", margin: "auto" }}
                      >
                        <h1 style={{ color: "green" }}> ID Card</h1>
                        <h1 style={{ margin: "auto", width: "250px" }}>
                          {" "}
                          <QRCode
                            id="123456"
                            value={JSON.stringify(status.data)}
                            size={250}
                            level={"H"}
                            includeMargin={true}
                            style={{ display: dispstatus }}
                          />
                        </h1>
                        <div class="card-body">
                          <h1 style={{ color: color1 }}> {status.status}</h1>
                          <h2 class="card-text" style={{ display: dispstatus }}>
                            Name: {status.data.name}
                          </h2>
                          <h2 class="card-text" style={{ display: dispstatus }}>
                            ID : {status.data._id}
                          </h2>
                          <a
                            style={{ display: display }}
                            className="btn btn-success"
                            onClick={downloadQR}
                          >
                            Download QR
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
        <br />
        <hr />

        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
              <div class="wrapper wrapper--w680">
                <div class="card card-4">
                  <div class="card-body">
                    <h2 class="title"> Edit Profile</h2>
                    <form onSubmit={subfn}>
                      <div class="row row-space">
                        <div class="col-8">
                          <div class="input-group">
                            <label class="label"> Name</label>
                            <input
                              class="input--style-4"
                              type="text"
                              name="name"
                              value={data.name}
                              minLength="1"
                              maxLength="20"
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
                              min="1"
                              max="120"
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
                              name="contact"
                              value={data.contact}
                              minLength="10"
                              maxLength="10"
                              onChange={changefn}
                              required
                            />
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="input-group">
                            <label class="label">city</label>
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
                        <div class="col-5">
                          <div class="input-group">
                            <label class="label">District</label>
                            <input
                              class="input--style-4"
                              type="text"
                              name="district"
                              value={data.district}
                              minLength="1"
                              maxLength="20"
                              onChange={changefn}
                              required
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-7">
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
                        <div class="col-6">
                          <div class="input-group">
                            <label class="label">Aadhar</label>
                            <input
                              class="input--style-4"
                              type="text"
                              name="aadhar"
                              minLength="12"
                              maxLength="12"
                              value={data.aadhar}
                              onChange={changefn}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div>
                        <br />
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          required
                          name="gender"
                          onChange={changefn}
                        >
                          <option>Select a Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div> */}
                      <div class="p-t-15">
                        <button class="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
