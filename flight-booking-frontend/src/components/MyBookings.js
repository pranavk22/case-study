import React, { Component } from "react";
import { Button, Alert, Card, Modal, Breadcrumb, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

class MyFlights extends Component {
  constructor(props) {
    super(props);
    this.loadPassengers();
    this.state = { bookings: [], show: false, booking: {} };
    this.confirmCancel = this.confirmCancel.bind(this);
  }

  async loadPassengers() {
    console.log(this.props.user);
    if (this.props.user) {
      await this.props.fetchUserDetails(this.props.user._id);
      console.log(this.props.userDetails);
      this.getBookings();
    }
  }

  async getBookings() {
    for (var i = 0; i < this.props.userDetails.length; i++) {
      var newBookings = await this.props.getBookings(
        this.props.userDetails[i]._id
      );
      this.setState((state) => {
        const bookings = state.bookings.concat(newBookings);
        return { bookings };
      });
      console.log(this.state.bookings);
    }
  }

  async cancelBooking(booking) {
    await this.setState({ booking });
    this.handleShow();
  }
  async confirmCancel() {
    this.handleClose();
    await this.props.cancelBooking(this.state.booking._id);
    this.props.history.push("/cancelpage");
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <div>
        <h1>View all bookings</h1>
        {this.state.bookings.length > 0 ? (
          <>
            {this.state.bookings.map((booking) => (
              <>
                <Card key={booking._id} style={{ marginBottom: "2rem" }}>
                  <Card.Header>{booking.bookingId}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {booking.user.firstName + " " + booking.user.lastName}
                    </Card.Title>
                    <Card.Text>
                      <table style={{ width: "100%", tableLayout: "fixed" }}>
                        <tbody>
                          <tr>
                            <td style={{ fontSize: "1.2rem" }}>
                              {booking.flight.airlines}
                              <br />
                              {booking.flight.name}
                            </td>
                            <td style={{ fontSize: "1.2rem" }}>
                              {booking.flight.from}
                            </td>
                            <td>
                              <span class="plane">
                                <svg
                                  clip-rule="evenodd"
                                  fill-rule="evenodd"
                                  height="30"
                                  width="30"
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
                            <td style={{ fontSize: "1.2rem" }}>
                              {booking.flight.to}
                            </td>
                            <td style={{ fontSize: "1.2rem" }}>
                              {booking.flight.date.substring(0, 10)}
                            </td>
                            <td style={{ fontSize: "1.2rem" }}>
                              {/* <span style={{ float: "right" }}> */}
                              &#8377;{booking.flight.fare}
                              {/* </span> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <span style={{ textAlign: "start" }}></span>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      style={{ marginRight: "2rem" }}
                      onClick={() => this.cancelBooking(booking)}
                      // href={"/book/" + flight._id}
                    >
                      Cancel booking
                    </Button>
                    <Button
                      variant="primary"
                      // onClick={() => this.bookNow(booking.flight._id)}
                      // href={"/book/" + flight._id}
                    >
                      Check in
                    </Button>
                  </Card.Body>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Cancel bookings</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to cancel booking ?
                    <br />
                    Cancellation charge of 20% will be applied
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={this.confirmCancel}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))}
          </>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>You have not booked any flight</Card.Text>
              <Button variant="primary">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Search flight
                </Link>
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
    userDetails: state.user.userDetails,
  };
}
export default connect(mapStateToProps, actions)(MyFlights);
