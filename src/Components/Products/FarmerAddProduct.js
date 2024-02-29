import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function FarmerAddProduct() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    category: "",
    price: "",
    count: "",
    description: "",
    image: null,
    farm_id: localStorage.getItem("farmerid"),
  });

  const changefn = (e) => {
    console.log(e.target.value);
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setdata({ ...data, image: file });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("farmerid") == null) {
      // alert("You're not a farmer. please log in to view this page.")
      navigate("/home");
    }
  });
  const submitfn = (e) => {
    console.log(data);
    e.preventDefault();
    axiosInstance
      .post("/addProduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("File uploaded");
        console.log(res);
        if (res.data.status == 200) {
          alert("Added a new product");
          window.location.reload(false);
        } else {
          alert(res.data.msg);
           window.location.reload(false);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading file: ", error);
      });
  };

  console.log(data);

  return (
    <div
      class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/farmer-harvesting-ground-with-sweet-pepper_316839-3398.jpg?w=740')",
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",

      }}
    >
      <div className="formcontainer" style={{minHeight:"750px"}}>
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Farmer Add Product </h2>
              <form onSubmit={submitfn}>
                <div class="row row-space">
                  <div class="col-12">
                    <div class="input-group">
                      <label class="label"> Name</label>
                      <input
                        class="input--style-4"
                        type="text"
                        name="name"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="category"
                      required
                      onChange={changefn}
                    >
                      <option value="">Select a Category</option>
                      <option>Fruits</option>
                      <option>Vegetables</option>
                      <option>Dairy Products</option>
                      <option>Cereals</option>
                      <option>Meat products</option>
                    </select>
                    <br />
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group">
                    <label class="label"> Price</label>
                    <input
                      class="input--style-4"
                      type="number"
                      name="price"
                      onChange={changefn}
                      required
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group">
                    <label class="label"> Weight </label>
                    <input
                      class="input--style-4"
                      type="number"
                      name="count"
                      min="0"
                      step="0.2"
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
                      onChange={changefn}
                      required
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

export default FarmerAddProduct;
