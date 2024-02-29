import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function ViewCompensation() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("farmerid") == null) {
      // alert("You're not a Farmer. please log in to view this page.")
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewCompensation/${localStorage.getItem("farmerid")}`, data)
      .then((res) => {
        console.log(res, "view compensation");
        if (res.data.status == 500) {
          setdata([]);
        } else {
          setdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        alert("Something went wrong. Please try again");
      });
  }, []);
  return (
    <div className="productdiv1">
      <div class="container text-center productdiv">
        <div class="row">
          {data.length ? (
            data.map((a) => {
              return (
                <div className="col-12" style={{ margin: "20px 0px" }}>
                  <div class="card" style={{ boxShadow: "10px 15px 5px grey"  }}>
                    <div class="card-body">
                      <h3 class="card-title" style={{color:"red"}}>Category: {a.category}</h3>

                      <h4 class="card-text">Contents {a.contents}</h4>

                      <h3>
                        {" "}
                        <span
                          class="badge bg-secondary"
                          style={{ width: "300px" }}
                        >
                          Date : {a.date.slice(0, 10)}
                        </span>
                      </h3>
                      <h3>
                        <span
                          class="badge bg-secondary"
                          style={{ width: "300px" }}
                        >
                          {" "}
                          End Date : {a.endDate.slice(0, 10)}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <div class="card">
                <div class="card-body">
                  <h4> No data to display</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCompensation;
