import React from "react";
import { useEffect, useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axiosInstance from "../../baseurl";

function AdminProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      navigate("/admin");
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
      setFilteredItems(data);
    } else {
      setFilteredItems(filtereddata);
    }
  };

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv1" style={{ minHeight: "400px" }}>
        <div className="main">
        <div className="producttopdiv">
     <h1 style={{textAlign:'center', position:"relative", top:"190px", color:"black", }}> My Product</h1>

     </div>
         

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              
              <div
                id="collapseFour"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
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
                    <button class="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                  <div class="container text-center productdiv">
                    <div class="row">
                      {filteredItems.map((a) => {
                        const rate = [];
                        for (let i = 0; i < parseInt(a.rating); i++) {
                          rate.push(i);
                        }
                        return (
                          <div className="col-2" style={{ margin: "20px 0px" }}>
                            <div class="card" style={{ boxShadow: "10px 15px 5px grey"  }}>
                              <img
                                src={`http://localhost:4009/${a.image.originalname}`}
                                class="card-img-top"
                                alt="..."
                                height="150px"
                              />
                              <div class="card-body"  >
                                <h5 class="card-title">{a.name}</h5>
                                <p class="card-text">₹{a.price}</p>
                                <p> {a.description}</p>
                                <div class="rate">
                                  {rate.length ? (
                                    rate.map(() => {
                                      return (
                                        <span style={{ fontSize: "25px" }}>
                                          ⭐
                                        </span>
                                      );
                                    })
                                  ) : (
                                    <span style={{ fontSize: "25px" }}>
                                      No Rating
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ minHeight: "400px" }}>
        <h1 style={{ textAlign: "center", position: "relative", top: "150px" }}>
          Please{" "}
          <Link style={{ fontSize: "50px" }} to="/Admin">
            log in{" "}
          </Link>
          to see admin panel{" "}
        </h1>
      </div>
    );
  }
}

export default AdminProduct;
