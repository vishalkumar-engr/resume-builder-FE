import React, { useState } from "react";
import { validatorRegex } from "../../utils/Constant";

const InputBox = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [message, setMessage] = useState("");
  const { label, placeholder, onChange, type, value, fieldType } = props;

  const handleOnChange = (event) => {
    const value = event.target.value;
    switch (fieldType) {
      case "email":
        onChange(value);
        const emailRegex = validatorRegex.email;
        if (value === "" && isTouched) {
          setMessage("Email is required");
          setIsValid(true);
        } else if (!emailRegex.test(value)) {
          setMessage("Invalid Email!");
          setIsValid(true);
        } else if (value === "" && isTouched) {
          setMessage("email is required");
          setIsValid(true);
        } else {
          setMessage("");
          setIsValid(false);
        }
        break;
      case "phone":
        onChange(value);
        const phoneRegex = validatorRegex.phone;
        if (value === "" && isTouched) {
          setMessage("phone no. is required");
          setIsValid(true);
        } else if (!phoneRegex.test(value)) {
          setMessage("Invalid phone no!");
          setIsValid(true);
        } else {
          setMessage("");
          setIsValid(false);
        }
        break;
      case "pinCode":
        onChange(value);
        const pinCodeRegex = validatorRegex.pinCode;
        if (pinCodeRegex.test(value) || value === "") {
          setMessage("");
          setIsValid(false);
        } else {
          setMessage("Invalid pin-code!");
          setIsValid(true);
        }
        break;
      case "none":
        onChange(value);
        break;
      default:
        const alphanumericRegex = validatorRegex.alphanumeric;
        if (isTouched && value === "") {
          onChange(value);
          setMessage("Field is required!");
          setIsValid(true);
        } else if (alphanumericRegex.test(value)) {
          onChange(value);
          setMessage("");
          setIsValid(false);
        } else {
          setMessage("");
          setIsValid(false);
        }
    }
  };

  return (
    <div className="pt-2">
      <div className="form-group">
        <label className="ml-2" htmlFor="exampleInputEmail1">
          {label}
        </label>
        <input
          pattern="[a-zA-Z0-9 ]+"
          type={type ? type : "text"}
          className="form-control mt-1"
          id="exampleInputEmail1"
          onBlur={() => setIsTouched(true)}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
        />
      </div>
      {isValid && <div style={{ color: "red" }}>{message}</div>}
    </div>
  );
};

export default InputBox;
