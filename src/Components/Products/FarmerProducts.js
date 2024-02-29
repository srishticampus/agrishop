import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function FarmerProducts() {
  const navigate = useNavigate()
  const [data, setdata] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewProductByFarmerId/${localStorage.getItem('farmerid')}`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    if(localStorage.getItem('farmerid')==null){
      // alert("You're not a farmer. please log in to view this page.")
      navigate("/home")
    }
  })

  const deletefn = (id)=>{

    axiosInstance.post(`/deleteProductById/${id}`)
    .then((res)=>{console.log(res)
    if(res.data.status==200){
      alert("Deleted product")
      window.location.reload(false)
    }
  else{
    alert(res.data.message)
  }})
    .catch((err)=>{console.log(err);})  
  }

  return (
    <div className="productdiv1" style={{minHeight:'450px'}}>
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
          My Products
        </h1>
      </div>
      <div class="container  productdiv">
        <div class="row">
          {data.length?data.map((a) => {
            return (
              <div className="col-3" style={{ margin: "20px 0px" }}>
                <div class="card" style={{boxShadow:"5px 5px 5px grey"}}>
                  <img
                    src={`http://localhost:4009/${a.image.originalname}`}
                    class="card-img-top"
                    alt="..."
                    height="200px"
                  />
                  <div class="card-body">
                    <h5 class="card-title" style={{textAlign:"left"}}>Name:{a.name}</h5>
                    
                    <p class="card-text" style={{textAlign:"left"}} >category:{a.category} </p>
                    <p class="card-text" style={{textAlign:"left"}} >Description:{a.description} </p>
                    <p class="card-text" style={{textAlign:"left"}} >Price: ₹{a.price}</p>
                    <p class="card-text" style={{textAlign:"left"}} >Weight:{a.count} kg</p>
                   

                    <Link to={`/FarmerEditProduct/${a._id}`} className="btn btn-primary"> Edit </Link>
                    <button className="btn btn-danger" style={{margin:"10px"}} onClick={()=>{deletefn(a._id)}}> Delete </button>
                  </div>
                </div>
              </div>
            );
          }):
          <div className="col-12" style={{ margin: "20px 0px" }}>
          <div class="card">
           
            <div class="card-body">
              <h5 class="card-title">No data to display</h5>
              
             
            </div>
          </div>
        </div>}
        </div>
      </div>
    </div>
  );
}

export default FarmerProducts;
