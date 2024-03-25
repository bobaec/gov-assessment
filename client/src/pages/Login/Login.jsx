import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./Login.scss";

const Login = () => {
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);

  const { email, password } = credentials;

  const onCredentialsChange = (e) => {
    console.log(e.target.name);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      const result = await response.json();
      if (result.authenticated) {
        setAuth(result);
      } else {
        setShowInvalidCredentials(true);
      }
    } catch (error) {
      console.log('onSubmitForm - login', error.message);
    }
  }
  return (
    <div className="login-page-container">
      <h1 className="login-page-title">Login</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={onCredentialsChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={onCredentialsChange} required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {showInvalidCredentials ? (
          <div className="invalid-credentials-container">
            Invalid Credentials, please try again.
          </div>
        ) : null}
      </Form>
    </div>
  )
}

export default Login