import React, { Component } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import * as Api from "./api/Api";
import Typography from "@material-ui/core/Typography";
import {Redirect} from 'react-router-dom';

export default class EventCreator extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      creatorName: "",
      selectedDate: new Date(),
      eventName: "",
      friends: "",
      submitEvent: false,
      eventNumber: 0
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleNameChange = evt => {
    this.setState({ creatorName: evt.target.value });
  };
  handleFriendChange = evt => {
    this.setState({ friends: evt.target.value });
  };
  handleEventChange = evt => {
    this.setState({ eventName: evt.target.value });
  };
  handleSubmit(evt) {
    evt.preventDefault();
    console.log(
      "Creator Name: ",
      this.state.creatorName,
      "Event Title: ",
      this.state.eventName,
      "DATE: ",
      this.state.selectedDate
    );
    Api.create_event(
      this.state.eventName,
      this.state.selectedDate.getTime(),
      this.state.creatorName,
      "Berkeley"
    ).then((apiResp)=>{this.setState({submitEvent: true, eventNumber: apiResp.eventID});});

  }

  render() {
    if (this.state.submitEvent) {
      return (
          <Redirect to = {"/vote/" + this.state.eventNumber}/>
      )
    }
    return (
      <Paper className="create-event">
          <div className="create-event-header-container">
        <Typography className="create-event-header" variant="h5" component="h3">
          Create a new event
        </Typography>
        </div>
        <form
          className="create-event-field"
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="What's your name?"
            margin="normal"
            onChange={this.handleNameChange}
          />

          <TextField
            fullWidth
            id="standard-full-width"
            placeholder="eg. what2eat launch party"
            label="Give it a name as cool as you"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleEventChange}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date & time"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              fullWidth
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{margin: "auto"}}
            className="create-event-submit"
          >
            Create Event
          </Button>
        </form>
      </Paper>
    );
  }
}
