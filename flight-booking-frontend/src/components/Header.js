import React, { Component } from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import * as actions from "../actions";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = { show: false };
  }

  signOut() {
    console.log("Called signout");
    this.handleClose();
    this.props.signOut();
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark" style={{ marginBottom: "30px" }}>
          <Navbar.Brand href="/">Flight Booking System</Navbar.Brand>
          {this.props.isAuth ? (
            <Nav className="mr-auto">
              <Nav.Link
                className="d-inline p-2 bg-primary text-white"
                href="/myflights"
              >
                My Flights
              </Nav.Link>
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
                  <Nav.Link
                    className="d-inline p-2 bg-primary text-white"
                    href="/signup"
                  >
                    Sign up
                  </Nav.Link>
                  <Nav.Link
                    className="d-inline p-2 bg-primary text-white"
                    href="/signin"
                  >
                    Sign in
                  </Nav.Link>
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
  };
}

export default connect(mapStateToProps, actions)(Header);
