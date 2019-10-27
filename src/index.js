import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RestaurantPoll from "./RestaurantPoll";
import EventCreator from "./EventCreator";
import Vote from "./Vote";
import EventSearch from "./EventSearch"
import Result from "./Result"

const HomePage = () => (
  <div>
    <App />
    <EventCreator />
  </div>
);
const VotePage = props => {
  console.log(props.match.params);
  const eventID = props.match.params.id;
  return (
    <div>
      <App />
      <Vote eventID={eventID}/>
    </div>
  );
};
const NotFoundPage = () => (
  <div>
    <App />
    404!
  </div>
);
const DefaultVote = () => (
  <div>
    <App/>
    <EventSearch/>
  </div>
);
const ResultPage = () => (
  <div>
    <App/>
    <Result/>
  </div>
);
const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component = {HomePage} exact = {true}/>
      <Route path="/vote" component = {DefaultVote} exact = {true}/>
      <Route path="/vote/:id" component = {VotePage}/>
      <Route path="/results" component = {ResultPage}/>
      <Route component = {NotFoundPage}/>
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
