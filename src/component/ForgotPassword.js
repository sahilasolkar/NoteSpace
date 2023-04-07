import React, {useRef, useState} from 'react'
import classes from './ForgotPassword.module.css'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate()

  const { resetPassword } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try{
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox for further instructions ")
    }catch{
      setError("failed to reset password")
    }

    setLoading(false);

    setEmail("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  return (
    <div className={classes.container}>
      <div className={classes['forgot-password']}>
        <h1>Password Reset</h1>
        <form onSubmit={formSubmitHandler} className={classes.form} action="">
          {error && <div className={classes.error}>{error}</div>}
          {message && <div className={classes.success}>{message}</div>}
          
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                value={email}
                type="email"
                name="email"
                onChange={handleEmailChange}
              />
          
          <button disabled={loading} type="submit">Reset Password</button>

          <div><Link to='/login'>Login</Link></div>

        </form>
      <div className={classes.signup}>Need an account? <Link to='/signup'>Sign up</Link></div>
      </div>
    </div>
  )
}

export default ForgotPassword
