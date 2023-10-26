"use client"
import '@/app/globals.scss'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Router from 'next/router';
import axios from 'axios';
import loader from "@/public/loader.gif";
import styles from './chat.module.scss'
import { allUsers } from '@/utils/APIRoutes';
import Contacts from '@/components/Contacts/Contacts';
import Welcome from '@/components/Welcome/Welcome';
import ChatContainer from '@/components/ChatContainer/ChatContainer';
import { CurrentUserInterface } from '@/models/models';


const Chat = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserInterface | null>(null);
  const [currentChat, setCurrentChat] = useState<any>(undefined);

  useEffect(()=>{
      if(!localStorage.getItem("user_data")){
        console.log("No user data found in local storage");
        Router.replace("/login");
      }
      else{
        const userData = JSON.parse(localStorage.getItem("user_data")||'null')
        setCurrentUser(userData);
        console.log("User data found in local storage:", userData);        
      }
      setIsLoading(false) 
  },[])//render once

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        console.log("current user present", currentUser);
        
        if (currentUser.isAvatarImageSet) {
          console.log("Avatar image is set for the current user");
          const data = await axios.get(`${allUsers}/${currentUser._id}`);
          setContacts(data.data.Users);
          console.log("data of users", data.data.Users);   
        }
        else {
          console.log("Avatar image is not set for the current user");
          Router.replace("/setProfile");
        }
      }
      else console.log("no current user"); 
    }
    fetchData();    
  }, [currentUser]);

  const handleChatChange = (chat: React.SetStateAction<undefined>) => {
    setCurrentChat(chat);
  };

  return (
    <>
    {isLoading ? (
      <div className="loadContainer">
        <Image src={loader} alt="loader" className="loader" width={100} height={100} />
      </div>
      ) : (
        
      <div className={styles.chatContainer}>
        <div className={styles.container}>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentUser={currentUser}
            currentChat={currentChat}  />
          )}
        </div>
      </div>
    )}
    </>
  )
}

export default Chat