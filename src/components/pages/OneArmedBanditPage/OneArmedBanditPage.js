import "../OneArmedBanditPage/OneArmedBanditPage.css";
import SlotMachine from "../../SlotMachine/SlotMachine";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const OneArmedBanditPage = () => {
  const imageUrl = "https://nuxy.github.io/slot-machine-gen/images";
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [spin, setSpin] = useState(false);
  const [bet, setBet] = useState();
  const [symbols, setSymbols] = useState();

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:4000/user/me",
  //   }).then((res) => {
  //     if (!res.data.email) {
  //       navigate("/");
  //     } else {
  //       setUser(res.data);
  //     }
  //   });
  // }, []);

  const reels = [
    {
      imageSrc: `${imageUrl}/reel-strip1.png`,
      symbols: [
        {
          title: "cherry",
          position: 100,
          weight: 2,
        },
        {
          title: "plum",
          position: 300,
          weight: 6,
        },
        {
          title: "orange",
          position: 500,
          weight: 5,
        },
        {
          title: "bell",
          position: 700,
          weight: 1,
        },
        {
          title: "cherry",
          position: 900,
          weight: 3,
        },
        {
          title: "plum",
          position: 1100,
          weight: 5,
        },
      ],
    },
  ];

  // const startSpin = () => {
  //   axios({
  //     method: "POST",
  //     data: {
  //       data: user._id,
  //       bet: bet,
  //       symbols: symbols,
  //     },
  //     withCredentials: true,
  //     url: "http://localhost:4000/game/one-armed-bandit",
  //   }).then((res) => {
  //     setSpin(true);
  //   });
  //   setSpin(false);
  // };

  return (
    <div className="one-armed-bandit">
      <h1>One Armed Bandit</h1>
      <SlotMachine reels={reels} play={false} id="slot1" options={{ rngFunc: () => 0.5 }} />

      {/* <Button variant="primary" type="submit" className="bandit-button" onClick={startSpin}>
        Spin
      </Button> */}
    </div>
  );
};

export default OneArmedBanditPage;
