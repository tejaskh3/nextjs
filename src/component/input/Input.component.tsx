import React from "react";

const Input = ({ htmlFor, lableData, otherProps }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-gray-700 text-sm font-bold mb-0"
      >
        {lableData}
      </label>
      <input
        className="shadow  border  w-full py-2 px-5  leading-tight focus:outline-none focus:shadow-outline rounded-lg !text-[#000]"
        {...otherProps}
        style={{color:"#000"}}
      />
    </>
  );
};

export default Input;
