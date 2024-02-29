import React, { useEffect, useState } from "react";
import AxiosInstance from "../baseurl";
import { Navigate, useNavigate } from "react-router-dom";

function AddGuidelines() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("kblogid") == null) {
      // alert("You're not Krishi Bhavan. please log in to view this page.")
      navigate("/home");
    }
  });

  const [data, setdata] = useState({
    // village: "",
    title: "",
    category: "",
    contents: "",
    // district: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const subfn = (e) => {
    e.preventDefault();
    AxiosInstance.post(`/addGuideline/${localStorage.getItem("kblogid")}`, data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.status == 200) {
          alert("Added Guideline Successfully");
          window.location.reload(false);
        } else if (res.data.status == 500) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        alert("Something went wrong. Please try again");
      });
  };
  return (
    <div>
      <div
        class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          // backgroundImage: "url('https://img.freepik.com/free-vector/brand-guidelines-concept-illustration_114360-11760.jpg?w=740&t=st=1690444250~exp=1690444850~hmac=64c42d23070498c51bf7054ee6365cbfe61331ddde1bc84549a72ed3f81a4e9c')",
          backgroundImage:"url('https://img.freepik.com/free-vector/brand-guidelines-concept-illustration_114360-15539.jpg?w=740&t=st=1690444167~exp=1690444767~hmac=e9b039e6b703638cdaa6c683bb3bf32c91eb715a9ca7755b169aaf8ab2508b02')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title"> Add Guideline </h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    {/* <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Village</label>
                        <input
                        class="input--style-4"
                        type="text"
                        name="village"
                        minLength="1"
                        maxLength="20"
                        onChange={changefn}
                        required
                      />
                      </div>
                    </div> */}
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label">Title</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="title"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div className="mb-3">
                      <select class="form-select" aria-label="Default select example" name="category" onChange={changefn}>
                                <option value=''>Select a Category</option>
                                <option value="crop-selection">Crop Selection and Management</option>
                                <option value="soil-health">Soil Health and Conservation</option>
                                <option value="pest-disease">Pest and Disease Management</option>
                                <option value="livestock">Livestock Management</option>
                                <option value="sustainability">Sustainability and Environmental Stewardship</option>
                                <option value="machinery-equipment">Machinery and Equipment</option>
                                <option value="financial-business">Financial and Business Management</option>
                                <option value="safety-health">Safety and Health</option>
                                <option value="compliance-regulations">Compliance and Regulations</option>
                                <option value="continuous-learning">Continuous Learning and Education</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Contents
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="contents"
                          onChange={changefn}
                        ></textarea>
                      </div>
                    </div>
                    {/* <div class="col-6">
                      <div class="input-group">
                        <label class="label">District</label>
                        <input
                        class="input--style-4"
                        type="text"
                        name="district"
                        onChange={changefn}
                        required
                      />
                      </div>
                    </div> */}
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
    </div>
  );
}

export default AddGuidelines;
