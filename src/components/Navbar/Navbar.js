import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/logo.png";

function Navabr() {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const navbarDropdownTitle =
    user === null ? (
      ""
    ) : (
      <div className="account-container">
        <img alt="user avatar" id="user-avatar" src={user.avatar}></img> <p>Account ⇩</p>
      </div>
    );
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
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <Image src={logo} className="logo"></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Games ⇩" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/roulette">
                    Roulette
                  </NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item as={Link} to="/one-armed-bandit">
                    One armed bandit
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="">
                <NavDropdown title={navbarDropdownTitle} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/account">
                    Settings
                  </NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item as={Link} to="/financial">
                    Buy credits
                  </NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="black" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <Image src={logo} className="logo"></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="hover-action">
                  Home
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/register" className="hover-action">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="hover-action">
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Navabr;
