import React, { useState, useRef } from "react";
import classes from "./UserDetails.module.css";
import image from "../image/making-note.webp";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  // const username = useRef(currentUser.email);

  const navigate = useNavigate()

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = []

    setLoading(true);
    setError("")

    if(emailRef.current.value!==currentUser.email){
      promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=>{
      navigate('/')
    }).catch(()=>{
      setError("failed to update account")
    }).finally(()=>{
      setLoading(false)
    })
  };

  return (
    <div className={classes.container}>
      <div className={classes["user-container"]}>
        <div className={classes['form-container']}>
        <h1>Update Profile</h1>
        {error && <div className={classes.error}>{error}</div>}
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes['form-elements']}>
          <label htmlFor="email">Email</label>
          <input type="email" defaultValue={currentUser.email} name="email" ref={emailRef} />
          </div>

          <div className={classes['form-elements']}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
          </div>

          <div className={classes['form-elements']}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input ref={confirmpasswordRef} type="password" placeholder="Leave blank to keep the same" name="confirm-password" />
          </div>

          <button disabled={loading} type="submit">Update</button>        </form>
          <div><span><Link className={classes.cancel} to='/'>Cancel</Link></span></div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
