import '@/app/globals.scss'
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleChange, handleSubmit } from '@/utils/registerForm';
import loader from "@/public/loader.gif";
import logo from '../../public/logo.png'
import styles from './register.module.scss'

const Register = () => {  
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    username: '', email: '', password: '', confirmPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem('user_data')) {
      Router.replace("/chat");
    }
    setIsLoading(false) 
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
          <input type='email' placeholder='Email' name='email' onChange={e=>handleChange(e, values, setValues)}/>
          <input type='password' placeholder='Password' name='password' onChange={e=>handleChange(e, values, setValues)}/>
          <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={e=>handleChange(e, values, setValues)}/>
          <button type='submit'>Create User</button>
          <span>Already have an account? 
            <Link href='/login'> Login </Link>
            </span>
          </form>
      </div>
      )} 
      <ToastContainer />
    </>
  )
}



export default Register