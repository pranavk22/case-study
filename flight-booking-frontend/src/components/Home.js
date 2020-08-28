import React, { Component } from "react";
import { Button, Alert, Card, Modal, Breadcrumb } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { show: false };
    // this.state = { flights: [] };
  }

  async onSubmit(formData) {
    console.log(formData);
    await this.props.searchFlight(formData);
    // this.setState({ flights: flights });
    // console.log(this.state.flights);
    // if (res) {
    //   await this.props.signUp(formData);
    // }
    // if (!this.props.errorMessage) {
    //   this.props.history.push("/");
    // }
  }
  
  bookNow(flightId) {
    this.props.storeFlight(flightId);

    if (!this.props.isAuth) {
      // this.props.storeFlight(flightId);
      this.handleShow();
    } else {
      this.props.history.push("/book");
    }
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleSignIn = () => {
    this.props.history.push("/signin");
  };

  handleSignUp = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col" style={{ marginLeft: "2rem", columnWidth: "30%" }}>
          <Breadcrumb>
            <Breadcrumb.Item active>Search Flight</Breadcrumb.Item>
          </Breadcrumb>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <Field
                    name="from"
                    type="text"
                    id="from"
                    maxLength="3"
                    label="Source"
                    placeholder="From"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <Button style={{textAlignLast: 'center', width: '100%'}} onClick={()=>{}}>
                  <b>↑↓</b>
                </Button>
                <fieldset>
                  <Field
                    name="to"
                    type="text"
                    id="to"
                    maxLength="3"
                    label="Destination"
                    placeholder="To"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="date"
                    type="date"
                    id="date"
                    // label="Confirm Password"
                    label="Journey date"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                {this.props.errorMessage ? (
                  <Alert variant="danger">{this.props.errorMessage} </Alert>
                ) : null}
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
        <div
          className="col"
          style={{ columnWidth: "70%", marginRight: "2rem" }}
        >
          {/* <CardDeck> */}
          {this.props.flights.map((flight) => (
            <Card key={flight._id} style={{ marginBottom: "2rem" }}>
              <Card.Header>{flight.name}</Card.Header>
              <Card.Body>
                <Card.Title>{flight.airlines}</Card.Title>
                <Card.Text>
                  <span style={{textAlign: 'start'}}>From : {flight.from} To : {flight.to}</span>
                  <span style={{float: 'right'}}>Fare : &#8377;{flight.fare}</span>                  
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => this.bookNow(flight._id)}
                  // href={"/book/" + flight._id}
                >
                  Book now
                </Button>
              </Card.Body>
            </Card>
          ))}

          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>You need to sign in for booking a ticket</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleSignIn}>
                Sign In
              </Button>
              <Button variant="primary" onClick={this.handleSignUp}>
                Sign Up
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    flights: state.flight.flights,
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "search" })
)(Home);
