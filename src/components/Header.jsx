import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoggInIcon from "@mui/icons-material/Login";
function Header() {
  return (
    <>
      <Navbar className="bg-light">
        <Container>
          <Link to="/home">
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width={"120"}
                height={"60"}
                className="d-inline-block align-top"
              />

              <p className="d-inline-block align-top mt-3 ms-0 b-0">
                Resource Planner
              </p>
            </Navbar.Brand>
          </Link>
        </Container>
        <Link to="/"><Button variant="contained" color="success" startIcon={<LoggInIcon />}>
          LOG IN
        </Button></Link>
      </Navbar>
    </>
  );
}

export default Header;
