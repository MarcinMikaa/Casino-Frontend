import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./RouletteForm.css";

const RouletteForm = ({ spin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const betInput = watch("bet");
  const choseNumberInput = watch("choseYourNumber");

  const rouletteOptions = {
    bet: {
      required: "Bet is required",
      type: "number",
    },
    choseYourNumber: {
      required: "You must chose number",
      type: "number",
      min: { value: 0, message: "Minimum value is 0" },
      max: { value: 20, message: "Max value is 20" },
    },
  };

  const handleError = (errors) => {};

  return (
    <div className="roulette-form auth-page">
      <Form
        className="roulette-custom auth-form"
        onSubmit={handleSubmit((data) => {
          handleError();
          spin(betInput, choseNumberInput);
        })}
      >
        <h1>
          Set your bet<span>.</span>
        </h1>
        <br />
        <FloatingLabel controlId="floatingInput" label="How much you want to bet?" className="mb-3">
          <Form.Control
            className="auth-input"
            {...register("bet", rouletteOptions.bet)}
            type="number"
            placeholder=" "
          />
          <small className="text-error">{errors?.bet && errors.bet.message}</small>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Chose your number">
          <Form.Control
            className="auth-input"
            {...register("choseYourNumber", rouletteOptions.choseYourNumber)}
            type="number"
            placeholder=" "
          />
          <small className="text-error">{errors?.choseYourNumber && errors.choseYourNumber.message}</small>
        </FloatingLabel>
        <Form.Group className="mb-3 submit-group" controlId="formGroupSubmit">
          <Button type="submit" variant="danger">
            Play
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RouletteForm;
