/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputBox from "../commonComponents/InputBox";
import DateRangeComponent from "../commonComponents/DateRangeComponent";
import SkillsBox from "../commonComponents/SkillsBox";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../store/resumeSlice";
import { nextNavigation } from "../../store/navigationSlice";

const Experience = () => {
  const [state, setState] = useState([]);
  const [exp, setExp] = useState({});
  const [flag, setFlag] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const experience = useSelector((store) => store.resume.experience);

  useEffect(() => {
    setState(experience);
  }, [experience]);

  useEffect(() => {
    setIsValid(false);
  }, [exp]);

  const handleSubmit = () => {
    if (
      exp?.orgName &&
      exp?.designation &&
      exp?.location &&
      exp?.startDate &&
      exp?.endDate &&
      exp?.orgName !== "" &&
      exp?.designation !== "" &&
      exp?.location !== "" &&
      exp?.startDate !== "" &&
      exp?.endDate !== ""
    ) {
      setState((prevState) => {
        return [...prevState, exp];
      });
      setExp({});
      setFlag(false);
    } else {
      setIsValid(true);
    }
  };

  const handleInitiateExp = () => {
    setFlag((flag) => {
      setExp({
        orgName: "",
        designation: "",
        location: "",
        skills: [],
        startDate: "",
        endDate: "",
      });
      return !flag;
    });
  };

  const handleEdit = (index) => {
    setExp(state[index]);
    setFlag(true);
    setState((...prev) => {
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

  const handleNext = () => {
    dispatch(addExperience(state));
    dispatch(nextNavigation(3));
  };

  return (
    <div className="container pt-2">
      <div className="min-vh-100">
        {state &&
          state.length > 0 &&
          state.map((item, index) => {
            return (
              <div
                key={`${item?.orgName}${index}`}
                className="container m-0 p-0"
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Organization Name : {item?.orgName}
                  </li>
                  <li class="list-group-item">
                    Designation : {item?.designation}
                  </li>
                  <li class="list-group-item">Location : {item?.location}</li>
                  {item?.skills && item?.skills.length > 0 && (
                    <li class="list-group-item">
                      Skills :{" "}
                      {item?.skills.map((item, index) => {
                        return (
                          <span>{index === 0 ? `${item}` : `, ${item}`}</span>
                        );
                      })}
                    </li>
                  )}
                  {item?.startDate && item?.endDate && (
                    <li class="list-group-item">
                      Duration :
                      {` ${item?.startDate}${
                        item?.endDate === "" ? "" : ` - ${item?.endDate}`
                      }`}
                    </li>
                  )}
                </ul>
                <div className="row my-2">
                  <button
                    type="button"
                    class="btn btn-light col-lg-5"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <div className="col-lg-2"></div>
                  <button
                    type="button"
                    class="btn btn-light  col-lg-5"
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
              label="Organization Name *"
              placeholder="Enter organization name"
              onChange={(e) =>
                setExp((prev) => {
                  return { ...prev, orgName: e };
                })
              }
              value={exp?.orgName}
            />
            <InputBox
              label="Designation *"
              placeholder="Enter designation"
              onChange={(e) =>
                setExp((prev) => {
                  return { ...prev, designation: e };
                })
              }
              value={exp?.designation}
            />
            <InputBox
              label="Location *"
              placeholder="Enter location"
              onChange={(e) =>
                setExp((prev) => {
                  return { ...prev, location: e };
                })
              }
              value={exp?.location}
            />
            <SkillsBox
              onChange={(e) =>
                setExp((prev) => {
                  return { ...prev, skills: e };
                })
              }
              value={exp?.skills}
            />
            <div className="form-group mt-2">
              <label className="my-2">Joining and Leaving Date *</label>
              <DateRangeComponent
                onChange={(e) =>
                  setExp((prev) => {
                    return {
                      ...prev,
                      startDate: e.startDate,
                      endDate: e.endDate,
                    };
                  })
                }
                value={{ startDate: exp.startDate, endDate: exp.endDate }}
              />
            </div>
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
                ? "Add More Experience"
                : "Add Experience details"}
            </button>
          </div>
        )}
      </div>
      <div className="row px-3">
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={() => dispatch(nextNavigation(1))}
        >
          Back
        </button>
        <div className="col-lg-8"></div>
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Experience;
