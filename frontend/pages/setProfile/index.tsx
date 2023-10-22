import '@/app/globals.scss'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from './setProfile.module.scss'
import loader from "@/public/loader.gif";
import { setProfilePicture } from '@/utils/utlis';

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  useEffect( () => {
    if (!localStorage.getItem("user_data"))
      Router.replace("/login");
  }, []);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async ()=>{
      const data = [];
      //for each doesn't work with API... WHYY?
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  },[api] );


  return ( 
    <>
      {isLoading ? (
        <div className="loadContainer">
          <Image src={loader} alt="loader" className="loader" width={100} height={100} />
        </div>
      ) : (
        <div className={styles.avatarContainer}>
          <div className={styles.titleContainer}>
            <h1>Pick an Avatar as your profile picture.</h1>
          </div>
          <div className={styles.avatars}>
            {avatars.map((avatar, index) => {
              return (
                <div key={index}
                  className={`${styles.avatar} ${
                    selectedAvatar === index ? styles.selected : ""
                  }`}
                >
                  <Image
                    width={100} height={100}
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={(event) => setProfilePicture(event, avatars, selectedAvatar)} className={styles.submitBtn}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )} 
    </>
  );
}
