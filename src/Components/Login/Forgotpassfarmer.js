import React, { useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function Forgotpassfarmer() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    contact: "",
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
        .post("/forgotPwdFarmer", data)
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            alert("Successfully changed your password.");
            navigate("/login/farmlog");
          } else {
            alert("Something went wrong. Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Password was invalid. Please enter the same password.");
    }
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
                <h2 class="title">Farmer Change Password</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Contact</label>
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

export default Forgotpassfarmer;
