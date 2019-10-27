import React, { Component } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import * as API from "./api/Api";
import { NavLink, Redirect } from "react-router-dom";

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {}
    };
  }

  componentDidMount() {
    API.get_vote_results(this.props.eventID).then(voteResults =>
      this.setState({ results: voteResults })
    );
  }

  normalize_value = value => {
    let max = 0;
    let min = 0;
    let results = Object.values(this.state.results).slice();
    console.log(results);
    results.map(val => {
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
    });
    console.log(max, min);
    return ((value - min) * 100) / (max - min);
  };

  getRestaurantName = (id) => {
    for (let i = 0; i < this.props.restaurants.length; i++) {
      if (this.props.restaurants[i].yelpID === id) {
        return this.props.restaurants[i].name;
      }
    }
    return "";
  }

  render() {
    return (
      <div className="results">
        {Object.keys(this.state.results).map(item => (
          <div className="result-container">
            <Typography variant="h8" className="result-child">
              {this.getRestaurantName(item)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={this.normalize_value(this.state.results[item])}
              color="primary"
              className="progress-bar"
            />
            <br />
          </div>
        ))}
      </div>
    );
  }
}
