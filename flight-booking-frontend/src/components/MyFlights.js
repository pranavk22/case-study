import React, { Component } from "react";
import { Button, Alert, Card, Modal, Breadcrumb, Table } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../actions";

class MyFlights extends Component {
  constructor(props) {
    super(props);
    this.loadPassengers();
  }
  async loadPassengers() {
    console.log(this.props.user);
    if (this.props.user) {
      await this.props.fetchUserDetails(this.props.user._id);
      console.log(this.props.userDetails);
    }
  }

  render() {
    return <div></div>;
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
