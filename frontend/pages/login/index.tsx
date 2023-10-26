'use client'
import '@/app/globals.scss'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {  handleChange, handleSubmit } from '@/utils/loginForm'
import logo from '@/public/logo.png'
import loader from "@/public/loader.gif";
import styles from './login.module.scss'

const Login = () => {
    
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    username: '',  password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('user_data')) {
      Router.replace("/");
    }
    setIsLoading(false);
  }, []);

  return (
    <>
    {isLoading ? (
        <div className="loadContainer">
          <Image src={loader} alt="loader" className="loader" width={100} height={100} />
        </div>
      ) : (
      <div className={styles.div}>
        <form action="" onSubmit={(event) => handleSubmit(event, values, setValues)}>
          <div className={styles.brand}>
            <Image src={logo} alt='Whispp' width={80} height={60}/>
            <h1>Whispp</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={e=>handleChange(e, values, setValues)}/>
          <input type='password' placeholder='Password' name='password' onChange={e=>handleChange(e, values, setValues)}/>
          <button type='submit'>Login</button>
          <span>Don't have an account? 
            <Link href='/register'> Register </Link>
            </span>
          </form>
      </div>
      )}
      <ToastContainer /> 
    </>
  )
}

export default Login