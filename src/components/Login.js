/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postAjaxCallWithoutToken, getToken } from "../service/Service";
import { useNavigate } from "react-router-dom";
import { apiUrls } from "../service/ApiUrls";

const SignUp = () => {
  const [flag, setFlag] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/browse");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await postAjaxCallWithoutToken(
      apiUrls?.login,
      state
    );
    if (error === "") {
      localStorage.setItem("Authorization", data);
      navigate("/browse");
      setFlag(false);
    } else {
      setFlag(true);
      console.error(error);
    }
  };

  return (
    <div className="w-100 vh-100">
      <div className="row p-0 m-0 text-primary-emphasis w-100 mb-5 header-nav padd-both">
        <h1 className="col-lg-3 cursor-pointer">CV Builder</h1>
        <div className="col-lg-8"></div>
      </div>
      {flag && (
        <div className="row mt-5">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 alert alert-danger">
            Invalid Username / Email or password
          </div>
        </div>
      )}
      <div className="text-primary-emphasis d-flex justify-content-center align-items-center">
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <label htmlFor="exampleInputEmail1">Email / Username</label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email / username"
              value={state.email}
              onChange={(event) =>
                setState((prev) => {
                  return {
                    ...prev,
                    email: event.target.value,
                  };
                })
              }
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={state.password}
              onChange={(event) =>
                setState((prev) => {
                  return {
                    ...prev,
                    password: event.target.value,
                  };
                })
              }
            />
          </div>
          <div className="d-flex row">
            <div className="mt-3 col-lg-10">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
            <div className="mt-3 col-lg-2 btn btn-light">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
