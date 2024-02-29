import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
import axios from "axios";

function Products() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("customerlogid") == null) {
      navigate("/home");
    }
  });

  const [data, setdata] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllProduct`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
        setFilteredItems(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setsearchfn = (e) => {
    const filtereddata = data.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    console.log(filtereddata);
    if (filtereddata.length == 0) {
      setFilteredItems([]);
    } else {
      setFilteredItems(filtereddata);
    }
  };

  const addtowishlist = (a) => {
    console.log(a);
    axiosInstance
      .post(`/addTowishlist`, {
        product_id: a._id,
        userid: localStorage.getItem("customerlogid"),
        count: a.count,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Added to Wishlist");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="productdiv1" style={{ minHeight: "700px" }}>
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
          My Product
        </h1>
      </div>

      <form
        class="d-flex"
        role="search"
        style={{ width: "500px", margin: "20px auto" }}
      >
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          onChange={setsearchfn}
        />
      </form>
      <div class="container text-center productdiv">
        <div class="row">
          {filteredItems.length ? (
            filteredItems.map((a) => {
              const rate = [];
              for (let i = 0; i < parseInt(a.rating); i++) {
                rate.push(i);
              }
              return (
                <div className="col-2" style={{ margin: "20px 0px" }}>
                  <div class="card">
                    <img
                      src={`http://localhost:4009/${a.image.originalname}`}
                      class="card-img-top"
                      alt="..."
                      height="150px"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{a.name}</h5>
                      <p class="card-text">₹{a.price}</p>
                      <p> {a.description}</p>
                      <div class="rate">
                        {rate.length ? (
                          rate.map(() => {
                            return <span style={{ fontSize: "25px" }}>⭐</span>;
                          })
                        ) : (
                          <span style={{ fontSize: "25px" }}>No Rating</span>
                        )}
                      </div>
                      <Link
                        to={`/Products/AddtoCart/${a._id}`}
                        class="btn btn-primary"
                      >
                        Add to Cart
                      </Link>
                      <button
                        onClick={() => {
                          addtowishlist(a);
                        }}
                        class="btn btn-success "
                        style={{ margin: "20px", fontSize: "13px" }}
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
           <div className="col-12">
             <div class="card">
              <div class="card-body">
                <h5 class="card-title">No Products</h5>
              </div>
            </div>
           </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
