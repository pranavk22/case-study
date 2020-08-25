import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

class SecretPage extends Component {
  async componentDidMount() {
    this.props.getSecret();
  }
  render() {
    return <div>Secret : {this.props.secret}</div>;
  }
}

function mapStateToProps(state) {
  return {
    secret: state.secret.secret,
  };
}

export default connect(mapStateToProps, actions)(SecretPage);
