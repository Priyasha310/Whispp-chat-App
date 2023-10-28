import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import moment from 'moment'
import ChatInput from '@/components/ChatInput/ChatInput'
import { ChatProps } from '@/models/models'
import styles from '@/components/ChatContainer/chatContainer.module.scss'
import { getAllMessagesRoute, sendMessageRoute } from '@/utils/APIRoutes'

const ChatContainer = ({currentUser, currentChat}:ChatProps) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState <string|undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState <string|undefined>(undefined);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async()=>{
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(response.data)
    }
    fetchData();
  }, [currentChat, currentUser]);

  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
    // console.log("username: ", currentUser?.username, "avatar: ", currentUser?.avatarImage);
    setIsLoading(false);
  },[currentUser])
  
  const handleSendMsg = async (message:string) => {    
    if(currentUser && currentChat){
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: message,
      })
    }
  }
    
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
            <h2>{currentChat.username.charAt(0).toUpperCase()+currentChat.username.slice(1)}</h2>
          </div>
        </div>
      </div>

      <div className={styles.chatMessages}>
        {
          messages.map((message: any)=> {
            return (
              <>
                <div className={`${styles.message} ${message.fromSelf ? styles.sent:styles.recieved}`}>
                  <div className={styles.content}>
                    <p>
                      {message.message}
                      <p className='text-end text-[10px]'>{message.timeSent}</p>
                      {/* <p className='text-end text-[10px]'>{moment(message.timeSent).fromNow()}</p> */}
                    </p>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>)}
    </>
  )
}

export default ChatContainer