import "./FinancialPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FinancialTile from "../../FinancialTile/FinancialTile";

const FinancialPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const creditsOptions = {
    credits: {
      required: "You must chose an amount",
      type: "number",
      min: { value: 1, message: "Minimum value is 1" },
    },
  };

  const amountToAdd = watch("credits");

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

  const buyCredits = (credits) => {
    axios({
      method: "PUT",
      data: {
        credits: credits,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/credits",
    }).then((res) => {
      setMessage(res.data.message);
    });
  };

  return (
    <>
      <div className="financial-row">
        <div className="financial-col">
          <FinancialTile credits={"100"} submit={buyCredits} />
        </div>
        <div className="financial-col">
          <FinancialTile credits={"500"} submit={buyCredits} />
        </div>
        <div className="financial-col">
          <FinancialTile credits={"1000"} submit={buyCredits} />
        </div>
      </div>
      <div className="financial-row">
        <div className="financial-col">
          <div className="financial-tile">
            <Form
              onSubmit={handleSubmit((data) => {
                buyCredits(amountToAdd);
              })}
            >
              <FloatingLabel controlId="floatingInput" label="How much you want to buy?" className="mb-3">
                <Form.Control
                  className="credits-input"
                  {...register("credits", creditsOptions.credits)}
                  type="number"
                  placeholder=" "
                />
                <small className="text-error">{errors?.credits && errors.credits.message}</small>
              </FloatingLabel>
              <Button type="submit" variant="success">
                Buy Credits
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {message === "" ? <p> </p> : <p className="success-message">{message}</p>}
    </>
  );
};

export default FinancialPage;
