import React, { useEffect, useState, useContext } from "react";
import {auth} from '../firebase'
import { db } from "../firebase";
import toast from "react-hot-toast";

const AuthContext = React.createContext();

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){
  
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [username, setusername] = useState("")
  const [useremail, setuseremail] = useState("")

  function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function setname(name){
   setusername(name)
  }

  // function getname(){
  //   return username
  // }
  const settingUserDetails = (username, useremail) =>{
    setusername(username)
    setuseremail(useremail)
  }

  // const settingUserData = (username, useremail) =>{
  //   console.log('this ran')
  //     db.collection(currentUser.uid).doc("userData").set({
  //       name: username,
  //       email: useremail,
  //     });
  // }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return auth.signOut();
  }

  function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
  }

  function getCurrentUser(){
    return currentUser
  }

  function setNotification(message, stat, emo){
    //notification 
    
    const notify = () => toast(message, {
      duration: 4000,
      position: 'top-center',
    
      // Styling
      style: {backgroundColor: `${stat? "#fff": "#FF8787"}`},
      className: '',
    
      // Custom Icon
      icon: emo,
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

    notify()
  }

  function setdisplayname(name){
    auth.currentUser.updateProfile({
      displayName: name
    }).then(() => {
      console.log("display name successfully added")
    }).catch((error) => {
      console.error("error adding the display name", error)
    });
  }

  function updateEmail(email){
    return currentUser.updateEmail(email)
  }

  function updatePassword(password){
    return currentUser.updatePassword(password)
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
      setLoading(false)
      // settingUserData(username, useremail)
    })

    return unsubscribe
  }, [])

  const value ={
    setNotification,
    setdisplayname,
    settingUserDetails,
    getCurrentUser,
    setname,
    username,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}      
    </AuthContext.Provider>
  )
}