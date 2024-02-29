import React from "react";
import pic12 from "../Assets/img/pic12.jpg";
import icon4 from "../Assets/img/icon4.png";
import icon3 from "../Assets/img/icon3.png";
import icon2 from "../Assets/img/icon2.png";
import icon1 from "../Assets/img/icon1.png";
import { Link } from "react-router-dom";
function About() {
  return (
    <div style={{margin:"0px"}}>
      <div class="choose">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="titlepage">
                <h1 style={{color:'white'}}> About us </h1>
                <p>
                  At AgroMart, we are passionate about connecting farmers and
                  customers in a seamless and efficient way. Our mission is to
                  create a platform that supports local farmers, promotes
                  sustainable agriculture, and provides customers with access to
                  fresh, high-quality agricultural products.
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
                        <h3>Our Journey</h3>
                        <p>
                        
                         AgroMart's journey began with a vision to bridge the gap between farmers and cutting-edge agricultural resources. We embarked on this odyssey with the firm belief that technology and tradition could work hand in hand to yield the most bountiful results. Under the nurturing umbrella of Krishibhavan, we have flourished into a vibrant online marketplace, providing farmers with access to the finest products and services available
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
                        <h3>Empowering Farmers, Growing Together</h3>
                        <p>
                        The heart and soul of AgroMart lie in our commitment to empowering farmers. We strive to cultivate a culture of sustainable farming practices, respecting the environment and maximizing yields without compromising on quality.
                        Through Krishibhavan's vast network of research and development, we continuously update our inventory with the latest innovations and techniques. 
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
                        <h3>Our Promise</h3>
                        <p>
                        
Transparency, integrity, and customer satisfaction are at the core of our operations. When you choose AgroMart, you not only gain access to a wide array of top-notch products but also become a part of a larger movement to revolutionize agriculture. With Krishibhavan's support, we remain dedicated to delivering nothing short of excellence.

                        
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
                        <h3>Join the AgroMart Family</h3>
                        <p>
                      
Step into our world of farm-fresh wonders, where each bite tells a story of hard work, love, and a profound connection to nature. We invite you to be part of the AgroMart family, where the passion for farming intertwines with modern convenience, and where the beauty of the land is celebrated through every delectable offering.
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
                  <img src={pic12} alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default About;
