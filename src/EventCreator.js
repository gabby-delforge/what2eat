import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default class EventCreator extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedDate: new Date() };
      }

    handleDateChange = date => {
      this.setState({selectedDate: date});
    };

    render() {
        return (
        <div className="create-event">
            
        <TextField
        id="standard-uncontrolled"
        label="Event Title"
        defaultValue="Make a cool event title"
        className="create-event-field"
        margin="normal"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          className="create-event-field"
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardTimePicker
         className="create-event-field"
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
      <TextField
        id="standard-uncontrolled"
        label="Invite Friends"
        defaultValue="bob@example.com"
        className="create-event-field"
        margin="normal"
      />
      </div>
        )
    }
}
