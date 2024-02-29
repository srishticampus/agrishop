import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function ViewGuidelines() {
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
      .post(`/viewGuidelines/${localStorage.getItem("farmerid")}`, data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.data != undefined) {
          setdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        alert("Something went wrong. Please try again");
      });
  }, []);
  return (
    <div className="productdiv1" style={{ minHeight: "500px" }}>
      <div class="container text-center productdiv">
        <div class="row">
          {data.length ? (
            data.map((a) => {
              return (
                <div className="col-4" style={{ margin: "20px 0px" }}>
                  <div class="card" style={{boxShadow:"10px 15px 5px grey"}}>
                    <div class="card-body">
                      <div class="alert alert-primary" role="alert">
                        <h3> {a.title} <br/></h3>
                        
                      </div>

                      <h5 class="card-text"><span class="badge bg-secondary">{a.category}</span>
                      <br/>{a.contents}</h5>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12" style={{ margin: "20px 0px" }}>
              <div class="card">
                <div class="card-body">
                  <h4> No Data</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewGuidelines;
