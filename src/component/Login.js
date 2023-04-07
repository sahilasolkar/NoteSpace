import React, { useState, useRef } from "react";
import classes from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const Login = (props) => {
  const firebaseurl =
    "https://react-learning-http-e5adb-default-rtdb.firebaseio.com/";

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, setRegister] = useState(false);

  const signin = () => {
    setRegister(!register);
  };

  // const { currentUser } = useAuth();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
      
    } catch {
      setError("failed to sign in");
    }

    setLoading(false);

    //mycode
    // console.log("clicked");
    // console.log(register);
    // const formData = {
    //   name,
    //   email,
    //   password,
    //   register,
    // };
    // props.sendLoginData(formData);
    // fetch(
    //   "https://react-learning-http-e5adb-default-rtdb.firebaseio.com/users.json",
    //   {
    //     method: "POST",
    //     "Content-Type": "application/json",
    //     body: JSON.stringify(formData),
    //   }
    // );

    setEmail("");
    setName("");
    setPassword("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes["form-container"]}>
        <div className={classes.getIn} onClick={signin}>
          New to NoteSpace?
          <span>
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
        <h2>Welcome Back!</h2>
        <p>Please enter your details</p>
        <form onSubmit={formSubmitHandler} className={classes.form} action="">
          {error && <div className={classes.error}>{error}</div>}
          {/* <label htmlFor="fname">name</label>
          <input
            ref={nameRef}
            value={name}
            type="text"
            name="fname"
            onChange={handleNameChange}
          /> */}

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

          <button disabled={loading} type="submit">
            Login
          </button>

          <div>
            <Link to="/forgot-password">forgot password?</Link>
          </div>
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

export default Login;
