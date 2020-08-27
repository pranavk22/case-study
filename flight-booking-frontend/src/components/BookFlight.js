import React, { Component } from "react";
import { Button, Alert, Card, Modal, Breadcrumb, Table } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

class BookFlight extends Component {
  constructor(props) {
    super(props);
    this.loadPassengers();
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.confirmFlight = this.confirmFlight.bind(this);

    this.state = { showForm: false, show: false, userDetails: {} };
    // console.log(this.props.user.userDetails);
  }

  onClick() {
    this.setState({ showForm: true });
  }

  async bookFlight(userDetails) {
    console.log(userDetails._id);
    await this.setState({ userDetails });
    this.handleShow();
  }
  async confirmFlight() {
    console.log(this.state.userDetails._id);
    await this.props.bookFlight(
      this.state.userDetails._id,
      this.props.flight._id
    );
    this.props.history.push("/successpage");
  }
  async loadPassengers() {
    if (this.props.user) {
      await this.props.fetchUserDetails(this.props.user._id);
    }
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  async onSubmit(formData) {
    console.log(formData);
    await this.props.addUserDetails(this.props.user._id, formData);
    this.loadPassengers();
    this.state.showForm = false;
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Search Flight</Breadcrumb.Item>
          <Breadcrumb.Item active>Traveller Details</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.userDetails.hasOwnProperty("_id") ? (
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Review Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card style={{ marginBottom: "2rem" }}>
                <Card.Header>Flight Details</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.props.flight.airlines} {this.props.flight.name}
                  </Card.Title>
                  <Card.Text>
                    From : {this.props.flight.from} To : {this.props.flight.to}
                    <br />
                    Fare : &#8377;{this.props.flight.fare} <br />
                    Date : {this.props.flight.date.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ marginBottom: "2rem" }}>
                <Card.Header>Traveller Details</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.state.userDetails.firstName}{" "}
                    {this.state.userDetails.lastName}{" "}
                  </Card.Title>
                  <Card.Text>
                    Birthdate:{" "}
                    {this.state.userDetails.birthdate.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>

              <Button variant="primary" onClick={this.confirmFlight}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
        <h1>Book Flight</h1>
        {this.props.flight.hasOwnProperty("_id") ? (
          <>
            <Card style={{ marginBottom: "2rem" }}>
              <Card.Header>{this.props.flight.name}</Card.Header>
              <Card.Body>
                <Card.Title>{this.props.flight.airlines}</Card.Title>
                <Card.Text>
                  From : {this.props.flight.from} To : {this.props.flight.to}
                  <br />
                  Fare : &#8377;{this.props.flight.fare} <br />
                  Date : {this.props.flight.date.substring(0, 10)}
                </Card.Text>
              </Card.Body>
            </Card>
            <h4>Book flight for</h4>
            {/* <DropdownButton id="dropdown-basic-button" title="Select passenger">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton> */}
            {this.props.userDetails.length > 0 ? (
              //   <>
              //     <input type="text" list="data" onChange={this._onChange} />
              //     <datalist id="data">
              //       {this.props.userDetails.map((item, key) => (
              //         <option key={item._id} value={item.firstName} />
              //       ))}
              //     </datalist>
              //   </>
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Birthdate</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.userDetails.map((user, key) => (
                      <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.birthdate.substring(0, 10)}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => this.bookFlight(user)}
                          >
                            Book
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary" onClick={this.onClick}>
                  Add Other Traveller
                </Button>
              </>
            ) : null}
            {this.state.showForm ? (
              <Card>
                <Card.Body>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                      <Field
                        name="firstName"
                        type="text"
                        id="firstName"
                        label="First Name"
                        placeholder="First Name"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>

                    <fieldset>
                      <Field
                        name="lastName"
                        type="text"
                        id="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>
                    <fieldset>
                      <Field
                        name="birthdate"
                        type="date"
                        id="birthdate"
                        label="Birthdate"
                        placeholder="Birthdate"
                        required
                        component={CustomInput}
                      ></Field>
                    </fieldset>
                    {this.props.errorMessage ? (
                      <Alert variant="danger">{this.props.errorMessage} </Alert>
                    ) : null}
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            ) : null}
          </>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>You have not selected any flight to book</Card.Text>
              <Button variant="primary" href="/">
                Search flight
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
    flight: state.flight.flight,
    user: state.auth.user,
    userDetails: state.user.userDetails,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "addPassenger" })
)(BookFlight);
