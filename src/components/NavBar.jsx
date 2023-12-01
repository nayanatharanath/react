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

import { FaUser } from "react-icons/fa";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">
          Case Study
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/admin-dashboard">
                Admin Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/mentor">
                Mentors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/course">
                Courses
              </NavLink>
            </NavItem>
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
