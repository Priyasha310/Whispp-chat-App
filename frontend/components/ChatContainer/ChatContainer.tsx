import React, { useEffect, useState } from 'react'
import ChatInput from '../ChatInput/ChatInput'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import styles from '@/components/ChatContainer/chatContainer.module.scss'
import Logout from '../Logout/Logout'
import { CurrentUserInterface, ChatInterface, ChatProps } from '@/models/models'
import Messages from '../Messages/Messages'

const ChatContainer = ({currentUser, currentChat}:ChatProps) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState <string|undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState <string|undefined>(undefined);
  
  const handleSendMsg = async (message:string) => {
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
      <ChatInput />
    </div>)}
    </>
  )
}

export default ChatContainer