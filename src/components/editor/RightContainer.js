/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import { useDispatch, useSelector } from "react-redux";
import { addTemplateId } from "../../store/resumeSlice";

const RightContainer = () => {
  const [selectedNav, setSelectedNav] = useState(0);

  // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const templateId = useSelector((store) => store.resume.templateId);
  const userData = useSelector((store) => store.resume);

  useEffect(() => {
    setSelectedNav(parseInt(templateId));
  }, [templateId]);

  useEffect(() => {
    dispatch(addTemplateId(selectedNav));
  }, [selectedNav]);
  return (
    <div>
      {/* Header */}
      <div className="d-flex cursor-pointer">
        <div className="p-2" onClick={() => setSelectedNav(0)}>
          <span className={selectedNav === 0 ? "active-nav" : ""}>
            Template 1
          </span>
        </div>
        <div className="p-2" onClick={() => setSelectedNav(1)}>
          <span className={selectedNav === 1 ? "active-nav" : ""}>
            Template 2
          </span>
        </div>
      </div>
      {/* Body */}
      {selectedNav === 0 && <Template1 userData={userData} />}
      {selectedNav === 1 && <Template2 userData={userData} />}
    </div>
  );
};

export default RightContainer;
