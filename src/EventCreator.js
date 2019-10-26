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
import * as Api from "./api/Api"
export default class EventCreator extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      creatorName : "",
      selectedDate: new Date(),
      eventName: "",
      friends: "",
     };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleNameChange = evt => {
    this.setState({ creatorName: evt.target.value})
  };
  handleFriendChange = evt => {
    this.setState({ friends: evt.target.value})
  };
  handleEventChange = evt => {
    this.setState({ eventName: evt.target.value})
  };
  handleSubmit(evt) {
    evt.preventDefault();
    console.log("Creator Name: ", this.state.creatorName, "Event Title: ", this.state.eventName, "DATE: ", this.state.selectedDate)
    let apiResp = Api.create_event(this.state.eventName, this.state.selectedDate, this.state.creatorName, "Berkeley")
    console.log(apiResp);
  };

  render() {
    return (
      <Paper className="create-event">
        <form className="create-event-field" noValidate autoComplete="off" onSubmit = {this.handleSubmit}>
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="What's Your Name?"
            margin="normal"
            onChange = {this.handleNameChange}
          />
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Make A Cool Event Title!"
            margin="normal"
            onChange = {this.handleEventChange}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
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


          <Button
            type = "submit"
            variant="contained"
            color="primary"
            className="create-event-submit"
          >
            Create Event
          </Button>
        </form>
      </Paper>
    );
  }
}
