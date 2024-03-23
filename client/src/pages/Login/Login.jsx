import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);

  const { email, password } = credentials;

  const onCredentialsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      const result = await response.json();
      setAuth(result);
      if (!result) {
        setShowInvalidCredentials(true);
      }
    } catch (error) {
      console.log('onSubmitForm - login', error.message);
    }
  }
  return (
    <div className="login-page-container">
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type="email" name="email" placeholder="Enter your password" value={email} onChange={(e) => onCredentialsChange(e)} />
        <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => onCredentialsChange(e)} />
        <button type="submit">Authenticate</button>
      </form>
      {showInvalidCredentials ? (
        <div>Invalid Credentials</div>
      ) : null}
    </div>
  )
}

export default Login