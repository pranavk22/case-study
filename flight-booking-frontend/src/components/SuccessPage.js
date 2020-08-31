import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.booking.booking._id);
  }
  render() {
    return (
      <>
        {this.props.booking ? (
          <div>
            {this.props.booking.hasOwnProperty("_id") ? (
              <Jumbotron>
                <h1>Booking successful!</h1>
                <p>Your ticket number is {this.props.booking.bookingId}</p>
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
            ) : null}
          </div>
        ) : (
          <Jumbotron>
            <h1>Booking failed!</h1>
            <p>Please try again</p>
            <p>
              <Button variant="primary">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Search Flight
                </Link>
              </Button>
            </p>
          </Jumbotron>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    booking: state.flight.booking,
    cancelBooking: state.flight.cancelBooking,
  };
}

export default connect(mapStateToProps)(SuccessPage);
