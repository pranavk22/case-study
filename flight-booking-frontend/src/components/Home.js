import React, { Component } from "react";
import {
  Button,
  Alert,
  Card,
  Modal,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { reduxForm, Field, getFormValues } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

const cities = [
  { city: "", code: "" },
  { city: "Mumbai", code: "BOM" },
  { city: "Bangalore", code: "BLR" },
  { city: "Chennai", code: "MAA" },
  { city: "Kolkata", code: "CCU" },
  { city: "Lucknow", code: "LKO" },
  { city: "Amritsar", code: "ATQ" },
  { city: "Vishakhapatnam", code: "VTZ" },
  { city: "Kannur", code: "CNN" },
  { city: "Raipur", code: "RPR" },
  { city: "Surat", code: "STV" },
  { city: "Indore", code: "IDR" },
  { city: "Kochi", code: "COK" },
  { city: "Ahmedabad", code: "AMD" },
  { city: "Delhi", code: "DEL" },
  { city: "Goa", code: "GOI" },
  { city: "Pune", code: "PNQ" },
  { city: "Thiruvananthapuram", code: "TRV" },
  { city: "Coimbatore", code: "CJB" },
  { city: "Calicut", code: "CCJ" },
  { city: "Bhubaneshwar", code: "BBI" },
  { city: "Guwahati", code: "GAU" },
  { city: "Varanasi", code: "VNS" },
  { city: "Hyderabad", code: "HYD" },
  { city: "Tiruchirapalli", code: "TRZ" },
  { city: "Nagpur", code: "NAG" },
  { city: "Srinagar", code: "SXR" },
  { city: "Imphal", code: "IMF" },
  { city: "Jaipur", code: "JAI" },
  { city: "Madurai", code: "IXM" },
  { city: "Siliguri", code: "IXB" },
  { city: "Patna", code: "PAT" },
  { city: "Mangalore", code: "IXE" },
  { city: "Chandigarh", code: "IXC" },
  { city: "Andaman & Nicobar", code: "IXZ" },
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      show: false,
      swap: false,
      from: { city: "", code: "" },
      to: { city: "", code: "" },
      date: "",
      loadingSearch: false,
    };
    // this.state = { flights: [] };
  }

  renderFrom = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <Autocomplete
      label={label}
      options={cities}
      defaultValue={this.state.from}
      placeholder={label}
      getOptionLabel={(option) => option.city}
      onChange={(event, value) => {
        this.setState({ from: value });
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );

  renderTo = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <Autocomplete
      label={label}
      options={cities}
      placeholder={label}
      defaultValue={this.state.to}
      getOptionLabel={(option) => option.city}
      onChange={(event, value) => {
        this.setState({ to: value });
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );
  async onSubmit(dateData) {
    if (this.state.swap) {
      const swapper = this.state.from;
      this.state.from = this.state.to;
      this.state.to = swapper;
      this.setState({ swap: false });
    }
    this.setState({ loadingSearch: true });
    await this.setState({
      date: dateData.date,
    });
    console.log(this.state.date);
    console.log(dateData);
    const formData = {
      from: this.state.from.code,
      to: this.state.to.code,
      date: this.state.date,
    };
    console.log(formData);
    const res = await this.props.validateSearch(formData);
    console.log(res);
    if (res) {
      await this.props.searchFlight(formData);
    }
    this.setState({ loadingSearch: false });

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
                      label="From"
                      required
                      component={this.renderFrom}
                    ></Field>
                  ) : (
                    <Field
                      name="to"
                      type="text"
                      id="to"
                      label="From"
                      required
                      component={this.renderTo}
                    ></Field>
                  )}
                </fieldset>

                <Button
                  style={{
                    textAlignLast: "center",
                    width: "100%",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
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
                      label="To"
                      required
                      component={this.renderTo}
                    ></Field>
                  ) : (
                    <Field
                      name="from"
                      type="text"
                      id="from"
                      label="To"
                      required
                      component={this.renderFrom}
                    ></Field>
                  )}
                </fieldset>

                <fieldset>
                  <Field
                    name="date"
                    type="date"
                    id="date"
                    // label="Journey date
                    // defaultValue={Date.now()}
                    component={CustomInput}
                  ></Field>
                </fieldset>
                {this.props.errorMessage ? (
                  <Alert variant="danger">{this.props.errorMessage} </Alert>
                ) : null}
                <Button variant="primary" type="submit">
                  {this.state.loadingSearch ? (
                    <Spinner animation="border" size="sm" />
                  ) : null}{" "}
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
                        <td style={{ fontSize: "1.4rem" }}>{flight.from}</td>
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
                        <td style={{ fontSize: "1.4rem" }}>{flight.to}</td>
                        <td style={{ fontSize: "1.4rem" }}>
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
    errorMessage: state.flight.errorMessage,
  };
}
// Home = connect((state) => ({
//   values: getFormValues("myForm")(state),
// }))(Home);

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "search" })
)(Home);
