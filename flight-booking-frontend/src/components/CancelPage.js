import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CancelPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.cancelBooking);
  }
  render() {
    return (
      <>
        {this.props.cancelBooking ? (
          <Jumbotron>
            <h1>Booking cancelled!</h1>
            <p>Your payment will be refunded soon</p>
            <p>
              <Button variant="primary">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Book new flight
                </Link>
              </Button>{" "}
            </p>
          </Jumbotron>
        ) : (
          <Jumbotron>
            <h1>Booking cancellation failed!</h1>
            <p>Please try again</p>
            <p>
              <Button variant="primary">
                <Link
                  to="/mybookings"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  View all bookings
                </Link>
              </Button>{" "}
            </p>
          </Jumbotron>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cancelBooking: state.flight.cancelBooking,
  };
}

export default connect(mapStateToProps)(CancelPage);
