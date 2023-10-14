import React, { ChangeEvent, useState } from "react";
import Input from "../input/Input.component";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import axios from "axios";

const AddToDoForm = ({ setIsAddToDoFormOpen,setToDo }) => {
  const [toDo, setToDo1] = useState({
    name: "",
    description: "",
  });
  const { name, description } = toDo;
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setToDo({ ...toDo, [name]: value });
  };
  const handleSubmitToDo = async () => {
    // try {
    //   const response = await axios.post("api/todo");
    //   console.log(response.data);
    //   toast.success("to do added");
    // } catch (error: any) {
    //   console.log(error.message);
    //   toast.error("unable to add");
    // } finally {
      setIsAddToDoFormOpen(false);
    // }
  };
  return (
    <div>
      <form
        action=""
        className="flex flex-col  text-black items-center"
        style={{ color: "black" }}
      >
        <Input
          lableData={"Todo Name"}
          htmlFor={"name"}
          otherProps={{
            name: "name",
            id: name,
            onChange: handleChange,
            placeholder: "Enter todo name",
          }}
        />
        <Input
          lableData={"Description"}
          htmlFor={"description"}
          otherProps={{
            name: "description",
            id: description,
            onChange: handleChange,
            placeholder: "Enter todo name",
          }}
        />
      </form>
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mt-3 ml-16"
        onClick={handleSubmit}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Teal to Lime
        </span>
      </button>
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
              marginTop: "480px",
            }}
          />
        )}
      </Toaster>
    </div>
  );
};

export default AddToDoForm;
