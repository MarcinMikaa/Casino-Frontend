import "./AccountSettingPage.css";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AccountSettingPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user/me",
    }).then((res) => {
      if (!res.data.userID) {
        navigate("/");
      }
    });
  }, []);

  const accountSettingOptions = {
    password: { required: "Current password is required" },
    newPassword: { required: "Enter a new password" },
    confirmNewPassword: {
      required: "Confirm your new password",
      validate: (value) => value === newPassword.current || "The passwords don't match",
    },
  };

  const onSubmit = (user) => {
    axios({
      method: "POST",
      data: {
        password: user.password,
        newPassword: user.newPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/change-password",
    }).then((res) => {
      setMessage(res.data.message);
    });
  };

  const handleError = (errors) => {};

  return (
    <div className="account-setting-page">
      <div className="account-setting">
        <Form className="auth-form" onSubmit={handleSubmit(onSubmit, handleError)}>
          <h1>
            Do you wanna change your password<span>?</span>
          </h1>
          <br />

          <FloatingLabel controlId="floatingInputCurrentPassword" label="Current Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Current Password"
              className="auth-input"
              {...register("password", accountSettingOptions.password)}
            />
            <small className="text-error">{errors?.password && errors.password.message}</small>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputNewPassword" label="New Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="New Password"
              className="auth-input"
              {...register("newPassword", accountSettingOptions.newPassword)}
            />
            <small className="text-error">{errors?.newPassword && errors.newPassword.message}</small>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputPassword" label="Confirm New Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              className="auth-input"
              {...register("confirmNewPassword", accountSettingOptions.confirmNewPassword)}
            />
            <small className="text-error">{errors?.confirmNewPassword && errors.confirmNewPassword.message}</small>
          </FloatingLabel>

          <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
            {message === "Wrong current password" || message === "Current and new password are the same" ? (
              <p>{message}</p>
            ) : (
              <></>
            )}
            {message === "Password successfully changed" ? <p className="succesful">{message}</p> : <></>}
            <Button variant="primary" type="submit" className="auth-button">
              Change
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettingPage;
