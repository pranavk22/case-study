import React, { Component } from "react";

export default class BookFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.flightId,
    };
  }

  render() {
    return <div>This is book flight screen of flight {this.state.id}</div>;
  }
}
