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
      <Paper className="login-container">
        <TextField
          id="standard-name"
          label="Enter your name"
          value={this.state.userName}
          onChange={this.handleNameChange}
          margin="normal"
          variant="outlined"

        />
        <Button
          id="outlined-name"
          variant="contained"
          color="primary"
          onClick={() => this.props.onLogin("mary")}
        >
          Login bitch
        </Button>
      </Paper>
    );
  }
}
