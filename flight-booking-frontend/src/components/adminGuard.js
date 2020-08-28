import React, { Component } from "react";
import { connect } from "react-redux";

export default (OriginalComponent) => {
  class MixedComponent extends Component {
    checkAuth() {
      console.log(this.props.user);
      if (!this.props.isAuth && !this.props.jwtToken && !this.props.user) {
        console.log("Unauthorized");
        this.props.history.push("/");
      } else {
        if (this.props.user === undefined) {
          console.log("Unauthorized");
          this.props.history.push("/");
        } else if (this.props.user.userType === "user") {
          console.log("Unauthorized");
          this.props.history.push("/");
        }
      }
    }
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }
    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      user: state.auth.user,

      jwtToken: state.auth.token,
    };
  }
  return connect(mapStateToProps)(MixedComponent);
};
