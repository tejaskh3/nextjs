"use client";

import axios from "axios";
import React, { useEffect, useState} from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {AiFillEdit} from 'react-icons/ai'
import { Delete, Done, Edit } from "@/component/svgs";
const ProfilePage = () => {
  const [data, setData] = useState({});
  const [loggingOut, setLoggingOut] = useState(false);
  const [toDo, setToDo] = useState({
    name: "",
    description: "",
    isCompleted: "",
  });
  const [toDos, setToDos] = useState();
  const router = useRouter();

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
      router.push("/login");
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
  const handleSubmit = async () => {
    try {
      console.log(toDo);
      const response = await axios.post("api/todo", toDo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTodo = async () => {
    try {
      const res: any = await axios.get("api/todo");
      setToDos(res.data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTodo();
    getUserData();
  }, []);
  console.log(toDos);
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
      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-3xl text-gray-500">Your work</h2>
        <div className="flex flex-row gap-2">
          <div className="bg-white text-black">
            <h3>name</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, itaque?</p>
            <div className="flex flex-row justify-around gap-0">
              <Edit/>
              <Delete/>
              <Done/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// "use client";

// import axios from "axios";
// import { ChangeEvent, useEffect, useState } from "react";

// export default function Home() {
//   const [toDo, setToDo] = useState({
//     name: "",
//     description: "",
//     isCompleted: "",
//   });
//   const [data, setData] = useState();
//   const handleChange = (e: ChangeEvent) => {
//     const { name, value } = e.target as HTMLInputElement;
//     setToDo({ ...toDo, [name]: value });
//   };
//   const handleSubmit = async () => {
//     try {
//       console.log(toDo);
//       const response = await axios.post("api/todo", toDo);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getAllTodo = async () => {
//    try {
//     const res:any = await axios.get("api/todo");
//     setData(res);
//    } catch (error) {
//     console.log(error);

//    }
//   };
//   useEffect(() => {
//     getAllTodo();
//   },[]);
//   console.log(data);

//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <form className="flex flex-col gap-1 text-black">
//         <input
//           type="text"
//           onChange={handleChange}
//           name="name"
//           id="name"
//           value={toDo.name}
//           className="rounded-lg"
//         />
//         <input
//           type="text"
//           onChange={handleChange}
//           name="description"
//           id="name"
//           value={toDo.description}
//           className="rounded-lg"
//         />
//       </form>
//       <button onClick={handleSubmit} type="button">
//         Add Todo
//       </button>
// <div>
// <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
// 	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
//         <div className="mb-4">
//             <h1 className="text-grey-darkest">Todo List</h1>
//             <div className="NamefNamelex mt-4">
//                 <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"></input>
//                 <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
//             </div>
//         </div>
//         <div>
//             <div className="flex mb-4 items-center text-black">
//                 <p className="w-full text-grey-darkest">Add another component to Tailwind Components</p>
//                 <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
//                 <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
//             </div>
//           	<div className="flex mb-4 items-center">
//                 <p className="w-full line-through text-green">Submit Todo App Component to Tailwind Components</p>
//                 <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
//                 <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
//     </main>
//   );
// }
