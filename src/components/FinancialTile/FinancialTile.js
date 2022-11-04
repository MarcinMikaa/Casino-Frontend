import "./FinancialTile.css";
import { Button } from "react-bootstrap";

const FinancialTile = ({ credits, submit }) => {
  return (
    <div className="financial-tile">
      <p>{credits}$</p>
      <Button onClick={() => submit(credits)} variant="success">Buy credits</Button>
    </div>
  );
};

export default FinancialTile;
