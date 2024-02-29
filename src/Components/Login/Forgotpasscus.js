import React, { useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Forgotpasscus() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [pass2, setpass2] = useState("");

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const subfn = (e) => {
    e.preventDefault();

    if (data.password === pass2) {
      axiosInstance
        .post("/forgotpwdCustomer", data)
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            alert("Successfully changed your password.");
            navigate("/login/cuslog");
          } else {
            alert("Something went wrong. Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong. Please try again");
        });
    } else {
      alert("Password was invalid. Please enter the same password.");
    }
  };
  return (
    <div>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/cartoon-character-chooses-healthy-tropical-foods-vector-girl-drawn-by-hand-buys-products-online-store-delivery-exotic-fruits-your-home-all-elements-are-isolated-white-background_559428-418.jpg?w=740')",
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat"}}>
        <div className="formcontainer">
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Customer Change Password</h2>
              <form onSubmit={subfn}>
                <div class="row row-space">
                  <div class="col-12">
                    <div class="input-group">
                      <label class="label"> Email</label>
                      <input
                        class="input--style-4"
                        type="email"
                        name="email"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-group">
                      <label class="label">Enter new Password</label>
                      <input
                        class="input--style-4"
                        type="password"
                        name="password"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-group">
                      <label class="label">Enter new password again</label>
                      <input
                        class="input--style-4"
                        type="password"
                        name="password"
                        onChange={(e) => {
                          setpass2(e.target.value);
                        }}
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

export default Forgotpasscus;
