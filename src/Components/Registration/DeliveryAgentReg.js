import React, { useState } from "react";

import AxiosInstance from "../../baseurl";
import { Navigate, useNavigate } from "react-router-dom";
import "../../Assets/styles/delivery.css"

function DeliveryAgentReg() {
  const loginpage = useNavigate();
  const [data, setdata] = useState({
    name: "",
    contact: "",
    pincode: "",
    password: "",
    image: null,email:""
    
  });
  const changefn = (e) => {
    console.log(e.target.value);
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setdata({ ...data, image: file });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  const subfn = (e) => {
    e.preventDefault();
    console.log("data",data);
    if(data.pincode.length==6){
      AxiosInstance.post("/registerDriver", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert("Registered Successfully");
          loginpage("/Login/driverlog");
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
    }
    else{
      alert("Pincode should have 6 characters")
    }
  };
  return (
    <div>
      <div
        class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/delivery-man-with-face-mask-delivering-order-motorcycle_154993-160.jpg?size=626&ext=jpg')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="form1">
          <div class="wrapper wrapper--w680">
            <div class="card card-5">
              <div class="card-body">
                <h2 class="title"> Delivery Agent Registration Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-8">
                      <div class="input-group">
                        <label class="label"> Name</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="name"
                          minLength="1"
                          maxLength="20"
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
                          minLength="10"
                          maxLength="10"
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
                          type="tel"
                          name="email"
                       
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group">
                        <label class="label">Location</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="location"
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
                          type="number"
                          
                          name="pincode"
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
                          minLength='6'
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label">Upload Licence</label>
                        <input
                          class="input--style-4"
                          type="file"
                          minLength="12"
                          maxLength="12"
                          name="image"
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
        </div>
      </div>
    </div>
  );
}

export default DeliveryAgentReg;
