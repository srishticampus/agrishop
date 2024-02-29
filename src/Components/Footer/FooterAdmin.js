import React from 'react'
import { Link } from 'react-router-dom';

function FooterAdmin() {
    return (
      <div className="Footerdiv">
      <footer class="footer-distributed">
  
        <div class="footer-left">
          <p class="footer-links">
            <Link class="link-1" to="/admin"> Home</Link>
            <Link to="/about">About</Link>
            <Link to="/admin/customer">Customer</Link>
            <Link to="/admin/farmer">Farmer</Link>
            <Link to="/admin/kb">Krishi Bhavan</Link>
            <Link to="/admin/product">Products</Link>

          </p> 
  
          <p>AgroMart 2023</p>
        </div>
      </footer>
    </div>
    );
  }
export default FooterAdmin