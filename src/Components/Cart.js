import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cartid,setcartid] = useState('')
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("customerlogid") == null) {
      // alert("You're not a Customer. please log in to view this page.")
      navigate("/home");
    }
  });
  const [cartitems, setcartitems] = useState([]);
  useEffect(() => {
    axiosInstance
      .post(`/viewCartByUserId/${localStorage.getItem("customerlogid")}`)
      .then((res) => {
        console.log(res.data.data, "cart by cust id");
        if (res.data.data != undefined) {
          setcartitems(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkout = (e) => {
    e.preventDefault();
    const product = [];
    const total = [];
    for (let x of cartitems) {
      product.push({ product: x.product_id, count: x.count });
      total.push(x.count * x.product_id.price);
    }
    let totalprice = 0;
    for (let i of total) {
      totalprice += i;
    }
    console.log(totalprice, "total price");
    console.log(product, " all product ");

    axiosInstance
      .post(`/addtoOrders`, {
        cartid:cartid,
        products: product,
        userid: localStorage.getItem("customerlogid"),
        total: totalprice,
        count: cartitems.count,
      })
      .then((res) => {
        console.log(res);
        alert("Purchase Successfull.");
        window.location.reload(false)
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const deletefn = (a) => {
    console.log(cartitems);
    console.log(a);
    axiosInstance
      .post(`/deleteCartById/${a}`)
      .then((res) => {
        console.log(res, "delete by id res");
        alert("Removed from cart");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err, "delete by id err");
      });
  };
  return (
    <div
      className="productdiv1"
      style={{ minHeight: "650px", paddingBottom: "70px" }}
    >
      <div className="carttopdiv">
        <h1
          style={{
            textAlign: "center",
            position: "relative",
            top: "190px",
            color: "black",
          }}
        >
          {" "}
          My Cart
        </h1>
      </div>
      <div
        className="container text-center"
        style={{ padding: "50px 0px 0px 0px" }}
      >
        {cartitems.length ? (
          <>
            <div
              className="row"
              style={{
                // border: "2px solid black",
                color: "white",
                background: "#82AE46",
                margin: "10px",
                padding: "20px",
              }}
            >
              <div className="col-7">
                <div class="card-body">
                  <h5 class="card-title">Product </h5>
                </div>
              </div>

              <div className="col-2">
                <div class="card-body">
                  <h5 class="card-title"> Weight</h5>
                </div>
              </div>
              <div className="col-3">
                <h5 class="card-text"> Total Amount </h5>
              </div>
            </div>
            <hr />
            {cartitems.map((a) => {
              return (
                <div
                  className="row"
                  style={{
                    border: "2px solid black",
                    borderRadius: "20px",
                    margin: "10px",
                    padding: "20px",
                  }}
                >
                  <div className="col-1">
                    <button
                      onClick={() => {
                        deletefn(a._id);
                      }}
                      className="btn btn-light "
                    >
                      X
                    </button>
                  </div>
                  <div className="col-3">
                    <img
                      src={`http://localhost:4009/${a.product_id.image.originalname}`}
                      class="card-img-top"
                      alt="..."
                      height="200px"
                      width="200px"
                    />
                  </div>
                  <div className="col-3">
                    <div class="card-body">
                      <h5 class="card-title">Product : {a.product_id.name} </h5>
                      <p>{a.product_id.description}</p>
                    </div>
                  </div>

                  <div className="col-2">
                    <div class="card-body">
                      <h5 class="card-title"> Weight: {a.count} kg</h5>
                    </div>
                  </div>
                  <div className="col-3">
                    <p class="card-text">
                      Total Amount : ₹{a.product_id.price * a.count}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div
            className="row"
            style={{ border: "2px solid black", margin: "30px" }}
          >
            <div className="col-12">
              <div class="card-body">
                <h5 class="card-title" style={{ fontSize: "40px" }}>
                  Nothing to display
                </h5>
              </div>
            </div>
          </div>
        )}
{cartitems.length?<button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
           onClick={()=>{setcartid(cartitems[0]._id)}}
        >
          Checkout
        </button>:''}
        

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Select a payment method
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={checkout}>
                  <div class="container">
                    <div class="row">
                      <div class="col-12" style={{ margin: "-10px" }}>
                        <p>
                          <a
                            class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                            data-bs-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="true"
                            aria-controls="collapseExample"
                          >
                            <span class="fw-bold">Credit Card</span>
                          </a>
                        </p>
                        <div class="collapse" id="collapseExample">
                          <div class="row">
                            <div class="col-1"></div>
                            <div class="col-11">
                              <div class="row">
                                <div class="col-12">
                                  <div class="form__div">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Card Number"
                                      minLength="16"
                                      maxLength="16"
                                      required
                                    />
                                    <hr />
                                  </div>
                                </div>

                                <div class="col-6">
                                  <div class="form__div">
                                    <input
                                      type="date"
                                      class="form-control"
                                      placeholder="MM/YY"
                                      min={new Date().toISOString().split("T")[0]}
                                      required
                                    />
                                    <hr />
                                  </div>
                                </div>

                                <div class="col-6">
                                  <div class="form__div">
                                    <input
                                      type="password"
                                      class="form-control"
                                      placeholder="CVV"
                                      minLength="3"
                                      maxLength="3"
                                      required
                                    />
                                    <hr />
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="form__div">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Name on the Card"
                                      required
                                    />
                                    <label for="" class="form__label"></label>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <button class="btn btn-light">Submit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Cart;
