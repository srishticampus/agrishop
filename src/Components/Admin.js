import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLog() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("customerlogid") != null) {
      alert(
        "Please logout from your current account and login as an admin,if you want to access admin panel"
      );
      navigate("/home");
    }

    if(localStorage.getItem(`adminlog`)!=null){
      navigate('/admin/adminpage')
    }
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    if (data.name == "admin" && data.password == "admin12345") {
      localStorage.setItem("adminlog", 1);
      alert("Logged in ");
      window.location.reload(false)
      // navigate("/Admin/Adminpage");
    }
  };

  return (
    <div >
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
       style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/5fc881f0a8a7305318af122b/1611636539092-3A1YPLWHFOFMHBEQ09M2/YRECentral_Your-admin-simplified.gif?format=1500w')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="formcontainer">
          <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Admin Login Form</h2>
              <form onSubmit={submitfn}>
                <div class="row row-space">
                  <div class="col-12">
                    <div class="input-group">
                      <label class="label"> Name</label>
                      <input
                        class="input--style-4"
                        type="text"
                        name="name"
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
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLog;
