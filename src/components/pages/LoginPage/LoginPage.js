import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginOptions = {
    email: {
      required: "Email address is required",
      type: "email",
    },
    password: { required: "Password is required" },
  };

  const signIn = async (email, password) => {
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/login",
    }).then((res) => {
      setMessage(res.data);
      if (res.data === "No User Exist") {
        setMessage(res.data);
      } else {
        navigate("/");
      }
    });
  };

  const handleError = (errors) => {};

  return (
    <div className="auth-page">
      <Form
        className="auth-form"
        onSubmit={handleSubmit((data) => {
          handleError();
          signIn(data.email, data.password);
        })}
      >
        <h1>
          Log in to account<span>.</span>
        </h1>
        <br />
        <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
          <Form.Control
            className="auth-input"
            {...register("email", loginOptions.email)}
            type="email"
            placeholder=" "
          />
          <small className="text-error">{errors?.email && errors.email.message}</small>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            className="auth-input"
            {...register("password", loginOptions.password)}
            type="password"
            placeholder=" "
          />
          <small className="text-error">{errors?.password && errors.password.message}</small>
        </FloatingLabel>
        <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
          {message === "" ? <p></p> : <p>{message}</p>}
          <Button variant="primary" type="submit" className="auth-button">
            Log in
          </Button>
        </Form.Group>
        <Form.Text className="text-muted">Do not have an account? </Form.Text>
        <Form.Text className="text-primary" as={Link} to="/register">
          <b>Sign up</b>
        </Form.Text>
      </Form>
    </div>
  );
};

export default LoginPage;
