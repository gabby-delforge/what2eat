import "./App.css";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import Rating from "@material-ui/lab/Rating";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Result from "./Result";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as API from "./api/Api";

export default class RestaurantPoll extends Component {
  constructor(props) {
    super(props);
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
  }

  state = {
    addFormOpen: false,
    searchString: "",
    searchResults: [],
    cardData: this.props.restaurants,
    submitted: false,
    resultsFormOpen: false,
    selectedOne: false
  };

  handleFavoriteClick = card => {
    let newCards = this.state.cardData.slice();
    let idx = newCards.indexOf(card);
    let old_val = newCards[idx].selected;
    newCards.map(item => {
      return (item.selected = false);
    });
    newCards[idx].selected = !old_val;
    this.setState({ cardData: newCards, selectedOne: !old_val });
  };

  handleOpenForm() {
    this.setState({ addFormOpen: true });
  }
  handleCloseForm() {
    this.setState({ addFormOpen: false });
  }
  handleSubmit = () => {
    let selectedCard = {};
    for (let i = 0; i < this.state.cardData.length; i++) {
      if (this.state.cardData[i].selected) {
        selectedCard = this.state.cardData[i];
        break;
      }
    }
    API.vote_restaurant(
      this.props.eventID,
      selectedCard.yelpID,
      this.props.userID
    );
    let newCards = this.state.cardData.slice();
    let favorite = false;
    newCards.map(item => {
      if (item.selected) {
        favorite = true;
      }
    });
    if (favorite) {
      this.setState({ submitted: true });
    }
  };
  handleViewResults = () => {
    if (this.state.submitted) {
      this.setState({ resultsFormOpen: true });
    }
  };
  handleCloseResults = () => {
    this.setState({ resultsFormOpen: false });
  };
  handleSearch = () => {
    API.search_restaurant(this.state.searchString, "Berkeley").then(
      apiResponse => {
        console.log(apiResponse);
        this.setState({ searchResults: apiResponse.restaurants });
      }
    );
  };

  updateSearch = event => {
    this.setState({ searchString: event.target.value });
  };

  handleAddRestaurant = newRestaurant => {
    for (let i = 0; i < this.state.cardData.length; i++) {
      if (this.state.cardData[i].yelpID === newRestaurant.yelpID) {
        console.log("User tried adding a restaurant that already existed");
        return;
      }
    }
    let newCardData = this.state.cardData.slice();
    newCardData.push(newRestaurant);
    this.setState({ cardData: newCardData });
    API.add_restaurant(newRestaurant.yelpID, this.props.eventID);
  };

  render() {
    let listSearchResults;
    if (this.state.searchResults) {
      listSearchResults = (
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.searchResults.map(result => {
            return (
              <ListItem button>
                <Avatar src={result.image_url} className="search-result-avatar"/>
                <ListItemText primary={result.name} secondary={result.city} />
                <Chip
                    className="search-result-chip"
                    label={" " + result.categories[0] + " "}
                  />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => this.handleAddRestaurant(result)}
                >
                  <AddIcon />
                </Button>
              </ListItem>
            );
          })}
        </List>
      );
    } else {
      listSearchResults = <span />;
    }
    return (
      <div>
      <Typography variant="h6" className="event-header" align = "center">
       {this.props.eventInfo.eventName}
      </Typography>
        <Grid container spacing={3} className="restaurant-grid">
          {this.state.cardData.map(card => (
            <RestaurantCard
              className={
                card.selected ? "restaurant-card-fav" : "restaurant-card-reg"
              }
              image_url={card.image_url}
              photos={card.photos}
              name={card.name}
              categories={card.categories}
              rating={card.rating}
              price={card.price}
              city={card.city}
              unselectAll={this.unselectAll}
              selected={card.selected}
              onClick={() => this.handleFavoriteClick(card)}
            />
          ))}
        </Grid>
        <br />
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={this.handleOpenForm}
          className="add-icon"
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.addFormOpen}
          onClose={this.handleCloseForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add a restaurant to the list!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a restuarant to your group's party please search for the
              name below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              onChange={this.updateSearch}
            />
            {this.state.searchResults ? listSearchResults : <span />}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSearch} color="secondary">
              <SearchIcon />
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.selectedOne ? (
          <Button
            variant="contained"
            color="Primary"
            size="large"
            onClick={this.handleSubmit}
            className="submit-button"
          >
            Vote!
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            color="Primary"
            size="large"
            onClick={this.handleSubmit}
            className="submit-button"
          >
            Vote!
          </Button>
        )}
        {this.state.submitted ? (
          <Button
            variant="contained"
            size="large"
            color="Primary"
            onClick={this.handleViewResults}
            className="view-button"
          >
            <EqualizerIcon />
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            size="large"
            color="Primary"
            onClick={this.handleViewResults}
            className="view-button"
          >
            <EqualizerIcon />
          </Button>
        )}
        <Dialog
          open={this.state.resultsFormOpen}
          onClose={this.handleCloseResults}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Here are the votes so far:
          </DialogTitle>
          <DialogContent className="result-content">
            <Result
              eventID={this.props.eventInfo.eventID}
              restaurants={this.state.cardData}
            />
          </DialogContent>
        </Dialog>

        <br />
        <br />
      </div>
    );
  }
}

class RestaurantCard extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
  }

  handleExpandClick() {
    this.setState({ selected: !this.state.selected });
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Grid item xs={4} sm={6} md={4}>
        <Card className={this.props.className} onClick={this.props.onClick}>
          <CardHeader
            className="card-header"
            action={
              <CardHeaderAction
                rating={this.props.rating}
                cost={this.props.price}
              />
            }
            title={this.props.name}
          />
          <CardMedia
            image={this.props.image_url}
            title={this.props.name}
            className="cardMedia"
          />
          <CardContent>
            {this.props.categories.map(tag => (
              <Chip
                className="restaurantChip"
                size="medium"
                label={" " + tag + " "}
              />
            ))}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => this.handleExpandClick()}
              aria-expanded={this.state.open}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent className="card-media-small-container">
              <CardMedia
                image={this.props.photos[0]}
                title="secondary photo"
                className="card-media-small"
              />
              <CardMedia
                image={this.props.photos[1]}
                title="secondary photo"
                className="card-media-small"
              />
              <CardMedia
                image={this.props.photos[2]}
                title="secondary photo"
                className="card-media-small"
              />
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  }
}

class CardHeaderAction extends React.Component {
  render() {
    return (
      <div className="header-action-container">
        <DollarSigns value={this.props.cost} />
        <div className="header-separator">|</div>
        <Rating
          value={this.props.rating}
          readOnly
          size="medium"
          className="header-stars"
        />
      </div>
    );
  }
}
class DollarSigns extends Component {
  render() {
    const dollarSigns = Array(this.props.value).fill(
      <AttachMoneyRoundedIcon className="money-icon" fontSize="small" />
    );

    return <div className="dollar-signs">{dollarSigns}</div>;
  }
}
