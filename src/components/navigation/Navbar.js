import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { ALL_BOOKS } from "../../globals";
import { SearchBar } from "./SearchBar";

const NavigationBar = ({ booksList, setFilterByType, setModal }) => {
  const navigate = useNavigate();

  const navigateToStartPage = () => {
    setFilterByType(ALL_BOOKS);
    navigate("/");
  };
  const navigateToLogin = () => {
    setModal(true);
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
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      style={{
        position: "relative",
      }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            className="d-inline-block align-center"
            alt="logo"
            src={require("../../images/logo2.jpg")}
            width="90"
            height="60"
            onClick={navigateToStartPage}
          />
          <span className="m-auto h1" onClick={navigateToStartPage}>
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
              <NavDropdown.Item href="#action/3.9" eventKey={ALL_BOOKS}>
                Wszystkie
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <SearchBar booksList={booksList} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
<span className="navbar-brand mb-0 h1 px-1">
  <img
    className="d-inline-block align-center"
    alt="logo"
    src={require("../../images/logo2.jpg")}
    width="90"
    height="90"
  />
  LOGO
</span>;
export default NavigationBar;
