import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";
import RouletteForm from "../../RouletteForm/RouletteForm";

import axios from "axios";
import "./Roulette.css";

const Roulette = () => {
  const navigate = useNavigate();
  const [spinState, setSpinState] = useState(false);
  const [result, setResult] = useState(0);
  const [successSpinMessage, setSuccessSpinMessage] = useState("");
  const [negativeMessage, setNegativeMessage] = useState("");
  const [user, setUSer] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user/me",
    }).then((res) => {
      if (!res.data.user.email) {
        navigate("/");
      } else {
        setUSer(res.data);
      }
    });
  }, []);

  const spinAWheel = (bet, chosenNumber) => {
    axios({
      method: "POST",
      data: {
        id: user.user._id,
        credits: bet,
        number: chosenNumber,
      },
      withCredentials: true,
      url: "http://localhost:4000/game/roulette",
    }).then((res) => {
      console.log(res.data)
      if (res.data.result === "") {
        setNegativeMessage(res.data.message);
      } else {
        setSuccessSpinMessage(res.data.message);
        setResult(res.data.result);
        setSpinState(true);
      }
    });
    setSpinState(false);
  };

  const data = [
    { option: "0", style: { backgroundColor: "#016D29", textColor: "white" } },
    { option: "1", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "2", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "3", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "4", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "5", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "6", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "7", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "8", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "9", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "10", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "11", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "12", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "13", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "14", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "15", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "16", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "17", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "18", style: { backgroundColor: "#1D1E26", textColor: "white" } },
    { option: "19", style: { backgroundColor: "#E0080B", textColor: "white" } },
    { option: "20", style: { backgroundColor: "#1D1E26", textColor: "white" } },
  ];

  return (
    <>
      <div className="roulette-game-box">
        <div className="roulette-container">
          <Wheel
            mustStartSpinning={spinState}
            prizeNumber={result}
            data={data}
            radiusLineColor={"#F3C620"}
            innerBorderColor={"black"}
            outerBorderColor={"black"}
            innerBorderWidth={8}
            outerBorderWidth={8}
            innerRadius={20}
          />

          {successSpinMessage === "" ? (
            <p> </p>
          ) : (
            <p className="roulette-result-info">
              {successSpinMessage} Winning number is {result}
            </p>
          )}
        </div>
        <RouletteForm message={negativeMessage} spin={spinAWheel} />
      </div>
    </>
  );
};

export default Roulette;
