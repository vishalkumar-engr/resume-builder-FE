/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const SkillsBox = ({ onChange }) => {
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (onChange) {
      onChange(skills);
    }
  }, [skills]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkills((oldArray) => {
      if (oldArray.includes(value)) {
        setValue("");
        return [...oldArray];
      } else {
        const arr = [...oldArray, value];
        setValue("");
        return arr;
      }
    });
  };

  const handleCross = (e) => {
    setSkills((oldArray) => {
      return oldArray.filter((item) => item !== e);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="pt-2">
          <div className="form-group">
            <label className="ml-2" htmlFor="exampleInputEmail1">
              Skills
            </label>
            <div>
              {skills?.map((item) => {
                return (
                  <span className="cross my-2" key={item}>
                    {item}
                    <span
                      className="cross-button"
                      onClick={() => handleCross(item)}
                    ></span>
                  </span>
                );
              })}
            </div>
            <div className="d-flex">
              <input
                className="form-control mt-1"
                id="exampleInputEmail1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className="btn btn-info mx-2">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SkillsBox;
