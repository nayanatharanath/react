import React, { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "../Images/logo.png";
import { FaUser } from "react-icons/fa";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">
          <img src={logo} alt={logo} style={{ width: 40, height: 40 }} />{" "}
          Ecommerce
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/men">
                Men
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/women">
                Women
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/kids">
                Kids
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/home-living">
                  Home & Living
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/beauty">
                  Beauty
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                <FaUser /> SingUp
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;
