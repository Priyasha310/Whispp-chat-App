import React, { useEffect, useState } from 'react'
import styles from './welcome.module.scss'
import Image from 'next/image'
import robot from '@/public/robot.gif'
import Router from 'next/router'

const Welcome = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async()=>{
      if(!localStorage.getItem("user_data"))
        Router.replace("/login");
      else{
        setUserName(
        await JSON.parse(
          localStorage.getItem("user_data") || 'null'
        ).username
      );
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.wcContainer}>
      <Image src={robot} alt="" width={300} height={100}/>
      <h1>
        Welcome, <span>{userName.toUpperCase()} !</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}

export default Welcome