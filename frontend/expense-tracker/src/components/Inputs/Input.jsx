import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ valus, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && <label className="text-[13px] text-slate-800">{label}</label>}

      <div className="flex items-center gap-2 border rounded px-2 py-1 input-box">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={valus}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
