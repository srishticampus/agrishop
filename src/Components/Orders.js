import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [myorder, setorder] = useState([]);
  const navigate = useNavigate();

  const [rating, setrating] = useState("");
  const [refresh, setrefresh] = useState(false);

  const addRating = (id) => {
    axiosInstance
      .post(`/addRating/${id}`, { rating: rating })
      .then((res) => {
        console.log(res);
        setrefresh((prevState) => !prevState);
        alert("Added rating");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("customerlogid") == null) {
      // alert("You're not a Customer. please log in to view this page.")
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewOrderByCustomerId/${localStorage.getItem("customerlogid")}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setorder(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ minHeight: "650px" }}>
      <div className="producttopdiv">
        <h1
          style={{
            textAlign: "center",
            position: "relative",
            top: "190px",
            color: "black",
          }}
        >
          {" "}
          My Orders
        </h1>
      </div>

      <div class="accordion accordion-flush" id="accordionFlushExample">
        {myorder.length
          ? myorder.map((a, index) => {
              return (
                <div style={{ border: "2px solid black", margin: "30px" }}>
                  {" "}
                  {/* Each order  */}
                  <div>
                    <br />
                    <h4 style={{ textAlign: "center" }}>
                      {" "}
                      Ordered date : {a.date.slice(0, 10)}
                    </h4>
                    <h4 style={{ textAlign: "center" }}>
                      {" "}
                      Delivery Status : {a.status}
                    </h4>
                    {/* each order products */}
                    {a.products.map((b) => {
                      return (
                        <>
                          <div
                            className="row"
                            style={{
                              border: "2px solid black",
                              margin: "20px",
                            }}
                          >
                            <div className="col-2">
                              {" "}
                              Product <hr />
                              {b.product.name}
                            </div>
                            <div className="col-2">
                              {" "}
                              Description <hr />
                              {b.product.status}
                            </div>
                            <div className="col-2">
                              {" "}
                              Price <hr /> {b.product.price} rs
                            </div>
                            <div className="col-2">
                              {" "}
                              Weight <hr />
                              {b.count} kg
                            </div>
                            <div className="col-4">
                              {" "}
                              <img
                                src={`http://localhost:4009/${b.product.image.filename}`}
                                height={200}
                              />
                            </div>
                            
                          </div>
                          <div className="row">
                            <div
                              style={{
                                width: "500px",
                                margin: "auto",
                                
                              }}
                            >
                              <input
                                type="range"
                                min="0"
                                max="5"
                                onChange={(e) => {
                                  setrating(e.target.value);
                                }}
                              />

                              <div className="container">
                                <div className="row">
                                  <div className="col"> <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  addRating(b.product._id);
                                }}
                              >
                                Add Rating ({rating})
                              </button></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <h1 style={{ textAlign: "center" }}>
                      {" "}
                      Total Amount : ₹{a.total}
                    </h1>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Orders;
