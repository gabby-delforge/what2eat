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

          <Typography variant="h6" className="about-header" align = "center">
            About what2eat
          </Typography>
          <center>
            <img className = "foodImg" src = "https://i.imgur.com/Ps1WfOb.png"/>
          </center>
          <Typography variant="h8" className ="aboutTextSmall">
           WHAT2EAT solves the indecision problem that plagues most friend groups. It's hard to figure out everyones availability and figuring out what food works for everyone is even harder. We used React for our front-end using MaterialUI and for our background we used Python with services like cockroachDB and Flask. We're a group of 4 hackers from Berkeley; we're all seniors so this is our last CalHacks :(
          </Typography>
          <div className = "avatar-list">
            <Paper align = "center">
              <Avatar src="https://media.licdn.com/dms/image/C5603AQHnsn7fH79txA/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=6a0VlSE2IANxqE012-16N1Z5vrWhLnQfuYO6JkKu7pQ" className="big-avatar" />
              Gabby has the most B's in her name in this team.
            </Paper>
            <Paper align = "center">
              <Avatar src="https://media.licdn.com/dms/image/C5103AQEhr_xFkBuYfg/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=JYFUIgl9DM_Ql3eMYasfhMtL0zcl18K7P-Qj6ePZee8" className="big-avatar" />
              Ian has the shortest name in this team.
            </Paper>
            <Paper align = "center">
              <Avatar src="https://media.licdn.com/dms/image/C5603AQE1DvWZpZKldA/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=CJT4LqAMNjjLEATAM_wNIF7QHYB07Sur7dT4BRf8QD8" className="big-avatar" />
              Andrew has the only name that starts with an A in this team.
            </Paper>
            <Paper align = "center" >
              <Avatar src="https://media.licdn.com/dms/image/C5103AQExCKW3ajXujw/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=GapZJ3KRJxGsmjrKdyHD4upGalXtivB2VZrYkNo7rf4" className="big-avatar" />
              Joseph has the longest last name in this team.
            </Paper>
          </div>
        </Paper>
        <br/>
        </div>
    );
  }
}
