import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlistitems, setwishlistitems] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("customerlogid") == null) {
      // alert("You're not a Customer. please log in to view this page.")
      navigate("/home");
    }
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewwishlistByUserId/${localStorage.getItem("customerlogid")}`)
      .then((res) => {
        console.log(res, "wishlist by cust id");
        if (res.data.data != undefined) {
          setwishlistitems(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletefn = (a) => {
    console.log(wishlistitems);
    console.log(a);
    axiosInstance
      .post(`/deletewishlistById/${a}`)
      .then((res) => {
        console.log(res, "delete by id res");
        alert("removed from wishlist");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err, "delete by id err");
      });
  };
  const addtocart = (a) => {
    console.log(a);
    axiosInstance
      .post(`/addCart`, {
        product_id: a.product_id._id,
        userid: localStorage.getItem("customerlogid"),
        count: a.count,
      })
      .then((res) => {
        console.log("add to cart from wishlist", res);
        if (res.data.status == 200) {
          alert("Added to cart");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="productdiv1"
      style={{ minHeight: "500px", paddingBottom: "70px" }}
    >
      <div className="wishlisttopdiv">
        <h1 style={{textAlign:'center', position:"relative", top:"190px", color:"black", }}> My Wishlist</h1>
      </div>
      <div
        className="container text-center"
        style={{ padding: "50px 0px 0px 0px" }}
      >
        {wishlistitems.length ? (
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
              <div className="col-2">
                <h5 class="card-text"> Total Amount </h5>
              </div>
            </div>
            <hr />
            {wishlistitems.map((a) => {
              return (
                <div className="row">
                  <div className="col-1">
                    <button
                      onClick={() => {
                        deletefn(a._id);
                      }}
                      className="btn btn-light "
                      style={{ margin: "10px" }}
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
                      <h4 class="card-title"> {a.product_id.name}</h4>
                      <h6 class="card-title"> {a.product_id.description}</h6>
                    </div>
                  </div>
                  <div className="col-2">
                    <div class="card-body">
                      <h5 class="card-title">
                        {" "}
                        Weight: {a.product_id.count} kg
                      </h5>
                    </div>
                  </div>
                  <div className="col-1">
                    <h2 class="card-title"> {a.product_id.price}₹</h2>
                  </div>
                  <div className="col-2">
                    <Link
                      to={`/Products/AddtoCart/${a.product_id._id}`}
                      style={{ margin: "10px" }}
                      className="btn btn-primary "
                    >
                      Add to cart
                    </Link>
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
      </div>
    </div>
  );
}

export default Wishlist;
