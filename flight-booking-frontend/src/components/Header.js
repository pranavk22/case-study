import React, { Component } from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = { show: false };
    console.log(this.props.user);
  }

  signOut() {
    console.log("Called signout");
    this.handleClose();
    this.props.signOut();
    this.props.history.push("/");
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark" style={{ marginBottom: "30px" }}>
          <Navbar.Brand>
            {!this.props.user || this.props.user.userType === "user" ? (
              <NavLink
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Flight Booking System
              </NavLink>
            ) : (
              <NavLink
                to="/flights"
                className="d-inline p-2 bg-primary text-white"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Flight Booking System
              </NavLink>
            )}
          </Navbar.Brand>
          {this.props.user ? (
            <Nav className="mr-auto">
              {this.props.isAuth && this.props.user.userType === "user" ? (
                <NavLink
                  to="/mybookings"
                  className="d-inline p-2 bg-primary text-white"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  My Bookings
                </NavLink>
              ) : null}
              {this.props.isAuth && this.props.user.userType === "admin" ? (
                <NavLink
                  to="/bookings"
                  className="d-inline p-2 bg-primary text-white"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  View all Bookings
                </NavLink>
              ) : null}
            </Nav>
          ) : null}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {!this.props.isAuth ? (
                <>
                  <NavLink
                    className="d-inline p-2 bg-primary text-white"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    className="d-inline p-2 bg-primary text-white"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to="/signin"
                  >
                    Sign in
                  </NavLink>
                </>
              ) : null}
              {this.props.isAuth ? (
                <Nav.Link
                  className="d-inline p-2 bg-primary text-white"
                  onClick={this.handleShow}
                >
                  Sign out
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to sign out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.signOut}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default compose(withRouter, connect(mapStateToProps, actions))(Header);
