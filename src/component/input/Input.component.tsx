import React from "react";

const Input = ({ htmlFor, lableData, otherProps }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-teal-200 text-sm font-bold mb-0"
      >
        {lableData}
      </label>
      <input
        className="shadow  border  w-full py-2 px-5  leading-tight focus:outline-none focus:shadow-outline rounded-lg !text-[#000]"
        {...otherProps}
      />
    </>
  );
};

export default Input;
