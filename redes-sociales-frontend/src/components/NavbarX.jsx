import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarX() {
  const { logout, isAuthenticated, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="ml-5" as={Link} to="/dashboard">
          <img src={"/azteca.png"} alt="azteca" height="54" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard/bot-redes">
              Redes sociales
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/bot-gmb">
              Bot GMB
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/mail-maturation">
              Mail maturation
            </Nav.Link>
          </Nav>
          {isAuthenticated && (
            <Nav className="ms-auto">
              <NavDropdown
                title={user?.username}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarX;
