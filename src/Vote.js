import RestaurantPoll from "./RestaurantPoll";
import UserLogin from "./UserLogin";
import React, { Component } from "react";

export default class Vote extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      userID: -1
    };
  }

  onLogin = (username) => {
      this.setState({loggedIn: true, username: username, userID: 1});

  }
  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <RestaurantPoll />
        ) : (
          <UserLogin onLogin={this.onLogin} />
        )}
      </div>
    );
  }
}
