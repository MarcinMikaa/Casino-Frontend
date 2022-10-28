import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";
import { useEffect } from "react";

function Navabr() {

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const navbarDropdownTitle = user === null ? "" : <img alt="user avatar" id="user-avatar" src={user.avatar}></img>;
  const navigate = useNavigate();
 
  
  const logout = () => {
    axios({
      method: 'POST',
      withCredentials: true,
      url: "http://localhost:4000/logout",
    }).then((res) => {
      localStorage.clear();
      navigate("/");
      window.location.reload();
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
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/games">Games</Nav.Link>
                  <NavDropdown title={navbarDropdownTitle} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Account Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Buy dollars
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
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
                <Nav.Link as={Link} to="/games">
                  Games
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
