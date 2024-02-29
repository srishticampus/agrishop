import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate, useParams } from "react-router-dom";

function FarmerEditProduct() {
  const navigate = useNavigate()
    let id = useParams()
  const [data, setdata] = useState({
    name: "",
    category: "",
    price: "",
    count: "",
    description: "",
    image: null,
    farm_id: localStorage.getItem("farmerid"),
  });

  useEffect(()=>{
    if(localStorage.getItem('farmerid')==null){
      // alert("You're not a farmer. please log in to view this page.")
      navigate("/home")
    }
  })
  const changefn = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setdata({ ...data, image: file });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  useEffect(()=>{
    axiosInstance.post(`/viewProductById/${id.id}`)
    .then((res)=>{console.log(res);setdata(res.data.data)})
    .catch((err)=>{console.log(err);})
  },[])
  
  const submitfn = (e) => {
    console.log(data);
    e.preventDefault();
    axiosInstance
      .post(`/editProductById/${id.id}`, data,  {headers: {
        'Content-Type': 'multipart/form-data',
      }})
      .then((res) => {
        console.log("File uploaded");
        console.log(res);
        if(res.data.status==200){
          alert("Edited the product")
          navigate("/FarmerProducts") 
        }
        else{
          alert("couldn't add the product. Please try again")
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading file: ", error);
      });
  };

  return (
    <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
    style={{
      backgroundImage:
        "url('https://img.freepik.com/premium-vector/farmer-harvesting-ground-with-sweet-pepper_316839-3398.jpg?w=740')",
      backgroundSize: "contain",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",

    }}>
      <div className="formcontainer" style={{minHeight:"750px"}}>
      <div class="wrapper wrapper--w680">
        <div class="card card-4">
          <div class="card-body">
            <h2 class="title">Farmer Edit Product </h2>
            <form onSubmit={submitfn}>
              <div class="row row-space">
                <div class="col-12">
                  <div class="input-group">
                    <label class="label"> Name</label>
                    <input
                      class="input--style-4"
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={changefn}
                      required
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group">
                    <label class="label">Category</label>
                    <input
                      class="input--style-4"
                      type="text"
                      name="category"
                      value={data.category}

                      onChange={changefn}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <label class="label"> Price</label>
                  <input
                    class="input--style-4"
                    type="number"
                    name="price"
                    value={data.price}

                    onChange={changefn}
                    required
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <label class="label"> Weight</label>
                  <input
                    class="input--style-4"
                    type="number"
                    name="count"
                    value={data.count}
                    step='0.2'
                    min="1"
                    onChange={changefn}
                    required
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <label class="label"> Description</label>
                  <input
                    class="input--style-4"
                    type="text"
                    name="description"
                    value={data.description}

                    
                    onChange={changefn}
                    required
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <label class="label"> Image</label>
                  <input
                    class="input--style-4"
                    type="file"
                    name="image"
                    // value={data.image}

                    
                    onChange={changefn}
                    
                  />
                </div>
              </div>

              <div class="p-t-15">
                <button class="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FarmerEditProduct;
