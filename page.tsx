"use client"

import React, { useState } from 'react'; // Importing React and useState hook
import { useForm } from 'react-hook-form'; // Importing useForm hook for form handling
import Button from '@/components/layout/Button'; // Custom button component
import { FormType } from '@/lib/utils/types'; // Custom type definitions for form data
import Link from 'next/link'; // Link component for navigation
import { setCookie } from 'cookies-next'; // Function to set cookies
//import { useRouter } from 'next/router'; // Corrected import for useRouter hook
import { useRouter } from 'next/router';

//// Functional Component Definition

const page = () => {

  //let formData = new FormData();

  const [error, setError] = useState<string>(); // State to store error messages
  const { register, handleSubmit } = useForm<FormType>(); // Hook for form handling with type definition
  //const router = useRouter(); // Hook for programmatic navigation

  //const router = useRouter();

  const loginFn = async (data: FormType) => { // Asynchronous function to handle login
    
    const response = await fetch(`http://localhost:8000/api/Signin`, { // POST request to login API
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data)
    });

    if (!response.ok) { // Handling non-ok responses
      setError(await response.json()); // Assuming the error response is in JSON format
    } 
    else {
      setError(""); // Resetting error on successful login

      // const tokens_data = await response.json()
      // console.log(tokens_data);
      console.log("response ",response)

      //console.log(loginFn)

      const { access_token, refresh_token } = await response.json(); // Destructuring tokens from response

      // Calculating expiration times for cookies
      const access_expiration_time = new Date();
      access_expiration_time.setSeconds(access_expiration_time.getSeconds() + access_token.access_expiry_time);

      const refresh_expiration_time = new Date();
      refresh_expiration_time.setSeconds(refresh_expiration_time.getSeconds() + refresh_token.refresh_expiry_time);

      // // Setting cookies with respective tokens and expiration times
      // setCookie("access_token", access_token.token, { expires: access_expiration_time, secure: true });
      // setCookie("refresh_token", refresh_token.token, { expires: refresh_expiration_time, secure: true });

      // //router.push("/"); // Navigating to the homepage upon successful login
      
      // console.log(access_expiration_time)
      // console.log(refresh_expiration_time)

      console.log("access expiration time ",access_expiration_time)
      console.log("access expiration time ",refresh_expiration_time)
    }
  };

  return (

    <main className='h-screen flex justify-center items-center bg-gradient-to-tr  bg-gray-300 '>

    <div className='w-1/3 p-6 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
      <h1 className='md:text-2xl text-xl font-bold  m-2'>Quiz Hub</h1>
      <p className='text-red-500'>{error ? error : ""}</p>
      <form onSubmit={handleSubmit(loginFn)} className='flex flex-col gap-4 justify-center items-center'>
        {/* 
        <input className='rounded-md border  p-1.5' type="text" placeholder='userName'  {...register("user_name", {
          required: true,
          // pattern:"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        })} /> */}

        <input className='rounded-md border p-1.5' type="email" placeholder='userEmail' {...register("user_email", {
          required: true
        })} />
        <input className='rounded-md border p-1.5' type="password" placeholder='userPassword' {...register("user_password", {
          required: true,
          minLength: 6
        })} />
        <Button buttonType='submit'>
          Sign In
        </Button>
      </form>

      <h1 className='md:text-xl text-gray-900 m-2'>
        Don't have an account?
      </h1>
      <Link href={"/register"}>
        <Button buttonType='button'>
          Sign Up
        </Button>
      </Link>
    </div>
  </main>
  );
};
     
export default page; // Exporting the component




//  How register works?

// {
//   user_name:"bilal"
// }
// {
//   user_name:"bilal",
//   user_email: "bilal2gmil.vom"
// }
// {
//   user_name:"bilal",
//   user_email: "bilal2gmil.vom",
//   user_password:"bilal123"
// }

// destructuring in javascript

// const {access_token, refresh_token} = {
//   access_token: {

//   },
//   refresh_token: {

//   }
// }




    