"use client"
import '@/app/globals.scss'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Router from 'next/router';
import axios from 'axios';
import loader from "@/public/loader.gif";
import styles from './chat.module.scss'
import { allUsers } from '@/utils/APIRoutes';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(()=>{
    const fetchData =async () => {
      if(!localStorage.getItem("user_data"))
        Router.replace("/login");
      else{
        setCurrentUser(
          await JSON.parse(localStorage.getItem("user_data") || 'null')
        )
      }
    }
    
    setIsLoading(false) 
  },[])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (currentUser) {
  //       if (currentUser.isAvatarImageSet) {
  //         const data = await axios.get(`${allUsers}/${currentUser._id}`);
  //         setContacts(data.data);
  //       } else {
  //         Router.replace("/setProfile");
  //       }
  //     }
  //   }
  //   }, [currentUser]);

  return (
    <>
    {/* {isLoading ? (
        <div className="loadContainer">
          <Image src={loader} alt="loader" className="loader" width={100} height={100} />
        </div>
      ) : ( */}
    <div className={styles.chatContainer}>Chat
      <div className={styles.container}></div>
    </div>
      {/* )} */}
    </>
  )
}

export default Chat