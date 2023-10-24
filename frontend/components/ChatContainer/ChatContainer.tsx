import React, { useEffect, useState } from 'react'
import ChatInput from '../ChatInput/ChatInput'
import Image from 'next/image'
import styles from '@/components/ChatContainer/chatContainer.module.scss'
import Logout from '../Logout/Logout'
import { ChatProps } from '@/models/models'
import Messages from '../Messages/Messages'
import axios from 'axios'
import { sendMessageRoute } from '@/utils/APIRoutes'

const ChatContainer = ({currentUser, currentChat}:ChatProps) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState <string|undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState <string|undefined>(undefined);
  
  const handleSendMsg = async (message:string) => {
    
    if(currentUser && currentChat){
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: message,
      })
    }
    alert(message);
  }
  
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
    // console.log("username: ", currentUser?.username, "avatar: ", currentUser?.avatarImage);
    setIsLoading(false);
  },[currentUser])
  
  return (
    <>{currentChat && (
    <div className={styles.chatContainer}>

      <div className={styles.chatHeader}>
        <div className={styles.userDetails}>
          <div className={`${styles.avatar}`}>
            <Image 
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
              alt="avatar" width={40} height={40}
            />
          </div>
          <div className={`${styles.username}`}>
            <h2>{currentChat.username}</h2>
          </div>
        </div>
        <Logout/>
      </div>

      <div className={styles.chatMessages}>
        <Messages/>
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>)}
    </>
  )
}

export default ChatContainer