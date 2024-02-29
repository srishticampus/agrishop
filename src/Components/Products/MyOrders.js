import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function MyOrders() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewMyOrdersByFarmId/${localStorage.getItem("farmerid")}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("farmerid") == null) {
      // alert("You're not a farmer. please log in to view this page.")
      navigate("/home");
    }
  });

  return (
    <div className="productdiv1" style={{ minHeight: "450px" }}>
       <div className="farmordertopvid">
        <h1 style={{textAlign:'center', position:"relative", top:"190px", color:"black", }}> My Orders</h1>
      </div>
      <div class="container text-center productdiv">
        <div class="row">
          {data.length ? (
            data.map((a,index) => {
              return (
                <>           
                  <div class="alert alert-primary" role="alert">
                    <h1 style={{textAlign:"left"}}> Order {index+1}</h1>
                  </div>
                  <div className="col-4" style={{ margin: "20px 0px" }}>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          Ordered Customer : {a.userid.name}
                        </h5>
                        <p> Contact : {a.userid.contact}</p>
                        <p> Ordered Date : {a.date.slice(0,10)}</p>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                      <h1> Total : {a.total}rs</h1>
                      </div>
                    </div>

                  
                  </div>
                  <div className="col-8">
                    {a.products.length
                      ? a.products.map((a, index) => {
                          return (
                            <div
                              className="row"
                              style={{
                                border: "2px solid black",
                                margin: "20px",
                              }}
                            >
                              <div className="col">
                                {" "}
                                Product <hr />
                                {a.product.name}
                              </div>
                              <div className="col">
                                {" "}
                                Category <hr /> {a.product.category}
                              </div>
                              <div className="col">
                                {" "}
                                Description <hr />
                                {a.product.description}
                              </div>
                              <div className="col">
                                {" "}
                                Price <hr />
                                {a.product.price}rs
                              </div>
                              <div className="col">
                                {" "}
                                Weight <hr />
                                {a.count}kg
                              </div>
                              <div className="col-4">
                                {" "}
                                <img
                                  src={`http://localhost:4009/${a.product.image.originalname}`}
                                  height={200}
                                />
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                  
                  <hr/>

                </>
              );
            })
          ) : (
            <div className="col-12" style={{ margin: "20px 0px" }}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">No data to display</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
