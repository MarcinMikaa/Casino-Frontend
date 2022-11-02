import "../OneArmedBanditPage/OneArmedBanditPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import Reel from "react-reel";
import axios from "axios";
import "../OneArmedBanditPage/theme.css";

const OneArmedBanditPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const bet = watch("bet");
  const [user, setUser] = useState({});
  const [result, setResult] = useState({ rng1: "0", rng2: "0", rng3: "0" });
  const [message, setMessage] = useState();
  const [balance, setBalance] = useState();
  const [duration, setDuration] = useState(1000);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user/me",
    }).then((res) => {
      if (!res.data.userID) {
        navigate("/");
      } else {
        setUser(res.data);
      }
    });
  }, []);

  const banditOptions = {
    bet: {
      required: "Pick your bet",
      type: "number",
    },
  };

  const onSubmit = () => {
    axios({
      method: "POST",
      data: {
        bet: bet,
      },
      withCredentials: true,
      url: "http://localhost:4000/one-armed-bandit",
    }).then((res) => {
      setDuration(70);
      setResult({ rng1: "0", rng2: "0", rng3: "0" });
      setTimeout(() => setMessage(res.data.message), 2000);
      setTimeout(() => setBalance(res.data.balance), 2000);

      setTimeout(() => setDuration(1000), 500);
      setTimeout(() => setResult(res.data.rngs), 700);
    });
  };

  const handleError = (errors) => {};

  return (
    <div className="one-armed-bandit">
      <div className="bandit-container">
        <div className="slot-machine">
          <div className="slots-container">
            <Reel text={result.rng1.toString()} duration={duration} delay={0} className="slot" />
            <Reel text={result.rng2.toString()} duration={duration} delay={200} className="slot" />
            <Reel text={result.rng3.toString()} duration={duration} delay={400} className="slot" />
          </div>
        </div>
        <div className="result">{message && <p className="result">{message}</p>}</div>

        <Form className="auth-form" onSubmit={handleSubmit(onSubmit, handleError)}>
          <Row className="g-2">
            <Col>
              <Form.Group className="messages-group">
                <p className="message-title">Actual bet</p>
                {bet === "" ? <p className="message">0$</p> : <p className="message">{bet}$</p>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="messages-group">
                <p className="message-title">Your balance</p>
                {balance === undefined ? (
                  <p className="message">{user.state}$</p>
                ) : (
                  <p className="message">{balance}$</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <FloatingLabel controlId="floatingInput" label="Bet" className="mb-3">
            <Form.Control className="auth-input" type="number" placeholder="" {...register("bet", banditOptions.bet)} />
            <small className="text-error">{errors?.bet && errors.bet.message}</small>
          </FloatingLabel>

          <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
            <Button variant="primary" type="submit" className="auth-button">
              Spin
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default OneArmedBanditPage;
