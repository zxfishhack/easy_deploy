import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
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
  DropdownItem } from 'reactstrap';

export default class Example extends Component {
  static propTypes = {
    envId: PropTypes.integer,
		children: PropTypes.element.isRequired,
		pageName: PropTypes.string.isRequired,
	};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="sm" fixed="top">
          <NavbarBrand href="/#/">Easy Deploy - {this.props.pageName}</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/#/hosts">Hosts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/pkgs">Packages</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/deploy">Deploy</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div
          style={{
            paddingTop: '60px',
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}