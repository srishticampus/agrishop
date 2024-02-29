import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function KBLog() {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("kblogid") != null) {
      navigate("/home");
    }
  });
  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginkrishi", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          localStorage.setItem("kblogid", res.data.data._id);
          alert("login successfull");
          window.location.reload(false);
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
                <h2 class="title">Krishi Bhavan Login Form</h2>
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
                <Link to="/Fotgotpasskb"> Forgot Password? </Link>
                <hr />
                <Link to="/register/KBReg">
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

export default KBLog;
