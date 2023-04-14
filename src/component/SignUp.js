import React, { useState, useRef } from "react";
import classes from "./SignUp.module.css";
import image from "../image/making-note.webp";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const SignUp = (props) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const navigate = useNavigate();

  const { signup, setdisplayname } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [register, setRegister] = useState(false);

  const signin = () => {
    setRegister(!register);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      await setdisplayname(nameRef.current.value)
    } catch {
      setError("failed to create an account");
    }
    
    navigate(`/${nameRef.current.value}`);

    setEmail("");
    setName("");
    setPassword("");
    // setname(nameRef.current.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes["form-container"]}>
        <div className={classes.getIn}>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>

        <h2>Registration..</h2>
        <p>Please enter your details</p>
        <form onSubmit={formSubmitHandler} className={classes.form} action="">
          {error && <div className={classes.error}>{error}</div>}

          <label htmlFor="fname">name</label>
          <input
            ref={nameRef}
            value={name}
            type="text"
            name="fname"
            onChange={handleNameChange}
          />

          <label htmlFor="email">email</label>
          <input
            ref={emailRef}
            value={email}
            type="email"
            name="email"
            onChange={handleEmailChange}
          />

          <label htmlFor="password">password</label>
          <input
            ref={passwordRef}
            value={password}
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />

          <label htmlFor="confirmpassword"> confirm password</label>
          <input
            ref={confirmpasswordRef}
            value={confirmpassword}
            type="password"
            name="confirmpassword"
            onChange={handleConfirmPasswordChange}
          />

          <button disabled={loading} type="submit">
            Register
          </button>
        </form>
      </div>
      <div className={classes["image-container"]}>
        <h1 className={classes.note}>Note</h1>
        <h1 className={classes.space}>Space</h1>
        <div className={classes.line}></div>
        {/* <img src={image} alt="making note" /> */}
      </div>
    </div>
  );
};

export default SignUp;
