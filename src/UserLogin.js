import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

export default class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      userName: ""
    };
  }

  handleNameChange = event => {
    event.preventDefault();

    this.setState({ userName: event.target.value });
  };
  render() {
    return (
      <Paper className="create-event">
        <form
          onSubmit={() => this.props.onLogin(this.state.userName)}
          className="create-event-field"
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Enter your name:"
            margin="normal"
            onChange={this.handleNameChange}
          />

          <Button
            type="button"
            variant="contained"
            color="primary"
            className="create-event-submit"
            onClick={() => this.props.onLogin(this.state.userName)}
          >
            Go
          </Button>
        </form>
      </Paper>
    );
  }
}
