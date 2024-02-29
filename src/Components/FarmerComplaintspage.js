import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";
// import { QrReader } from "react-qr-reader";

function FarmerComplaintspage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("farmerid") == null) {
      // alert("You're not a Farmer. please log in to view this page.");
      navigate("/home");
    }
  });
  const [data1, setdata1] = useState("");
  const [data, setdata] = useState({
    name: "",
    village: "",
    farm_id: "",
    description: "",
    contact: "",
    district: "",
    category: "",
  });

  useEffect(() => {
    if (data1.length) {
      axiosInstance
        .post(`/viewFarmerById/${JSON.parse(data1)._id}`)
        .then((res) => {
          console.log(res);
          setdata({
            ...data,
            name: res.data.data.name,
            village: res.data.data.village,
            contact: res.data.data.contact,
            district: res.data.data.district,
            farm_id: res.data.data._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data1]);

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const subfn = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post(`/addComplaint`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Registered a complaint");
          window.location.reload(false)
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <div className="productdiv1" style={{ minHeight: "500px", margin:"0px 0px 200px 0px" }}>
        <div
          class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
          style={{
            backgroundImage:
              "url('https://st2.depositphotos.com/1007566/8353/v/450/depositphotos_83534284-stock-illustration-computer-work-design.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="formcontainer">
            <div class="wrapper wrapper--w680">
              <div class="card card-4">
                
                <div class="card-body">
                  <h2 class="title"> Add a complaint</h2>
                  <form onSubmit={subfn}>
                    <div class="row row-space">
                      <div class="col-6">
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
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label">Village</label>
                          <input
                            class="input--style-4"
                            type="text"
                            name="village"
                            value={data.village}
                            onChange={changefn}

                            required
                          />
                        </div>
                      </div>
                      <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Scan QR
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse "
                      data-bs-parent="#accordionExample"
                    >
                      {/* <div class="accordion-body">
                        <QrReader
                          onResult={(result, error) => {
                            if (!!result) {
                              setdata1(result?.text);
                              console.log(result.text);
                            }

                            if (!!error) {
                              // console.info(error);
                            }
                          }}
                          style={{ width: "100%", height: "100px" }}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                      <div class="col-12">
                        <label class="label">Farmer ID</label>
                        <input
                          class="input--style-4"
                          type="text"
                          value={data.farm_id}
                          name="farm_id"
                          onChange={changefn}
                          required
                        />
                      </div>
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label">Contact</label>
                          <input
                            class="input--style-4"
                            type="tel"
                            name="contact"
                            value={data.contact}
                            onChange={changefn}

                            minLength="10"
                            maxLength="10"
                            required
                          />
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="input-group">
                          <label class="label">District</label>
                          <input
                            class="input--style-4"
                            type="text"
                            name="district"
                            value={data.district}
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
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="input-group">
                          <textarea
                            class="input--style-4"
                            type="text"
                            name="description"
                            placeholder="Description"
                            style={{ width: "100%" }}
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <br />
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        required
                        name="gender"
                        onChange={changefn}
                      >
                        <option>Select a Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div> */}
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
    </div>
  );
}

export default FarmerComplaintspage;
