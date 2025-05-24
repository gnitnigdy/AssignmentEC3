"use client";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col } from "react-bootstrap";

export default function OffcanvasExample() {
  let expand = true;
  return (
    <>
      <Navbar variant="dark" className="bg-dark justify-content-between px-5">
        <Navbar.Brand href="#home">Dibimbing Canteen</Navbar.Brand>
        <Button variant="outline-danger" type="submit">
          + | Add New Food
        </Button>
      </Navbar>
    </>
  );
}
