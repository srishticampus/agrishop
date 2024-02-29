import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
function FarmerLog() {
  const navigate = useNavigate();
  // redirect (navigate  = useNavigate )

  const [data, setdata] = useState({
    contact: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("farmerid") != null) {
      navigate("/home");
    }
  });
  const subfn = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/loginFarmer", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          localStorage.setItem("farmerid", res.data.data._id);
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
            "url('https://img.freepik.com/premium-vector/organic-fruit-color-illustration-man-holding-box-bananas-apples-watermelons-male-character-storage-room-with-shelves-farming-cartoon-character-white-background_151150-1243.jpg?w=900')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title">Farmer Login Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Contact</label>
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
                <Link to="/Fotgotpassfarm"> Forgot Password? </Link>
                <hr />
                <Link to="/register/FarmReg">
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

export default FarmerLog;
