import Router from 'next/router';
import React from 'react'
import {BiPowerOff} from 'react-icons/bi'
import styles from './logout.module.scss'

const Logout = () => {

  const handleLogout =async () => {
    localStorage.clear();
    Router.replace("/login");
  }
  return (
    <div className={styles.logoutBtn} onClick={handleLogout}>
      <BiPowerOff/>
    </div>
  )
}

export default Logout