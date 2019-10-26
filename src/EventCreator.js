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

export default class EventCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <Paper className="create-event">
        <form className="create-event-field" noValidate autoComplete="off">
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Event Title"
            defaultValue="Make a cool event title"
            margin="normal"
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

          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Invite Friends"
            defaultValue="bob@example.com"
            margin="normal"
          />

          <Button
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
