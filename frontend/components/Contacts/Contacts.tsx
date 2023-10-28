import React, {useState, useEffect} from 'react'
import styles from './contacts.module.scss'
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";
import logo from '@/public/logo.png'
import loader from "@/public/loader.gif";
import { ContactsProps, Contact } from '@/models/models';
import Link from 'next/link';
import Logout from '../Logout/Logout';

const Contacts = ({contacts, currentUser, changeChat}:ContactsProps) => {

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [currentUserName, setCurrentUserName] = useState <string|undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState <string|undefined>(undefined);
  const [currentSelected, setCurrentSelected] = useState <number|undefined>(undefined);


  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
    // console.log("username: ", currentUser?.username, "avatar: ", currentUser?.avatarImage);
    setIsLoading(false);
  },[contacts, currentUser])

  const changeCurrentChat = (index:number, contact:any) => {
    
    console.log("placed top", contacts[index]);
    const selected = contacts[index];
    const toRemove = contacts.indexOf(selected);
    if (toRemove !== -1) {
      contacts.splice(toRemove, 1);
    }

    contacts.unshift(selected);
    
    changeChat(contact);
    setCurrentSelected(0);
  }

  return (
    <> 
      {isLoading ? (
      <div className="flex justify-center items-center">
        <Image src={loader} alt="loader" className="loader" width={100} height={100} />
      </div>
      ) : (
      <>
      {currentUserImage && currentUserName && (
        
        <div className={styles.contactContainer}>
          <div className={styles.brand}>
            <Image src={logo} alt='Whispp' width={30} height={40}/> 
            <h3>Whispp</h3>
          </div>

          <div className={styles.contacts}>   
            {
              contacts.map(( contact:Contact, index:number)=> {                
                return(
                  <div key={index} className={`${styles.contact}
                    ${index === currentSelected ? styles.selected:""}`}
                    onClick = {()=>{changeCurrentChat(index, contact);
                  }}
                  >
                  <div className={`${styles.avatar}`}>
                    <Image width={75} height={75} src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                  </div>
                  <div className={`${styles.username}`}>
                    <h3>{contact.username}</h3>
                  </div>
                  {/* <div className="text-[8px] text-light-text w-80_100 pr-2 flex justify-end">
                    <p>21/10/2023</p>
                  </div> */}
                </div>
                )
              })
            }
          </div>

          <div className={styles.currentUser}>
            <div className={`${styles.avatar}`}>
              <Image 
                src={`data:image/svg+xml;base64,${currentUserImage}`} 
                alt="avatar" width={50} height={60}
              />
              <div className={`${styles.username}`}>
                <h2>{currentUserName.charAt(0).toUpperCase()+currentUserName.slice(1)}</h2>
              </div>
            </div>
            <div className='flex flex-row gap-2'>
              <Link className={styles.edit} href='/setProfile'><FaEdit/></Link>
              <Logout/>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </>
  )
}

export default Contacts