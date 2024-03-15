import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrls } from "../service/ApiUrls";
import { useNavigate } from "react-router-dom";
import { postAjaxCallWithoutToken } from "../service/Service";

const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    phoneNo: "",
    uniqueKey: "",
  });

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(false);
  }, [state]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      state.email &&
      state.email !== "" &&
      state.uniqueKey &&
      state.uniqueKey !== "" &&
      state.password &&
      state.password !== ""
    ) {
      const { error } = await postAjaxCallWithoutToken(apiUrls?.signup, state);
      if (error === "") {
        navigate("/");
      } else {
        console.error(error);
      }
    } else {
      setFlag(true);
    }
  };

  return (
    <div className="w-100 vh-100">
      <div className="row p-0 m-0 text-primary-emphasis w-100 mb-5 header-nav padd-both">
        <h1 className="col-lg-3 cursor-pointer">CV Builder</h1>
        <div className="col-lg-8"></div>
      </div>
      {flag && <div className="alert alert-danger">all field are required</div>}

      <div className="text-primary-emphasis d-flex justify-content-center align-items-center w-100">
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              value={state?.email}
              onChange={(event) => {
                setState((prev) => {
                  return {
                    ...prev,
                    email: event.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputEmail2">Username</label>
            <input
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Enter Username"
              value={state?.uniqueKey}
              onChange={(event) => {
                setState((prev) => {
                  return {
                    ...prev,
                    uniqueKey: event.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={state?.password}
              onChange={(event) => {
                setState((prev) => {
                  return {
                    ...prev,
                    password: event.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputPassword3">Phone no</label>
            <input
              type="Number"
              className="form-control"
              id="exampleInputPassword3"
              placeholder="Enter phone no"
              value={state?.phoneNo}
              onChange={(event) => {
                setState((prev) => {
                  return {
                    ...prev,
                    phoneNo: event.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="d-flex row">
            <div className="mt-3 col-lg-10">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <div className="mt-3 col-lg-2 btn btn-light">
              <Link to="/">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
