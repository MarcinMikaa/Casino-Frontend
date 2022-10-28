import "./RegisterPage.css";
import React, { useRef, useState } from "react";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const registerOptions = {
    name: { required: "What's your name?" },
    surname: { required: "What's your surname?" },
    email: {
      required: "Email address is required",
      type: "email",
    },
    password: { required: "Password is required" },
    confirmPassword: {
      required: "Confirm your password",
      validate: (value) => value === password.current || "The passwords don't match",
    },
    age: {
      required: "Enter your age",
      min: {
        value: 18,
        message: "You must be 18 to create an account",
      },
    },
  };

  const onSubmit = (user) => {
    axios({
      method: "POST",
      data: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        age: user.age,
      },
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setMessage(res.data.message);
      if (res.data.message === "User Created") {
        setMessage("");
        navigate("/login");
      }
    });
  };
  const handleError = (errors) => {};

  return (
    <div className="auth-page">
      <Form className="auth-form" onSubmit={handleSubmit(onSubmit, handleError)}>
        <h1>
          Create your account<span>.</span>
        </h1>
        <br />
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter name"
                className="auth-input"
                {...register("name", registerOptions.name)}
              />
              <small className="text-error">{errors?.name && errors.name.message}</small>
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel controlId="floatingInputSurname" label="Surname" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter surname"
                className="auth-input"
                {...register("surname", registerOptions.surname)}
              />
              <small className="text-error">{errors?.surname && errors.surname.message}</small>
            </FloatingLabel>
          </Col>
        </Row>
        <FloatingLabel controlId="floatingInputEmail" label="Email Address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="auth-input"
            {...register("email", registerOptions.email)}
          />
          <small className="text-error">{errors?.email && errors.email.message}</small>
        </FloatingLabel>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="auth-input"
                {...register("password", registerOptions.password)}
              />
              <small className="text-error">{errors?.password && errors.password.message}</small>
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel controlId="floatingInputConfirmPassword" label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                className="auth-input"
                {...register("confirmPassword", registerOptions.confirmPassword)}
              />
              <small className="text-error">{errors?.confirmPassword && errors.confirmPassword.message}</small>
            </FloatingLabel>
          </Col>
        </Row>
        <FloatingLabel controlId="floatingInputAge" label="Age" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Age"
            className="auth-input"
            {...register("age", registerOptions.age)}
          />
          <small className="text-error">{errors?.age && errors.age.message}</small>
        </FloatingLabel>
        <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
          {message === "" ? <p></p> : <p>{message}</p>}
          <Button variant="primary" type="submit" className="auth-button">
            Create
          </Button>
        </Form.Group>
        <Form.Text className="text-muted">Already have an account? </Form.Text>
        <Form.Text className="text-primary" as={Link} to="/login">
          <b>Log in</b>
        </Form.Text>
      </Form>
    </div>
  );
}

export default RegisterPage;
