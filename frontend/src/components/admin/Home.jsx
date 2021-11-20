import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { instanceAdmin } from "../../axios/axios";
import AuthContext from "../../context/Context";
import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Notification from "@material-ui/icons/Notifications";
import Chat from "@material-ui/icons/Chat";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";

function Home() {
  const { getLoggedIn } = useContext(AuthContext);
  const logoutAdmin = async () => {
    await instanceAdmin.get("/logout");
    await getLoggedIn();
  };
  return (
    <Navbar className="main_navbar shadow-box-example z-depth-5" expand={false}>
      <Container fluid>
        <Image  src="" alt="image"></Image>
        <Navbar.Brand id="Welcome_write" href="/admin">
          Welcome Adam
        </Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <PersonIcon />
        <Notification />
        <Chat />

        <Button className="logout_button" onClick={logoutAdmin}>
          <LogoutIcon />
        </Button>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Shoppy</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/admin/users">Users</Nav.Link>
              <Nav.Link href="/admin/product">Products</Nav.Link>
              <Nav.Link href="/admin/category">Category</Nav.Link>
              <Nav.Link href="#action2">Orders</Nav.Link>
              <Nav.Link href="#">Offers</Nav.Link>
              <Nav.Link href="#action2">Coupen</Nav.Link>
              <Nav.Link href="#action2">Feedback</Nav.Link>
              <Nav.Link href="#">Chats</Nav.Link>
              <Nav.Link href="#action2">Sales Report</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Home;
