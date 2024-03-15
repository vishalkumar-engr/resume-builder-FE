/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getAjaxCall } from "../service/Service";
import { apiUrls } from "../service/ApiUrls";
import logo from "../download.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount } from "../store/loaderSlice";

const Browse = () => {
  const [userResume, setUserResume] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getResume();
  }, []);

  const getResume = async () => {
    dispatch(increaseCount());
    const { data, error } = await getAjaxCall(apiUrls?.getResume);
    if (error === "") {
      setUserResume(data);
      dispatch(decreaseCount());
    } else {
      console.error(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="w-25 m-auto d-flex justify-content-center">
          <Link to={`/editor`}>
            <div className="btn btn-primary">Create New Resume</div>
          </Link>
        </div>
      </div>
      <div className="d-flex padd-both mt-4">
        {userResume && userResume.length > 0 ? (
          <>
            {userResume.map((item) => {
              return (
                <div className="w-25 border mx-2 rounded" key={item?._id}>
                  <div className="text-center">{item.title}</div>
                  <img
                    src={logo}
                    className="d-flex mx-auto"
                    width={250}
                    height={175}
                    alt="Resume"
                  />
                  <div className="row mx-2 mt-2">
                    <div className="col-lg-4">
                      <Link
                        to={`/editor/${item?._id}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                      >
                        <div className="mx-2 btn btn-light">Edit</div>
                      </Link>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-4">
                      <Link
                        to={`/preview/${item?._id}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                      >
                        <div className="mx-2 btn btn-light">Preview</div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Browse;
