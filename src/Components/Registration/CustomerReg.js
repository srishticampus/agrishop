import React, { useState } from "react";

import AxiosInstance  from "../../baseurl";
import { Navigate, useNavigate } from "react-router-dom";

function CustomerReg() {
  const loginpage = useNavigate();
  const [data, setdata] = useState({
    name: "",
    age: "",
    city: "",
    pincode: "",
    district: "",
    contact: "",
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const subfn = (e) => {
    e.preventDefault();
    AxiosInstance
      .post("/registercustomer", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert("Registered Successfully");
          loginpage("/Login/cuslog");
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        alert("Something went wrong. Please try again")
      });
  };
  return (
    <div>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/cartoon-character-chooses-healthy-tropical-foods-vector-girl-drawn-by-hand-buys-products-online-store-delivery-exotic-fruits-your-home-all-elements-are-isolated-white-background_559428-418.jpg?w=740')",
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat"}}
      >
         <div className="formcontainer">
         <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title"> Customer Registration Form</h2>
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
                  <div class="col-4">
                    <div class="input-group">
                      <label class="label">Age</label>
                      <input
                        class="input--style-4"
                        type="number"
                        name="age"
                        min="1"
                        max="120"
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
                        minLength="1"
                        maxLength="30"
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
                        minLength="1"
                        maxLength="40"
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
                        minLength="5"
                        maxLength="30"
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

export default CustomerReg;
