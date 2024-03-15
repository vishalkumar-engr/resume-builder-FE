import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="row p-0 m-0 text-primary-emphasis w-100 mb-5 header-nav padd-both">
      <h1
        className="col-lg-3 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        CV Builder
      </h1>
      <h5
        className="col-lg-1 mt-3 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        Home
      </h5>
      <div className="col-lg-7"></div>
      <h5
        className="col-lg-1 d-flex align-item-center justify-content-center mt-3 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </h5>
    </div>
  );
};

export default Header;
