/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAjaxCall } from "../service/Service";
import { apiUrls } from "../service/ApiUrls";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";

const Preview = () => {
  const { id } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    getResumeDetails();
  }, []);

  const getResumeDetails = async () => {
    const { data, error } = await getAjaxCall(`${apiUrls?.getResume}/${id}`);
    if (error === "") {
      setState(data);
    } else {
      console.error(error);
    }
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center">Title - {state?.title}</h2>
        {state?.templateId === "0" && <Template1 userData={state} />}
        {state?.templateId === "1" && <Template2 userData={state} />}
      </div>
    </>
  );
};

export default Preview;
