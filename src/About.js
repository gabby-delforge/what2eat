import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

export default class EventSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Paper className="about-page">

          <Typography variant="h6" className="navbar-text" align = "center">
            what2eat
          </Typography>
          <center>
            <img className = "foodImg" src = "https://i.etsystatic.com/9442528/r/il/1c233d/1540488492/il_570xN.1540488492_ltmu.jpg?fbclid=IwAR0jz5i96HL1RAyX1lu7PIxDNUjLEWmeoIxE8sQ4aelcHXL50V7Uv6x4Zcg"/>
          </center>
          <Typography variant="h8" className ="aboutTextSmall">
           WHAT2EAT solves the indecision problem that plagues most friend groups. It's hard to figure out everyones availability and figuring out what food works for everyone is even harder. We used React for our front-end using MaterialUI and for our background we used Python with services like cockroachDB and Flask. We're a group of 4 hackers from Berkeley; we're all seniors so this is our last CalHacks :(
          </Typography>
          <div className = "avatar-list">
            <Avatar src="https://media.licdn.com/dms/image/C5603AQHnsn7fH79txA/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=6a0VlSE2IANxqE012-16N1Z5vrWhLnQfuYO6JkKu7pQ" className="big-avatar" />
            <Avatar src="https://media.licdn.com/dms/image/C5103AQEhr_xFkBuYfg/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=JYFUIgl9DM_Ql3eMYasfhMtL0zcl18K7P-Qj6ePZee8" className="big-avatar" />
            <Avatar src="https://media.licdn.com/dms/image/C5603AQE1DvWZpZKldA/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=CJT4LqAMNjjLEATAM_wNIF7QHYB07Sur7dT4BRf8QD8" className="big-avatar" />
            <Avatar src="https://media.licdn.com/dms/image/C5103AQExCKW3ajXujw/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=GapZJ3KRJxGsmjrKdyHD4upGalXtivB2VZrYkNo7rf4" className="big-avatar" />
          </div>
        </Paper>
        <br/>
        </div>
    );
  }
}
