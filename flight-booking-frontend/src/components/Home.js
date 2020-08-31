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
    this.state = { show: false, swap: false };
    // this.state = { flights: [] };
  }

  async onSubmit(formData) {
    if (this.state.swap) {
      const swapper = formData.from;
      formData.from = formData.to;
      formData.to = swapper;
      this.setState({ swap: false });
    }
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

  handleSwap = () => this.setState({ swap: !this.state.swap });
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
        <div className="col" style={{ marginLeft: "2rem" }}>
          <Breadcrumb>
            <Breadcrumb.Item active>Search Flight</Breadcrumb.Item>
          </Breadcrumb>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  {!this.state.swap ? (
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
                  ) : (
                    <Field
                      name="to"
                      type="text"
                      id="to"
                      maxLength="3"
                      label="Source"
                      placeholder="From"
                      required
                      component={CustomInput}
                    ></Field>
                  )}
                </fieldset>

                <Button
                  style={{ textAlignLast: "center", width: "100%" }}
                  onClick={() => this.handleSwap()}
                >
                  <b>↑↓</b>
                </Button>
                <fieldset>
                  {!this.state.swap ? (
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
                  ) : (
                    <Field
                      name="from"
                      type="text"
                      id="from"
                      maxLength="3"
                      label="Destination"
                      placeholder="To"
                      required
                      component={CustomInput}
                    ></Field>
                  )}
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
        <div className="col" style={{ marginRight: "2rem" }}>
          {/* <CardDeck> */}
          {this.props.flights.map((flight) => (
            <Card key={flight._id} style={{ marginBottom: "2rem" }}>
              <Card.Header>{flight.name}</Card.Header>
              <Card.Body>
                <Card.Title>{flight.airlines}</Card.Title>
                <Card.Text>
                  <table style={{ width: "100%", tableLayout: "fixed" }}>
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "1.8rem" }}>{flight.from}</td>
                        <td>
                          <span class="plane">
                            <svg
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              height="50"
                              width="50"
                              image-rendering="optimizeQuality"
                              shape-rendering="geometricPrecision"
                              text-rendering="geometricPrecision"
                              viewBox="0 0 500 500"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g stroke="#222">
                                <line
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-width="30"
                                  x1="300"
                                  x2="55"
                                  y1="390"
                                  y2="390"
                                />
                                <path
                                  d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                                  fill="#222"
                                  stroke-linejoin="round"
                                  stroke-width="10"
                                />
                              </g>
                            </svg>
                          </span>
                        </td>
                        <td style={{ fontSize: "1.8rem" }}>{flight.to}</td>
                        <td style={{ fontSize: "1.8rem" }}>
                          {/* <span style={{ float: "right" }}> */}
                          &#8377;{flight.fare}
                          {/* </span> */}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => this.bookNow(flight._id)}
                            // href={"/book/" + flight._id}
                          >
                            Book now
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <span style={{ textAlign: "start" }}></span>
                </Card.Text>
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
