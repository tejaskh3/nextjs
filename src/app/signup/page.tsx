"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/component/input/Input.component";
import toast, { Toaster, ToastBar } from "react-hot-toast";

const defaultUser = {
  email: "",
  password: "",
  userName: "",
};
const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const { userName, email, password } = user;
  const router = useRouter();
  const notifyFieldsFill = () => toast.error("Please fill all the fields.");
  const notifyEmailType = () =>
    toast.error("Please fill correct type of email.");
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: SubmitEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (userName.length <= 0 || email.length <= 0 || password.length <= 0) {
        notifyFieldsFill();
        return;
      }
      if (!email.includes("@")) {
        notifyEmailType();
        return;
      }
      const res = await axios.post("api/users/signup", user);
      if (res.data.message === "User already exists.") {
        toast.error("User already exists.");
        return;
      }

      setUser(defaultUser);
      toast.success("User Created");
      router.push("/login");
    } catch (error: any) {
      console.log("this is an error ");

      if (error.message === "User already exists.") {
        toast.error(`unable to signup due to ${error.message}`);
      }
      console.log("error while signup", { error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex m-auto flex-col items-center justify-center py-3 content-center mt-40 gap-3 ">
      <h3 className="text-4xl text-gray-900 dark:text-white">
        {loading ? "Loading..." : "Sign Up"}
      </h3>
      <form className="flex m-auto flex-col gap-2 ">
        <Input
          htmlFor={"userName"}
          lableData={"Enter your user name."}
          otherProps={{
            name: "userName",
            value: userName,
            id: "userName",
            placeholder: "user name",
            type: "text",
            onChange: handleChange,
          }}
        />
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
        {loading ? "Processing.." : "Resister"}
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
      <Link href="/login">Already have an account.</Link>
    </div>
  );
};

export default SignUpPage;
