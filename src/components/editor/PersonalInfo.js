/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputBox from "../commonComponents/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { addBasic } from "../../store/resumeSlice";
import { nextNavigation } from "../../store/navigationSlice";

const PersonalInfo = () => {
  const [isValid, setIsValid] = useState(false);
  const [state, setState] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    profession: "",
    city: "",
    state: "",
    pinCode: "",
    about: "",
  });

  // Redux selector and Dispatcher
  const dispatch = useDispatch();
  const basic = useSelector((store) => store.resume.basic);

  useEffect(() => {
    setState(basic);
  }, [basic]);

  useEffect(() => {
    setIsValid(false);
  }, [state]);

  const handleSubmit = () => {
    if (
      state.first &&
      state.last &&
      state.email &&
      state.profession &&
      state.city &&
      state.state &&
      state.about &&
      state.phone &&
      state?.first !== "" &&
      state?.last !== "" &&
      state?.email !== "" &&
      state?.profession !== "" &&
      state?.city !== "" &&
      state?.state !== "" &&
      state?.about !== "" &&
      state?.phone !== ""
    ) {
      dispatch(addBasic(state));
      dispatch(nextNavigation(1));
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="container pt-2 ">
      <InputBox
        label="First Name *"
        placeholder="Enter first name"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              first: e,
            };
          })
        }
        value={state?.first}
      />
      <InputBox
        label="Last Name *"
        placeholder="Enter last name"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              last: e,
            };
          })
        }
        value={state?.last}
      />
      <InputBox
        label="Email Id *"
        fieldType="email"
        placeholder="Enter email-id"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              email: e,
            };
          })
        }
        value={state?.email}
      />
      <InputBox
        label="Phone Number *"
        fieldType="phone"
        type="Number"
        placeholder="Enter phone number"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              phone: e,
            };
          })
        }
        value={state?.phone}
      />
      <InputBox
        label="Profession *"
        placeholder="Enter profession"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              profession: e,
            };
          })
        }
        value={state?.profession}
      />
      <InputBox
        label="City *"
        placeholder="Enter city"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              city: e,
            };
          })
        }
        value={state?.city}
      />
      <InputBox
        label="State *"
        placeholder="Enter state"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              state: e,
            };
          })
        }
        value={state?.state}
      />
      <InputBox
        label="Pin-code"
        fieldType="pinCode"
        placeholder="Enter pin-code"
        type="Number"
        onChange={(e) =>
          setState((prevState) => {
            return {
              ...prevState,
              pinCode: e,
            };
          })
        }
        value={state?.pinCode}
      />

      <div className="form-group pt-2">
        <label>About *</label>
        <textarea
          className="form-control"
          rows="3"
          onChange={(e) =>
            setState((prevState) => {
              return {
                ...prevState,
                about: e.target.value,
              };
            })
          }
          value={state?.about}
        ></textarea>
      </div>
      {isValid && (
        <div className="px-3 alert alert-danger d-flex justify-content-center mt-2">
          Please fill all * fields
        </div>
      )}
      <div className="row px-3">
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3 disabled"
        >
          Back
        </button>
        <div className="col-lg-8"></div>
        <button
          type="button"
          className="col-lg-2 btn btn-secondary my-3"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
