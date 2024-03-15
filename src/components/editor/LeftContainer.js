import React from "react";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Project from "./Project";
import Social from "./Social";
import { useDispatch, useSelector } from "react-redux";
import { nextNavigation } from "../../store/navigationSlice";

const LeftContainer = () => {
  // Redux
  const dispatch = useDispatch();
  const navigator = useSelector((store) => store.navigator.navigation);

  return (
    <div>
      {/* Header */}
      <div className="d-flex cursor-pointer">
        <div className="p-2" onClick={() => dispatch(nextNavigation(0))}>
          <span className={navigator === 0 ? "active-nav" : ""}>Basic</span>
        </div>
        <div className="p-2" onClick={() => dispatch(nextNavigation(1))}>
          <span className={navigator === 1 ? "active-nav" : ""}>Education</span>
        </div>
        <div className="p-2" onClick={() => dispatch(nextNavigation(2))}>
          <span className={navigator === 2 ? "active-nav" : ""}>
            Experience
          </span>
        </div>
        <div className="p-2" onClick={() => dispatch(nextNavigation(3))}>
          <span className={navigator === 3 ? "active-nav" : ""}>Projects</span>
        </div>
        <div className="p-2" onClick={() => dispatch(nextNavigation(4))}>
          <span className={navigator === 4 ? "active-nav" : ""}>Skills</span>
        </div>
        <div className="p-2" onClick={() => dispatch(nextNavigation(5))}>
          <span className={navigator === 5 ? "active-nav" : ""}>Social</span>
        </div>
      </div>
      {/* Body */}
      {navigator === 0 && <PersonalInfo />}
      {navigator === 1 && <Education />}
      {navigator === 2 && <Experience />}
      {navigator === 3 && <Project />}
      {navigator === 4 && <Skills />}
      {navigator === 5 && <Social />}
    </div>
  );
};

export default LeftContainer;
