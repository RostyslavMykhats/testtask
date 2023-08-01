// components/Input/input.jsx
import React, { useState } from "react";
import s from "./style.module.scss";

const Input = ({ placeholder, value, onChange }) => {
  const isEmpty = value.trim() === "";
  const [isClicked, setIsClicked] = useState(false);

  const handleInputChange = (e) => {
    setIsClicked(false);
    onChange(e);
  };

  const handleBlur = () => {
    setIsClicked(true);
  };

  const inputClassName = `${s.input} ${
    isClicked && isEmpty ? s["input-error"] : ""
  }`;

  return (
    <input
      type="text"
      className={inputClassName}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
    />
  );
};

export default Input;
