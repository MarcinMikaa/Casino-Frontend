import "./MainPage.css";
import { Card, Button } from "react-bootstrap";

function MainPage() {
  return (
    <div className="MainPage">
      <Card className="bg-dark text-white">
        <Card.Img
          src="https://ik.imagekit.io/3uh/landing/BG_MV_SltxghhcQ.png?ik-s=be8d600c446cd85e5dcc64cea444ca088b2c4316"
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>
            CREATE AN ACCOUNT AND <br /> GET FREE 500$
          </Card.Title>

          <Button variant="primary" type="submit" className="auth-button">
            Join now
          </Button>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default MainPage;
