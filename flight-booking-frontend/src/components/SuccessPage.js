import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.booking.booking._id);
  }
  render() {
    return (
      <div>
        {this.props.booking.booking.hasOwnProperty("_id") ? (
          <Jumbotron>
            <h1>Booking successful!</h1>
            <p>Your ticket number is {this.props.booking._id}</p>
            <p>
              <Button href="/myflights" variant="primary">
                View all bookings
              </Button>{" "}
            </p>
          </Jumbotron>
        ) : (
          <Jumbotron>
            <h1>Booking failed!</h1>
            <p>Please try again</p>
            <p>
              <Button variant="primary">
                <Link to="/">Search Flight</Link>
              </Button>
            </p>
          </Jumbotron>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booking: state.flight.booking,
  };
}

export default connect(mapStateToProps)(SuccessPage);
