"use client"
import '../../app/globals.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/APIRoutes";

import logo from '../../public/logo.svg'
import styles from './register.module.scss'

const Register = () => {

  const [values, setValues] = useState({
    username: '', email: '', password: '', confirmPassword: '',
  });

  const toastOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    // theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('user_data'
      // process.env.IDENTIFICATION_KEY || "id_key"
      )) {
      Router.replace("/");
    }
  }, []);

  const handleChange = (event:any) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleValidation = () => {
    let isValid = true;
    const {username, email,  password, confirmPassword} = values;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!username || !email || !password || !confirmPassword){ 
      toast.error('Enter required data', toastOptions);
      return false;
    }
    else if( username.length < 4){
      toast.error('Username must be at least 4 characters long ', toastOptions);
      isValid =  false;
    }
    if(!emailRegex.test(email)) {
      toast.error('Enter valid email', toastOptions);
      isValid = false;
    }
    if(password.length < 3){
      toast.error('Choose a strong password', toastOptions);
      isValid = false;
    }else if(password !== confirmPassword){
      toast.error("Password and confirm Password should be same", toastOptions);
      isValid = false;
    } 
    // if (isValid) toast.success('Succesfully logging in!');
    return isValid;
  }

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      if(handleValidation()){
        console.log("in validation", registerRoute);
        const {username, email,  password} = values;
        const {data} = await axios.post(registerRoute, 
          // method:'post',
          // data: 
          {username, email, password},

        );
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          console.log('hello');
          localStorage.setItem(
            'user_data',
            // process.env.IDENTIFICATION_KEY || "id_key",
            JSON.stringify(data.user)
            
          );
          Router.replace("/");
        }
      
      };
  }

  return (
    <>
      <div className={styles.div}>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.brand}>
            <Image src={logo} alt='Whispp' width={100} height={100}/>
            <h1>Whispp</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
          <input type='email' placeholder='Email' name='email' onChange={e=>handleChange(e)}/>
          <input type='password' placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
          <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={e=>handleChange(e)}/>
          <button type='submit'>Create User</button>
          <span>Already have ann account? 
            <Link href='/login'> Login </Link>
            </span>
          </form>
      </div>
      <ToastContainer />
    </>
  )
}



export default Register