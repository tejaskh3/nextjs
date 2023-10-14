"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Input from "@/component/input/Input.component";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { email, password } = user;
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    console.log(value);
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: SubmitEvent) => {
    try {
      setLoading(true);
      if (email.length <= 0 || password.length <= 0) {
        toast.error("Please provide all fields");
        return;
      }
      if (!email.includes("@")) {
        toast.error("Please fill correct type of email.");
        return;
      }

      const response = await axios.post("api/users/login", user);
      console.log(response);
      // if (response.status === 400) {
      //   toast.error(`Bad Request: ${response.statusText}`);
      //   // You can also handle the specific error message from the server if available
      //   if (response.data && response.data.message) {
      //     toast.error(`Error message: ${response.data.message}`);
      //   }
      //   return;
      // }
      
      toast.success("Login successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(`Unable to login due to, ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex m-auto flex-col items-center justify-center py-3 content-center mt-40 gap-3 p-5">
      <h3 className="text-4xl text-teal-300 dark:text-white">
        {loading ? "Loading..." : "Login"}
      </h3>
      <form className="flex m-auto flex-col gap-2 ">
        <Input
          htmlFor={"email"}
          lableData={"Enter your email."}
          otherProps={{
            name: "email",
            value: email,
            id: "email",
            placeholder: "email",
            type: "email",
            onChange: handleChange,
          }}
        />
        <Input
          htmlFor={"password"}
          lableData={"Enter your user password"}
          otherProps={{
            name: "password",
            value: password,
            id: "password",
            placeholder: "password",
            type: "password",
            onChange: handleChange,
          }}
        />
      </form>
      <button
        type="button"
        onClick={handleSubmit}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        {loading ? "logging..." : "Login"}
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
      <Link className="text-white" href="/signup">Don't have an account.</Link>
    </div>
  );
};

export default LoginPage;
