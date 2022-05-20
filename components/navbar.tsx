import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { NavbarContainer } from "./navbar.styles";

export default function NavbarHeader() {
  return (
    <NavbarContainer>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Visitor</Nav.Link>
              <Nav.Link href="game">PlayGame</Nav.Link>
              <Nav.Link href="quote">Quote</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </NavbarContainer>
  );
}
