"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const [data, setData] = useState({ _id: "" });
  const [loggingOut, setLoggingOut] = useState(false);
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
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <nav className="flex flex-row justify-between m-10">
        <p>next-auth</p>
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
      <h1>{data._id}</h1>
    </div>
  );
};

export default ProfilePage;
