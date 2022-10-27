import "./LoginPage.css";
import {useForm} from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const [message, setMessage] = useState("");
  const [alertVisibility, setAlertVisibility] = useState(false)
  const navigate = useNavigate();

  const loginOptions = {
    email: {
      required: "Email address is required",
      type: "email",
    },
    password: { required: "Password is required" }
  };

  const signIn = async (email, password) => {
    axios({
      method: "POST",
      data: {
        email: email,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:4000/user/login",
    }).then((res) => {
      if(res.data === "No User Exist"){
        setMessage(res.data);
        setAlertVisibility(true);
      }else{
        navigate("/")
      }

    });
  };
  
  const handleError = (errors) => {};

  return (
    <div className="login-panel">
      <Form className="login-form" onSubmit={handleSubmit((data) => {
        handleError();
        signIn(data.email, data.password);
      })}>
        <h3>Sign in</h3>
        <FloatingLabel controlId="floatingInput" label="Enter email" className="mb-3">
          <Form.Control className="login-input" {...register("email", loginOptions.email)} type="email" placeholder="Email"/>
          <ErrorMessage errors={errors} name="email" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Enter Password">
          <Form.Control className="login-input" {...register("password", loginOptions.password)} type="password" placeholder="Password" />
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
