import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../baseurl';
import "../../Assets/styles/delivery.css"
function UpdateStatus() {
  const ids = useParams();
  const mainnavigate = useNavigate();

  const [data, setdata] = useState({
    status: "Picked Up",
    comments: "",
    orderid: ids.orderid
  });
  const changefn = (e) => {
    console.log("onchange worked",e.target.value);
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const subfn = (e) => {
    e.preventDefault();
    console.log("data", data);
    axiosInstance
      .post("/updateStatusByDriverId", data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert(" Status Updated Successfully");

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
          backgroundImage: "url('https://img.freepik.com/free-vector/way-concept-illustration_114360-1191.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700179200&semt=ais')",
          backgroundSize: "450px 400px",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat"
        }}>
        <div className="form1">
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title">Update Delivery Status</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Satus</label> &nbsp;&nbsp;
                        <select name="status"  class="input--style-4" onChange={changefn}>

                          <option value="Picked Up">Picked Up</option>
                          <option value="On The Way">On The Way</option>

                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label">Comments</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="comments"
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
                <hr />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default UpdateStatus