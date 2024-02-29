import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
function CusLog() {
  const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("customerlogid") != null) {
      mainnavigate("/home");
    }
  });

  const subfn = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/loginCustomer", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          localStorage.setItem("customerlogid", res.data.data._id);
          alert("login successfull");
          window.location.reload(false);
        } else {
          alert("Error. Please try again");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        if (err.message == "Request failed with status code 500") {
          alert("Something went wrong. Please try again");
        }
      });
  };
  return (
    <div >
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins" 
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/cartoon-character-chooses-healthy-tropical-foods-vector-girl-drawn-by-hand-buys-products-online-store-delivery-exotic-fruits-your-home-all-elements-are-isolated-white-background_559428-418.jpg?w=740')",
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat"
      }}>
        <div className="formcontainer">
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title">Customer Login Form</h2>
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
                  </div>
                  <div class="p-t-15">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <br />
                <Link to="/Fotgotpasscus"> Forgot Password? </Link>
                <hr />
                <Link to="/register/CusReg">
                  {" "}
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CusLog;
