/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputBox from "../commonComponents/InputBox";
import SkillsBox from "../commonComponents/SkillsBox";
import DateRangeComponent from "../commonComponents/DateRangeComponent";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../store/resumeSlice";
import { nextNavigation } from "../../store/navigationSlice";

const Project = () => {
  const [state, setState] = useState([]);
  const [project, setProject] = useState({});
  const [flag, setFlag] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const projectValue = useSelector((store) => store.resume.project);

  useEffect(() => {
    setState(projectValue);
  }, []);

  useEffect(() => {
    setIsValid(false);
  }, [project]);

  const handleSubmit = () => {
    if (
      project.title &&
      project.teamSize &&
      project.description &&
      project.startDate &&
      project.endDate &&
      project.title !== "" &&
      project.teamSize !== "" &&
      project.startDate !== "" &&
      project.endDate !== "" &&
      project.description !== ""
    ) {
      setState((prevState) => {
        return [...prevState, project];
      });
      setProject({});
      setFlag(false);
    } else {
      setIsValid(true);
    }
  };

  const handleInitiateExp = () => {
    setFlag((flag) => {
      setProject({
        title: "",
        teamSize: "",
        description: "",
        skills: [],
        startDate: "",
        endDate: "",
      });
      return !flag;
    });
  };

  const handleEdit = (index) => {
    setProject(state[index]);
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

  const handleNext = () => {
    dispatch(addProject(state));
    dispatch(nextNavigation(4));
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
                  <li className="list-group-item">
                    Project Title : {item?.title}
                  </li>
                  <li className="list-group-item">
                    Team Size : {item?.teamSize}
                  </li>
                  <li className="list-group-item">
                    Description : {item?.description}
                  </li>
                  {item?.skills && item?.skills.length > 0 && (
                    <li className="list-group-item">
                      Skills :{" "}
                      {item?.skills.map((item, index) => {
                        return (
                          <span key={item}>
                            {index === 0 ? `${item}` : `, ${item}`}
                          </span>
                        );
                      })}
                    </li>
                  )}
                  {item?.startDate && item?.endDate && (
                    <li className="list-group-item">
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
              label="Project title *"
              placeholder="Enter project title"
              onChange={(e) =>
                setProject((prev) => {
                  return { ...prev, title: e };
                })
              }
              value={project?.title}
            />
            <InputBox
              label="Team size *"
              placeholder="Enter team size"
              type="Number"
              onChange={(e) =>
                setProject((prev) => {
                  return { ...prev, teamSize: e };
                })
              }
              value={project?.teamSize}
            />
            <div className="form-group pt-2">
              <label htmlFor="exampleFormControlTextarea1">Description *</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) =>
                  setProject((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
                value={project?.description}
              ></textarea>
            </div>
            <SkillsBox
              onChange={(e) =>
                setProject((prev) => {
                  return { ...prev, skills: e };
                })
              }
            />
            <div className="form-group mt-2">
              <label className="my-2">Start and End Date *</label>
              <DateRangeComponent
                onChange={(e) =>
                  setProject((prev) => {
                    return {
                      ...prev,
                      startDate: e.startDate,
                      endDate: e.endDate,
                    };
                  })
                }
                value={{
                  startDate: project.startDate,
                  endDate: project.endDate,
                }}
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
                ? "Add More Project"
                : "Add Project details"}
            </button>
          </div>
        )}
      </div>
      <div className="row px-3">
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={() => dispatch(nextNavigation(2))}
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

export default Project;
