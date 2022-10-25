import "./RegisterPage.css";
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
  const [registerAge, setRegisterAge] = useState("");

  const register = () => {
    if (registerPassword === registerRepeatPassword) {
      axios({
        method: "POST",
        data: {
          name: registerName,
          surname: registerSurname,
          email: registerEmail,
          password: registerPassword,
          age: registerAge,
        },
        withCredentials: true,
        url: "http://localhost:4000/register",
      }).then((res) => {
        console.log(res);
      });
    } else {
      alert("Hasła różnią się!!");
    }
  };

  return (
    <div className="register-page">
      <Form className="register-form">
        <h1>CREATE AN ACCOUNT</h1>
        <Form.Label>Name</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Your Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter name" onChange={(e) => setRegisterName(e.target.value)} />
        </FloatingLabel>

        <Form.Label>Surname</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Your Surname" className="mb-3">
          <Form.Control type="text" placeholder="Enter surname" onChange={(e) => setRegisterSurname(e.target.value)} />
        </FloatingLabel>

        <Form.Label>E-mail</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Your Email" className="mb-3">
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterEmail(e.target.value)} />
        </FloatingLabel>

        <Form.Label>Password</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Your Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} />
        </FloatingLabel>

        <Form.Label>Repeat Password</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Repeat Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Repeat password"
            onChange={(e) => setRegisterRepeatPassword(e.target.value)}
          />
        </FloatingLabel>

        <Form.Label>Age</Form.Label>
        <FloatingLabel controlId="floatingInput" label="Your Age" className="mb-3">
          <Form.Control type="number" placeholder="Age" onChange={(e) => setRegisterAge(e.target.value)} />
        </FloatingLabel>

        <Form.Group className="mb-1" controlId="formGroupSubmit">
          <Button variant="primary" type="submit" onClick={register}>
            Submit
          </Button>
        </Form.Group>

        <Form.Text className="text-muted">Already have an account? </Form.Text>
        <Form.Text className="text-muted" as={Link} to="/login">
          <b>Login here</b>
        </Form.Text>
      </Form>
    </div>
  );
}

export default RegisterPage;
