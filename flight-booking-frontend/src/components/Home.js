import React, { Component } from "react";
import { Button, Alert, Card, Table } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { flights: [] };
  }

  async onSubmit(formData) {
    console.log(formData);
    const flights = await this.props.searchFlight(formData);
    this.setState({ flights: flights });
    console.log(this.state.flights);
    // if (res) {
    //   await this.props.signUp(formData);
    // }
    // if (!this.props.errorMessage) {
    //   this.props.history.push("/");
    // }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            marginLeft: "2rem",
          }}
        >
          <Card style={{ width: "18rem" }}>
            <Card.Header>Search Flight</Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <Field
                    name="from"
                    type="text"
                    id="from"
                    maxLength="3"
                    // label="Password"
                    placeholder="From"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="to"
                    type="text"
                    id="to"
                    maxLength="3"
                    // label="Password"
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
                    placeholder="Journey date"
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
        <div className="col">
          <Table>
            {this.state.flights}
            {this.state.flights.map((item) => (
              <tr key={item.OrderID}>{item.CustomerID}</tr>
            ))}
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flights: state.flight.flights,
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "search" })
)(Home);
