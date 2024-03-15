/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { containsObject } from "../../utils/Utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  addPersonalSkills,
  addTechnicalSkills,
} from "../../store/resumeSlice";
import { nextNavigation } from "../../store/navigationSlice";

const Skills = () => {
  const [tech, setTech] = useState([]);
  const [techValue, setTechValue] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [personalValue, setPersonalValue] = useState([]);

  // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const technicalSkills = useSelector((store) => store.resume.technicalSkills);
  const personalSkills = useSelector((store) => store.resume.personalSkills);

  useEffect(() => {
    setTech(technicalSkills);
    setPersonal(personalSkills);
  }, [technicalSkills, personalSkills]);

  const handleTechSubmit = (e) => {
    e.preventDefault();
    setTech((oldArray) => {
      if (containsObject(oldArray, { key: techValue, value: "0" })) {
        setTechValue("");
        return [...oldArray];
      } else {
        const arr = [...oldArray, { key: techValue, value: "0" }];
        setTechValue("");
        return arr;
      }
    });
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setPersonal((oldArray) => {
      if (containsObject(oldArray, { key: personalValue, value: "0" })) {
        setPersonalValue("");
        return [...oldArray];
      } else {
        const arr = [...oldArray, { key: personalValue, value: "0" }];
        setPersonalValue("");
        return arr;
      }
    });
  };

  const handleRemove = (index) => {
    setTech((prev) => {
      let arr = [...prev];
      arr[index] = null;
      return arr.filter((item) => item);
    });
  };

  const handleNext = () => {
    dispatch(addPersonalSkills(personal));
    dispatch(addTechnicalSkills(tech));
    dispatch(nextNavigation(5));
  };

  return (
    <div className="container">
      <div className="min-vh-100">
        <div>
          <h5>Technical Skills</h5>
          {tech && tech.length > 0 && (
            <ul className="list-group">
              {tech.map((item, index) => {
                return (
                  <li className="list-group-item row d-flex" key={item.key}>
                    <div className="col-lg-8">{item?.key}</div>
                    <div className="col-lg-2">
                      <select
                        value={item?.value}
                        onChange={(e) => {
                          setTech((prev) => {
                            prev[index].value = e.target.value;
                            return [...prev];
                          });
                        }}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div
                      className="col-lg-2 cursor-pointer"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <form onSubmit={handleTechSubmit}>
            <div className="pt-2">
              <div className="form-group">
                <div className="d-flex">
                  <input
                    className="form-control mt-1"
                    id="exampleInputEmail1"
                    value={techValue}
                    onChange={(e) => setTechValue(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5">
          <h5>Interpersonal skills</h5>
          {personal && personal.length > 0 && (
            <ul className="list-group">
              {personal.map((item, index) => {
                return (
                  <li className="list-group-item row d-flex" key={item.key}>
                    <div className="col-lg-8">{item?.key}</div>
                    <div className="col-lg-2">
                      <select
                        value={item?.value}
                        onChange={(e) => {
                          setPersonal((prev) => {
                            prev[index].value = e.target.value;
                            return [...prev];
                          });
                        }}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="col-lg-2 cursor-pointer">Remove</div>
                  </li>
                );
              })}
            </ul>
          )}
          <form onSubmit={handlePersonalSubmit}>
            <div className="pt-2">
              <div className="form-group">
                <div className="d-flex">
                  <input
                    className="form-control mt-1"
                    id="exampleInputEmail1"
                    value={personalValue}
                    onChange={(e) => setPersonalValue(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row px-3 mt-10">
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={() => dispatch(nextNavigation(3))}
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

export default Skills;
