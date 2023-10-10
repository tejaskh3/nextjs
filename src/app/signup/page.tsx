"use client"

import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Input from '@/component/input/Input.component';
const SignUpPage = () => {
  const [user,setUser] = useState({
    email:"",
    password:"",
    userName:"",
  })
  const {userName, email,password} = user;
  const handleChange = (e:ChangeEvent) =>{
    const {name, value} = e.target as HTMLInputElement;
    console.log(value);
    setUser({...user,[name]:value});
  }
  const handleSubmit = (e:SubmitEvent) =>{
    e.preventDefault();
    console.log(user);
  }
  return (
    <div className='flex m-auto flex-col items-center justify-center py-3 content-center mt-40 gap-3 p-5'>
      <h3 className='text-4xl text-gray-900 dark:text-white'>Sign Up</h3>
      <form className='flex m-auto flex-col gap-2 '>
        <Input htmlFor={"userName"} lableData={"Enter your user name."} 
          otherProps={{
            name:"userName",
            value:userName,
            id:'userName',
            placeholder:'user name',
            type:'text',
            onChange: handleChange,
          }}
        />
        <Input htmlFor={"email"} lableData={"Enter your email."} 
          otherProps={{
            name:"email",
            value:email,
            id:'email',
            placeholder:'email',
            type:'email',
            onChange: handleChange,
          }}
        />
        <Input htmlFor={"password"} lableData={"Enter your user password"} 
          otherProps={{
            name:"password",
            value:password,
            id:'password',
            placeholder:'password',
            type:'password',
            onChange: handleChange,
          }}
        />

        
      </form>
      <button type="submit" onClick={handleSubmit} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>
      Login
      </button>
      <Link href='/login'>Already have an account.</Link>
    </div>
  )
}

export default SignUpPage