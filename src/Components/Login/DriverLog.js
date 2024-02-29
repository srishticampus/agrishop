import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../baseurl';
import "../../Assets/styles/delivery.css"


function DriverLog() {
    const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("driverlog") != null) {
      mainnavigate("/home");
    }
  });

  const subfn = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/loginDriver", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert("login successfull");
          localStorage.setItem("driverid", res.data.data._id);

          mainnavigate("/Delivery/driverhome")
          window.location.reload(false);
        } else {
          alert(res.data.msg);
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
      backgroundImage: "url('https://img.freepik.com/free-vector/man-riding-scooter-white-background_1308-46379.jpg?size=626&ext=jpg&ga=GA1.1.898403074.1704362851&semt=ais')",
      backgroundSize: "contain",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="form1">
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Delivery Agent Login</h2>
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
              <Link to="/Fotgotpassdriver"> Forgot Password? </Link>
              <hr />
              <Link to="/register/DriverReg">
                {" "}
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DriverLog
