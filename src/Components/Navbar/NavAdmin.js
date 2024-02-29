import React from "react";
import { Link } from "react-router-dom";
import l10 from "../../Assets/Images/l10.png";

function NavAdmin() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link
            class="navbar-brand"
            to="/home"
            style={{
              fontSize: "50px",
              margin: "0px 40px",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
             <img src={l10} height="80px" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form class="d-flex" role="search">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item ">
                  <Link class="nav-link" to="/Admin" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/about" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Admin/Customer" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    Customer
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Admin/Farmer" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    Farmer
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Admin/KB" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    Krishi Bhavan
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Admin/Product" style={{ fontSize: "20px", margin:"0px 20px" }}>
                    Products
                  </Link>
                </li>
                

                <li class="d_none get_btn">
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      alert("Logged out");
                      window.location.reload(false);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavAdmin;
