import React from "react";
import { Delete, Done, Edit } from "../svgs";
const ToDoItem = ({
  _id,
  name,
  description,
  isCompleted,
  num,
  handleEdit,
  handleDelete,
  handleComplete,
}) => {
  
  return (
    <div
      className="flex flex-row gap-2 justify-between align-middle relative font-extrabold text-transparent bg-gradient-to-br bg-clip-text shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),10px_10px_30px_4px_rgba(45,78,255,0.15)] p-3 rounded-lg"
      style={{
        boxShadow: "0 5px 10px rgba(240, 46, 170, 10)",
        padding: "10px",
        border: ".5px solid white",
        width: "60%",
      }}
    >
      <div className="relative font-extrabold text-transparent bg-gradient-to-br bg-clip-text shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),10px_10px_30px_4px_rgba(45,78,255,0)] p-3 rounded-lg ">
        <h3 className="text-white" style={{ marginLeft: "50%" }}>
          {`Task ${num}. ${name}`}
        </h3>
        <p className={`text-white ${isCompleted ? "line-through" : ""}`}>
          {description}
        </p>
        {/* {isEditable ? (
  <input
    type="text"
    value={description}
    onChange={(e) => handleDescriptionChange(e.target.value)}
    className="text-white outline-none border-b border-white"
  />
) : (
  <p className={`text-white ${isCompleted ? "line-through" : ""}`}>
    {description}
  </p>
)} */}
      </div>
      <div
        className="flex flex-row justify-around align-middle items-center gap-0 mt-9 "
        style={{ borderLeft: ".5px solid white" }}
      >
        <div onClick={() => handleEdit(_id)}>
          <Edit />
        </div>

        <div onClick={() => handleDelete(_id)}>
          <Delete />
        </div>

        <div>
          <Done onClick={() => handleComplete(_id)} />
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
