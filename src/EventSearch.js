import React, { Component } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {NavLink, Redirect} from 'react-router-dom';

export default class EventSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCode : "",
      submitted: false
     };
  }
  handleNameChange = evt => {
    this.setState({ eventCode: evt.target.value})
  };

  onSubmitForm = (event) => {
    this.setState({ submitted: true})

  }

  render() {
    if (this.state.submitted){
      return (
        <Redirect to = {"/vote/" + this.state.eventCode}/>
      )
    }
    return (
      <Paper className="create-event">
        <form onSubmit={this.onSubmitForm} className="create-event-field" noValidate autoComplete="off">
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Do you have an event code?"
            margin="normal"
            onChange = {this.handleNameChange}
          />

          <Button
            variant="contained"
            color="primary"
            className="create-event-submit"
            component = {NavLink}
            to = {"/vote/" + this.state.eventCode}
          >
            Create Event
          </Button>
        </form>
      </Paper>
    );
  }
}
