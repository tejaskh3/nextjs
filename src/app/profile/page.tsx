"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { Delete, Done, Edit } from "@/component/svgs";
import ToDoItem from "@/component/to-do/ToDoItem.component";
import Input from "@/component/input/Input.component";
const ProfilePage = () => {
  const [data, setData] = useState({});
  const [loggingOut, setLoggingOut] = useState(false);
  // this is to take input
  const [toDo, setToDo] = useState({
    name: "",
    description: "",
  });
  const { name, description } = toDo;

  // this is to store all to do of user on load
  const [toDos, setToDos] = useState([]);
  const router = useRouter();

  // for a model to be open so that new task can be added
  const [isAddToDoFormOpen, setIsAddToDoFormOpen] = useState(false);

  // getting user so that we can show his name on top left corner
  const getUserData = async () => {
    const response = await axios.get("api/users/user");
    console.log(response.data.user);
    setData(response.data.user);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("api/users/logout");
      // if(res.data.success===true){
      toast.success("Logout successfully.");
      router.push("/");
      // }
      console.log(res);
    } catch (error: any) {
      toast.error(`error while logging out ${error.message}`);
    }
  };
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setToDo({ ...toDo, [name]: value });
  };

  // creating another to do by hitting api
  const handleSubmit = async () => {
    try {
      const response = await axios.post("api/todo", toDo);
      console.log(response.data);
      toast.success("to do added");
    } catch (error: any) {
      console.log(error.message);
      toast.error("unable to add");
    } finally {
      setIsAddToDoFormOpen(false);
    }
  };

  // get allToDos of this user
  const getAllTodo = async () => {
    try {
      const res: any = await axios.get("api/todo");
      setToDos(res.data.toDos);
    } catch (error) {
      console.log(error);
    }
  };

  // on first load this will show user name of first person and get all todo of this user
  useEffect(() => {
    getAllTodo();
    getUserData();
  }, []);
  console.log(toDos);
  let num = 0; // this number is to render no. of tasks

  const handleComplete = async () => {
    console.log("complete");
  };
  const handleEdit = async () => {
    console.log("edit");
  };

  const handleDelete = async (taskID) => {
    try {
      const response = await axios.delete(`api/todo/${taskID}`);

      if (response.status === 200) {
        // Task deleted successfully
        toast.success("Task deleted");
      } else {
        // Handle other status codes or unexpected responses
        toast.error("Error deleting task");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error(error);
      toast.error("Error deleting task");
    }
  };

  return (
    <div>
      <nav className="flex flex-row justify-between m-10">
        <h3 className="text-[#adadad] text-3xl">Hello!!! {data.userName}</h3>
        <button
          type="button"
          onClick={handleLogout}
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          {loggingOut ? "Logging Out" : "Logout"}
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
                // marginTop: "480px",
              }}
            />
          )}
        </Toaster>
      </nav>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row justify-between gap-10">
          <h2 className="text-3xl text-gray-500">Your work</h2>

          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => {
              setIsAddToDoFormOpen(true);
              console.log("Clicked");
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add Todo
            </span>
          </button>
        </div>
        {isAddToDoFormOpen && (
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
        )}
        {toDos.length === 0 && (
          <h2 className="text-3xl text-white">Nothing To Do Yet</h2>
        )}
        {toDos.map(({ name, description, isCompleted, _id }) => {
          num++;
          return (
            <ToDoItem
              key={_id}
              name={name}
              description={description}
              num={num}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              _id={_id}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
