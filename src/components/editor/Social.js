/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputBox from "../commonComponents/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { addSocial } from "../../store/resumeSlice";
import { nextNavigation } from "../../store/navigationSlice";

const SocialComponent = () => {
  const [state, setState] = useState([]);
  const [payload, setPayload] = useState([]);
  const [eduDetails, setEduDetails] = useState({});
  const [flag, setFlag] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const social = useSelector((store) => store.resume.social);

  useEffect(() => {
    let localValue = social.map((item) => {
      return {
        degree: item?.title,
        ins: item?.url,
      };
    });
    setState(localValue);
  }, []);

  useEffect(() => {
    setPayload(
      state.map((item) => {
        return {
          title: item.degree,
          url: item.ins,
        };
      })
    );
  }, [state]);

  useEffect(() => {
    setIsValid(false);
  }, [eduDetails]);

  useEffect(() => {
    dispatch(addSocial(payload));
  }, [payload]);

  const handleSubmit = () => {
    if (
      eduDetails.degree &&
      eduDetails.ins &&
      eduDetails.degree !== "" &&
      eduDetails.ins !== ""
    ) {
      setState((prevState) => {
        return [...prevState, eduDetails];
      });
      setEduDetails({});
      setFlag(false);
    } else {
      setIsValid(true);
    }
  };

  const handleInitiateExp = () => {
    setFlag((flag) => {
      setEduDetails({
        degree: "",
        ins: "",
      });
      return !flag;
    });
  };

  const handleEdit = (index) => {
    setEduDetails(state[index]);
    setFlag(true);
    setState((prev) => {
      let arr = [...prev];
      arr[index] = null;
      arr = arr.filter((item) => item);
      return arr;
    });
  };

  const handleRemove = (index) => {
    setState((prev) => {
      let arr = [...prev];
      arr[index] = null;
      arr = arr.filter((item) => item);
      return arr;
    });
  };

  return (
    <div className="container pt-2">
      <div className="min-vh-100">
        {state &&
          state.length > 0 &&
          state.map((item, index) => {
            return (
              <div key={`${item?.title}${index}`} className="container m-0 p-0">
                <ul className="list-group">
                  <li className="list-group-item">Social : {item?.degree}</li>
                  <li className="list-group-item">Url : {item?.ins}</li>
                </ul>
                <div className="row my-2">
                  <button
                    type="button"
                    className="btn btn-light col-lg-5"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <div className="col-lg-2"></div>
                  <button
                    type="button"
                    className="btn btn-light  col-lg-5"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        {flag ? (
          <div>
            <InputBox
              label="Platform *"
              placeholder="Enter platform name"
              onChange={(e) =>
                setEduDetails((prev) => {
                  return { ...prev, degree: e };
                })
              }
              value={eduDetails?.degree}
            />
            <InputBox
              label="Profile url *"
              placeholder="Enter profile url"
              fieldType="none"
              onChange={(e) =>
                setEduDetails((prev) => {
                  return { ...prev, ins: e };
                })
              }
              value={eduDetails?.ins}
            />
            {isValid && (
              <div className="px-3 alert alert-danger d-flex justify-content-center mt-2">
                Please fill all * fields
              </div>
            )}
            <div className="row px-3">
              <button
                type="button"
                className="col-lg-2 btn btn-light my-3"
                onClick={() => handleInitiateExp()}
              >
                Cancel
              </button>
              <div className="col-lg-8"></div>
              <button
                type="button"
                className="col-lg-2 btn btn-success my-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setFlag(!flag)}
            >
              {state && state?.length > 0
                ? "Add More Social Profile"
                : "Add Social Profile"}
            </button>
          </div>
        )}
      </div>
      <div className="row px-3">
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={() => dispatch(nextNavigation(4))}
        >
          Back
        </button>
        <div className="col-lg-8"></div>
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SocialComponent;
