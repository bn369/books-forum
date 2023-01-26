import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavigationBar = ({ isAuth, setFilterByType }) => {
  const navigate = useNavigate();

  const navigateToStartPage = () => {
    setFilterByType("Wszystkie");
    navigate("/");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };

  const { user, logout } = UserAuth();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
      console.log("wylogowano");
    } catch (e) {
      console.log(e.message);
    }
  };

  const addBookHandler = () => {
    navigate("/add-book");
  };

  const handleChange = (e) => {
    setFilterByType(e);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="">
      <Container>
        <Navbar.Brand href="#home">
          <img
            className="d-inline-block align-center"
            alt="logo"
            src={require("../images/logo2.jpg")}
            width="90"
            height="60"
            onClick={navigateToStartPage}
          />
          <span className="navbar-brand mb-0 h1" onClick={navigateToStartPage}>
            LOGO
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <Nav.Link onClick={navigateToLogin}>Zaloguj</Nav.Link>
            ) : (
              <NavDropdown title={user.email} menuVariant="dark">
                <NavDropdown.Item onClick={logoutHandler}>
                  Wyloguj
                </NavDropdown.Item>
                <NavDropdown.Item onClick={addBookHandler}>
                  Dodaj Książkę
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {isAuth && <Nav.Link href="#link">Forum</Nav.Link>}
            <NavDropdown
              title="Rankingi"
              id="basic-nav-dropdown"
              menuVariant="dark"
              onSelect={handleChange}
            >
              <NavDropdown.Item href="#action/3.1" eventKey="Kryminał">
                Kryminał
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" eventKey="Literatura Piękna">
                Literatura Piękna
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" eventKey="Biografia">
                Biografia
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" eventKey="Horror">
                Horror
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5" eventKey="Fantasy">
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6" eventKey="Sci-Fi">
                Sci-Fi
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7" eventKey="Romans">
                Romans
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8" eventKey="Historyczna">
                Historyczna
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.9" eventKey="Wszystkie">
                Wszystkie
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
<span className="navbar-brand mb-0 h1 px-1">
  <img
    className="d-inline-block align-center"
    alt="logo"
    src={require("../images/logo2.jpg")}
    width="90"
    height="90"
  />
  LOGO
</span>;
export default NavigationBar;
