import "./LoginPage.css";
import {useForm} from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const [message, setMessage] = useState("");
  const [alertVisibility, setAlertVisibility] = useState(false)
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    const  requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };
    const response = await fetch('http://localhost:4000/user/login', requestOptions);
    const data = await response.json();
    if(data === "No User Exist"){
      setMessage(data);
      setAlertVisibility(true);
    }else{
      navigate("/")
    }
  }

  return (
    <div className="login-panel">
      <Form className="login-form" onSubmit={handleSubmit((data) => {
        console.log(data.email);
        signIn(data.email, data.password);
      })}>
        <h3>Sign in</h3>
        <FloatingLabel controlId="floatingInput" label="Enter email" className="mb-3">
          <Form.Control className="login-input" {...register("email", {required: "Email is required"})} type="email" placeholder="Email"/>
          <ErrorMessage errors={errors} name="email" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Enter Password">
          <Form.Control className="login-input" {...register("password", {required: "Password is required"})} type="password" placeholder="Password" />
          <ErrorMessage errors={errors} name="password" />
        </FloatingLabel>
        <Button type="submit" className="login-button">Sing in</Button>
      </Form>
      {alertVisibility ? 
        <Alert className="alert-message">
          <p>{message}</p>
          <Button onClick={() => (setAlertVisibility(false))}>
            Close
          </Button>
        </Alert> :
        ""
      }
    </div>
  );
}

export default LoginPage;
