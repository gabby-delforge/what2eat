import React from "react";
import EventCreator from "./EventCreator";
import AppBar from "@material-ui/core/AppBar";
import RestaurantPoll from "./RestaurantPoll"
import Typography from "@material-ui/core/Typography";


export default function App() {
  return (
    <div className="App">
      <AppBar position="static" className="navbar">
        <Typography variant="h6" className="navbar-text">
          what2eat
        </Typography>
      </AppBar>
      <RestaurantPoll />
    </div>
  );
}
