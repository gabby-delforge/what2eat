import RestaurantPoll from "./RestaurantPoll";
import UserLogin from "./UserLogin";
import React, { Component } from "react";
import * as API from "./api/Api";

export default class Vote extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      userID: -1,
      restaurants: [],
      eventInfo: {}
    };
  }

  onLogin = username => {
    //Login and get UID and user vote info
    API.login(username, this.props.eventID).then(loginResponse => {
      //UID and VoteData
      const UID = loginResponse.UID;
      const voteData = loginResponse.voteData;
      this.setState({ username: username, userID: UID }, () => {
        //Get event restaurants
        API.get_event_restaurants(this.props.eventID, UID).then(
          restaurantsResponse => {
            console.log(restaurantsResponse);
            this.setState(
              { restaurants: restaurantsResponse.restaurants },
              () => {
                //Get event info
                API.get_event_info(this.props.eventID).then(
                  eventInfoResponse => {
                    console.log(eventInfoResponse);
                    this.setState(
                      { eventInfo: eventInfoResponse.eventInfo },
                      () => {
                        this.setState({ loggedIn: true });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <RestaurantPoll
            restaurants={this.state.restaurants}
            eventInfo={this.state.eventInfo}
          />
        ) : (
          <UserLogin onLogin={this.onLogin} />
        )}
      </div>
    );
  }
}
