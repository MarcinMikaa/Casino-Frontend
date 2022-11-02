import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";

function Navabr() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const navbarDropdownTitle = user === null ? "" : <img alt="user avatar" id="user-avatar" src={user.avatar}></img>;
  const navigate = useNavigate();

  const logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/logout",
    }).then((res) => {
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <>
      {user ? (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown title="Games" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/roulette">
                    Roulette
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">
                    One armed bandit
                  </NavDropdown.Item>
                  
                </NavDropdown>
              </Nav>
              <NavDropdown title={navbarDropdownTitle} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/account">
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/financial">
                  Buy credits
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <div className="Navbar">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
}

export default Navabr;
