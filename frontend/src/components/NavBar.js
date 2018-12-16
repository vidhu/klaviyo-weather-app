import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class NavBar extends React.Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md" className="elevate">
        <NavbarBrand href="#">
          <i className="fas fa-cloud mr-3" />Weather App
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default NavBar;
