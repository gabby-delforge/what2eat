import React from "react";
import EventCreator from "./EventCreator";
import AppBar from "@material-ui/core/AppBar";
import RestaurantPoll from "./RestaurantPoll";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import FastfoodSharpIcon from "@material-ui/icons/FastfoodSharp";
export default function App() {
  return (
    <div className="App">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            style={{ backgroundColor: "transparent" }}
          >
            <Typography variant="h6" className="navbar-text">
              what2eat
            </Typography>
            <FastfoodSharpIcon fontSize="large" className="burger"/>
          </Button>

          <Button className="navbar-button" color="inherit" component={NavLink} to="/about">
            About
          </Button>
          <Button className="navbar-button" color="inherit" component={NavLink} to="/">
            Create Event
          </Button>

          <Button className="navbar-button" color="inherit" component={NavLink} to="/vote">
            Vote
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
