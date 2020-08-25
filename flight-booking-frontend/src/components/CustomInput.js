import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class CustomInput extends Component {
  render() {
    const {
      input: { value, onChange },
    } = this.props;
    return (
      //   <Form>
      <Form.Group>
        <Form.Label htmlFor={this.props.id}>{this.props.label}</Form.Label>
        <Form.Control
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={value}
          onChange={onChange}
        />
      </Form.Group>
      //   </Form>
    );
  }
}
