import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";


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
      <Paper className="find-event">
        
        <form
          onSubmit={() => this.props.onLogin(this.state.userName)}
          className="find-event-field"
          noValidate
          autoComplete="off"
        >
            <Typography variant="h6" component="h3">
          Enter your name to vote on food choices:
        </Typography>
          <TextField
            fullWidth
            id="standard-uncontrolled"
            label="Name"
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
