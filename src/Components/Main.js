import React, { useEffect, useState } from "react";
import category1 from "../Assets/Images/category-1.jpg";
import category2 from "../Assets/Images/category-2.jpg";
import category3 from "../Assets/Images/category-3.jpg";
import category4 from "../Assets/Images/category-4.jpg";
import category5 from "../Assets/Images/category-5.jpg";

import food from "../Assets/img/food.jpg";
import icon4 from "../Assets/img/icon4.png";
import icon3 from "../Assets/img/icon3.png";
import icon2 from "../Assets/img/icon2.png";
import icon1 from "../Assets/img/icon1.png";

import img4 from "../Assets/img/img4.jpeg";

import { Link } from "react-router-dom";
import Products from "./Products/Products";
import axiosInstance from "../baseurl";

function Main({ auth }) { 
  const [data, setdata] = useState([]);
  const [name, setname] = useState("Friend");
  useEffect(() => {

    if(localStorage.getItem(`customerlogid`)!=null){
       axiosInstance
      .post(`/viewCustomerById/${localStorage.getItem(`customerlogid`)}`)
      .then((res) => {
        console.log(res, "customer");
        if (res.data.data != undefined) {
          setname(res.data.data.name);
        } else {
          setname("friend");
        }
      }) 
      .catch((err) => {
        console.log(err, "error");
      });

    }else if(localStorage.getItem(`kblogid`)!=null){
       axiosInstance
      .post(`/viewkrishiById/${localStorage.getItem(`kblogid`)}`)
      .then((res) => {
        console.log(res, "krishi");
        if (res.data.data != undefined) {
          setname(res.data.data.village + " Krishi Bhavan");
        } else {
          setname("friend");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
    }else if(localStorage.getItem(`farmerid`)!=null){
      axiosInstance
      .post(`/viewFarmerById/${localStorage.getItem(`farmerid`)}`)
      .then((res) => {
        console.log(res, "farmer");
        if (res.data.data != undefined) {
          setname(res.data.data.name);
        } else {
          setname("friend");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
    }

  }, []);

  useEffect(()=>{
    axiosInstance
      .post(`/viewAllProduct`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

//  style2.css = 384th line onwards, different class has different background image
  if (auth == 0) {
    return (
      <>
        <section class="banner_main0">
          {/*no log  */}
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="text-bg">
                  <h1
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    AgroMart
                  </h1>
                  <h2
                    style={{
                      color: "white",
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    Welcome to AgroMart.
                    <br /> The ultimate online destination for farmers and
                    customers alike!
                  </h2>
                  <Link to="/login/cuslog">Discover</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="hottest">
          <div class="container">
            <div class="row d_flex">
              <div class="col-md-5">
                <figure>
                  <img
                    src={img4}
                    alt="#"
                    height="300px"
                    style={{ border: "4px solid white" }}
                  />
                </figure>
              </div>
              <div class="col-md-7">
                <div class="hottest_box">
                  <p>
                    At AgroMart, we're passionate about revolutionizing the way
                    we grow, produce, and distribute food. Our innovative
                    solutions are designed to enhance agricultural productivity,
                    promote sustainability, and ensure food security for
                    generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category1}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <div
                  class="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <div class="card-body" style={{ padding: "100px" }}>
                    <h5 class="card-title">Vegetables</h5>
                    <h6>Protect the health of every home</h6>
                    <Link to="/login/cuslog" class="btn btn-success">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src={category2}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category3}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category4}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category5}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <br />
          <h1
            style={{
              textAlign: "center",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            {" "}
            Our products
          </h1>
          <div class="container text-center productdiv">
            <div class="row">
              {data.map((a) => {
                return (
                  <div className="col-4">
                    <div class="card">
                      <img
                        src={`http://localhost:4009/${a.image.originalname}`}
                        class="card-img-top"
                        alt="..."
                        height="200px"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{a.name}</h5>
                        <h4 class="card-text">
                          ₹<del>{parseInt(a.price) + 20}</del>{" "}
                          <span class="badge bg-secondary">₹{a.price}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <br/>
        <div class="choosehome">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
                <div class="titlepage">
                  <h2 style={{color:"white"}}>Why Choose Us? </h2>
                  <p>
                  Welcome to AgroMart, your one-stop destination for all your farming needs, proudly operating under the nurturing care of Krishibhavan! 

                   
                    <br />
                    Consume fresh products for a healthier lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row d_flex">
              <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                <div class="padding_with">
                  <div class="row">
                    <div class="col-md-6 padding_bottom">
                      <div class="choose_box">
                        <i>
                          <img src={icon1} alt="#" />
                        </i>
                        <div class="choose_text">
                          <h3>A Trusted Platform</h3>
                          <p>
                            AgroMart provides a trusted platform where farmers
                            can sell their products and customers can buy them
                            with confidence. We have established a reliable
                            marketplace that connects farmers directly with
                            customers, ensuring transparency and authenticity in
                            all transactions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 padding_bottom">
                      <div class="choose_box">
                        <i>
                          <img src={icon2} alt="#" />
                        </i>
                        <div class="choose_text">
                          <h3>Wide Range of Products:</h3>
                          <p>
                            AgroMart offers a diverse range of agricultural
                            products from different sellers. Whether you're
                            looking for fresh produce, livestock, handmade
                            crafts, or farm equipment, you can find it all in
                            one place. Our extensive product selection allows
                            you to conveniently shop for all your farming needs.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 padding_bottom2">
                      <div class="choose_box">
                        <i>
                          <img src={icon3} alt="#" />
                        </i>
                        <div class="choose_text">
                          <h3>Quality And Reliability</h3>
                          <p>
                            We prioritize quality and ensure that all products
                            listed on AgriShop meet high standards. We have a
                            thorough vetting process for sellers and their
                            products, ensuring that you receive top-quality
                            items. Our commitment to quality ensures that both
                            farmers and customers have a positive experience on
                            our platform.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="choose_box">
                        <i>
                          <img src={icon4} alt="#" />
                        </i>

                        <div class="choose_text">
                          <h3>Expert Farmer</h3>
                          <p>
                            AgriStore enables direct interaction between farmers
                            and customers, fostering a sense of community and
                            promoting a closer connection between producers and
                            consumers. You can engage in conversations with
                            farmers, ask questions about their products, and
                            gain valuable insights into the farming practices
                            behind the products you buy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div class="choose_img">
                  <figure>
                    <img src={food} alt="#" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-5">
                <Link class="read_more" to="/about">
                  Read More 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (auth == 1) {
    return (
      <>
        <section class="banner_main1">
          {/* main 1 = customer */}
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="text-bg">
                  <h1
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      textDecoration: "none",
                      fontWeight: "bold",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                    }}
                  >
                    AgroMart
                  </h1>
                  <h2
                    style={{
                      color: "white",
                      fontFamily: "'Dancing Script', cursive",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                      fontSize: "45px",
                    }}
                  >
                    Welcome back, {name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h1
          style={{
            textAlign: "center",
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          {" "}
          Browse Products
        </h1>
        <div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category1}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <div
                  class="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <div class="card-body" style={{ padding: "100px" }}>
                    <Link to="/products" class="btn btn-success">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src={category2}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category3}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category4}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category5}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <br />
          <h1
            style={{
              textAlign: "center",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            {" "}
            Our products
          </h1>
          <div class="container text-center productdiv">
            <div class="row">
              {data.map((a) => {
                return (
                  <div className="col-4" style={{ margin: "20px 0px" }}>
                    <div class="card">
                      <img
                        src={`http://localhost:4009/${a.image.originalname}`}
                        class="card-img-top"
                        alt="..."
                        height="200px"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{a.name}</h5>
                        <h4 class="card-text">
                          ₹<del>{parseInt(a.price) + 20}</del>{" "}
                          <span class="badge bg-secondary">₹{a.price}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else if (auth == 2) {
    return (
      <>
        <section class="banner_main2">
          {/* KB = 2 */}
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="text-bg">
                  <h1
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      textDecoration: "none",
                      fontWeight: "bold",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                    }}
                  >
                    AgroMart
                  </h1>
                  <h2
                    style={{
                      color: "white",
                      fontFamily: "'Dancing Script', cursive",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                      fontSize: "45px",
                    }}
                  >
                    Welcome back, {name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category1}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <div
                  class="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <div class="card-body" style={{ padding: "100px" }}>
                    <Link to="/viewfarmers" class="btn btn-success">
                      View Farmers
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src={category2}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category3}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category4}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category5}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (auth == 3) {
    return (
      <>
        <section class="banner_main3">
          {/* Farmer */}
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <div class="text-bg">
                  <h1
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      textDecoration: "none",
                      fontWeight: "bold",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                    }}
                  >
                    AgroMart
                  </h1>
                  <h2
                    style={{
                      color: "white",
                      fontFamily: "'Dancing Script', cursive",
                      textAlign: "left",
                      textShadow: "1px 1px black",
                      fontSize: "45px",
                    }}
                  >
                    Welcome back, {name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category1}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <div
                  class="card"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <div class="card-body" style={{ padding: "100px" }}>
                    <Link to="/FarmerAddProduct" class="btn btn-success">
                      Add Products
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src={category2}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <img
                  src={category3}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category4}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
              <div class="col">
                <img
                  src={category5}
                  style={{ borderRadius: "50px" }}
                  height="260px"
                  width="90%"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
