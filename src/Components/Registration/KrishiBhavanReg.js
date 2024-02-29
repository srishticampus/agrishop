import React, { useState } from "react";

import AxiosInstance from "../../baseurl";
import { Navigate, useNavigate } from "react-router-dom";

function KrishiBhavanReg() {
  const loginpage = useNavigate();
  const [data, setdata] = useState({
    village: "",
    email: "",
    pincode: "",
    contact: "",
    district: "",
    password: "",
    regNo: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const subfn = (e) => {
    e.preventDefault();
    if(data.pincode.length==6){
      AxiosInstance.post("/registerkrishi", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert("Registered Successfully");
          loginpage("/Login/kblog");
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        alert("Something went wrong. Please try again");
      });
    }
  };
  return (
    <div>
      <div
        class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/5f9aeda2f9f28106a3123cb7/2ef8abf3-21b7-4e82-a0ff-7c8c62f201e3/Farmer+Pesticide+Rectangle+AW.jpg?format=1500w')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title"> Krishi Bhavan Registration Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Village</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="village"
                          minLength="1"
                          maxLength="20"
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
                          name="pincode"
                          minLength="6"
                          maxLength="6"
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
                          min="1"
                          max="120"
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
                          minLength="1"
                          maxLength="20"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group">
                        <label class="label">Reg No.</label>
                        <input
                          class="input--style-4"
                          type="number"
                          name="regNo"
                          minLength="1"
                          maxLength="30"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
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

export default KrishiBhavanReg;
