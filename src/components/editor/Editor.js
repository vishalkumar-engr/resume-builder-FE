/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasic,
  addEducation,
  addExperience,
  addPersonalSkills,
  addProject,
  addSocial,
  addTechnicalSkills,
  addTemplateId,
  addTitle,
  setInitial
} from "../../store/resumeSlice";
import { increaseCount, decreaseCount } from "../../store/loaderSlice";
import { getAjaxCall, postAjaxCall, putAjaxCall } from "../../service/Service";
import { apiUrls } from "../../service/ApiUrls";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../commonComponents/PopUp";
import { validatorRegex } from "../../utils/Constant";
import { nextNavigation } from "../../store/navigationSlice";

const Editor = () => {
  const [flag, setFlag] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Redux Selector and Dispatcher
  const dispatch = useDispatch();
  const templateId = useSelector((store) => store.resume.templateId);
  let resumeData = useSelector((store) => store.resume);
  const title = useSelector((store) => store.resume.title);
  const navigator = useSelector((store) => store.navigator.navigation);

  useEffect(() => {
    if (id) {
      handleUserResume(id);
      dispatch(nextNavigation(0));
    } else {
      dispatch(setInitial());
      dispatch(nextNavigation(0));
    }
  }, []);

  const handleResumeSubmit = () => {
    if (id) {
      handleEditResumeSubmit();
    } else {
      handleNewResumeSubmit();
    }
  };

  const handleNewResumeSubmit = async () => {
    if (title !== "") {
      setFlag(true);
      dispatch(increaseCount());
      const { error } = await postAjaxCall(apiUrls?.addResume, resumeData);
      if (error === "") {
        setSuccess(true);
        dispatch(decreaseCount());
      } else {
        dispatch(decreaseCount());
        setFailureMessage(error.response.data.message);
        setFailure(true);
      }
    } else {
      setFlag(true);
    }
  };

  const handleEditResumeSubmit = async () => {
    dispatch(increaseCount());
    const apiUrl = `${apiUrls?.addResume}?id=${id}`;
    let { title, ...payload } = resumeData;
    const { error } = await putAjaxCall(apiUrl, payload);
    if (error === "") {
      setSuccess(true);
      dispatch(decreaseCount());
    } else {
      dispatch(decreaseCount());
      setFailureMessage(error);
      setFailure(true);
    }
  };

  const handleUserResume = async (id) => {
    const apiUrl = `${apiUrls?.getResume}/${id}`;
    const { data, error } = await getAjaxCall(apiUrl);
    if (error === "") {
      dispatch(addBasic(data?.basic));
      dispatch(addEducation(data?.education));
      dispatch(addExperience(data?.experience));
      dispatch(addProject(data?.project));
      dispatch(addTechnicalSkills(data?.technicalSkills));
      dispatch(addPersonalSkills(data?.personalSkills));
      dispatch(addSocial(data?.social));
      dispatch(addTemplateId(data?.templateId));
      dispatch(addTitle(data?.title));
    } else {
      console.error(error);
    }
  };

  const handleResumeTitle = (event) => {
    const value = event.target.value;
    const alphaNumericRegex = validatorRegex.alphanumeric;
    if (alphaNumericRegex.test(value) || value === "") {
      dispatch(addTitle(value));
    }
  };

  return (
    <>
      <div className="padd-both">
        {flag && (
          <div className="row mb-2 alert alert-danger" role="alert">
            Resume title is required!
          </div>
        )}
        <div className="row mb-2">
          <div className="col-lg-5 bg-light border rounded pb-3">
            <div className="pt-2">
              <div className="form-group d-flex">
                <label
                  className="ml-2 w-50 mt-2 h5"
                  htmlFor="exampleInputEmail1"
                >
                  Resume Title*
                </label>
                <input
                  className="form-control mt-1"
                  id="exampleInputEmail1"
                  placeholder="Enter title"
                  onChange={handleResumeTitle}
                  value={title}
                  disabled={id ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6 bg-light border rounded d-flex align-items-center h5">
            Selected Template : {parseInt(templateId) + 1}
          </div>
        </div>
        <div className="row min-vh-100 ">
          <div className="col-lg-5 bg-light border rounded">
            <LeftContainer />
            {navigator === 5 && (
              <div className="row mt-2 px-4">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleResumeSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6 bg-light border rounded">
            <RightContainer />
          </div>
        </div>
      </div>
      {success && (
        <Popup
          title={"Success"}
          message={"Hurray!! Your Details are Saved Successfully"}
          close={() => setSuccess(false)}
          next={() => navigate()}
        />
      )}
      {success && (
        <Popup
          title={"Success"}
          message={"Hurray!! Your Details are Saved Successfully"}
          close={() => setSuccess(false)}
          next={() => navigate("/browse")}
        />
      )}
      {failure && (
        <Popup
          title={"Failure"}
          message={`Oops!! ${failureMessage}`}
          close={() => setFailure(false)}
          next={() => setFailure(false)}
        />
      )}
    </>
  );
};

export default Editor;
