import React, { useState } from 'react'
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styles from './input.module.scss'
import { ChatInputProps } from '@/models/models';

const ChatInput = ({ handleSendMsg }: ChatInputProps) => {

  const[showEmojiPicker, setShowEmojiPicker] = useState<Boolean>(false);
  const[message, setMessage] = useState<string>("");

  const sendChat = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      console.log("message sent");
      setMessage("");
    }
  };

  return (
    <div className={styles.chatInput} onSubmit={(event) => sendChat(event)}>
      <div className={styles.buttonContainer}>
        <div className={styles.emoji}>
          <BsEmojiSmileFill/>
        </div>
      </div>
      <form className={styles.inputContainer}>
        <input type="text" placeholder='Type your message here...'
          onChange={(e) => setMessage(e.target.value)}
          value={message} />
        <button className={styles.send}>
          <IoMdSend/>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
