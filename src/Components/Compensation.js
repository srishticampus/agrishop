import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function Compensation() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("kblogid") == null) {
      // alert("You're not Krishi Bhavan. please log in to view this page.");
      navigate("/home");
    }
  });
  const {id} = useParams();
  const {compid} = useParams()
  const [data, setdata] = useState({
    title: "",
    category: "",
    Scheme: "",
    endDate: "",
    contents: "fdfs",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const subfn = (e) => {
    console.log(data);
    e.preventDefault();
    axiosInstance
      .post(`/addCompensation/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Compensation given");
          console.log(id);
          axiosInstance.post(`/DeleteComplaintById/${compid}`)
          .then((res)=>{console.log(res);})
          .catch((err)=>{console.log(err);})

          window.location.reload(false)
          navigate(`/viewfarmers`)
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong.");
      });
  };
  return (
    <div>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/cartoon-character-chooses-healthy-tropical-foods-vector-girl-drawn-by-hand-buys-products-online-store-delivery-exotic-fruits-your-home-all-elements-are-isolated-white-background_559428-418.jpg?w=740')",
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat"
      }}>
    <div className="formcontainer">
    <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Farmer Compensation Form</h2>
              <form onSubmit={subfn}>
                <div class="row row-space">
                  <div class="col-8">
                    <div class="input-group">
                      <label class="label"> Title</label>
                      <input
                        class="input--style-4"
                        type="text"
                        name="title"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="input-group">
                      <label class="label">Category</label>
                      <input
                        class="input--style-4"
                        type="text"
                        name="category"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="input-group">
                      <label class="label">Scheme</label>
                      <input
                        class="input--style-4"
                        type="text"
                        name="Scheme"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="input-group">
                      <label class="label">End date</label>
                      <input
                        class="input--style-4"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        name="endDate"
                        onChange={changefn}
                        required
                      />
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
                        required
                      ></textarea>
                    </div>
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
    </div>
  );
}

export default Compensation;
