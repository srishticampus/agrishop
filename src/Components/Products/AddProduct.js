import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function AddProduct() {
  const navigate= useNavigate()
  const id = useParams();

  const [product, setproduct] = useState({ image: { filename: "#" } });
  const [cart, setcart] = useState({});


  useEffect(()=>{
    if(localStorage.getItem('customerlogid')==null){
      // alert("You're not a Customer. please log in to view this page.")
      navigate("/home")
    }
  })
  useEffect(() => {
    axiosInstance
      .post(`/viewProductById/${id.id}`)
      .then((res) => {
        console.log(res, "view product by id ");
        setcart({
          ...cart,
          count: 1,
          product_id: id.id,
          userid: localStorage.getItem("customerlogid"),
        });
        setproduct(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(product);

  const incrfn = ()=>{
    console.log(cart.count);

    if(cart.count<product.count){
      setcart({...cart, count:cart.count+1})

    }else{
      alert('No Stock Available')
    }
  }
  const decrfn = ()=>{
    if(cart.count>1){
      setcart({...cart, count:cart.count-1})
    }
   
  }

  const Cart = () => {
    console.log("added to cart");
    console.log(cart);
    axiosInstance.post(`/addCart`, cart)
    .then((res)=>{console.log(res);
    if(res.data.status==200){
      alert("added item to cart")
      navigate("/cart")
    }
  else{
    alert("item already added")
  }})
    .catch((err)=>{console.log(err);})
  };
  return (
    <div className="productdiv1" style={{minHeight:"400px"}}>
      <div className="col-12" style={{ margin: "20px 0px" }}>
        {/* <p> {id.id}</p> */}
        <div className="container text-center" style={{margin:"auto", width:"50%"}}>
          <div className="row" >
            <div className="col">
            <img
            src={`http://localhost:4009/${product.image.filename}`}
            class="card-img-top"
            alt="..."
            height="300px"
          />
            </div>
            <div className="col">
            <div class="card">
         
         <div class="card-body">
           
           <h5 class="card-title">{product.name}</h5>
           {/* <p class="card-text">₹{product.price}</p> */}
           <span>
             {" "}
             <button className="btn btn-danger"  onClick={decrfn} style={{margin:"20px"}}> -</button>
             Weight (in kg) : {cart.count} 
             <button className="btn btn-danger" onClick={incrfn} style={{margin:"20px"}}> + </button> 
           </span>
           <br/>
           <button className="btn btn-primary" onClick={Cart}> Add to Cart </button>
         </div>
       </div>
            </div>
          </div>
        </div>
       
       
      </div>
    </div>
  );
}

export default AddProduct;
