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
    searchResults: [],
    cardData: this.props.restaurants,
    eventInfo: this.props.eventInfo,
  };

  handleFavoriteClick = card => {
    let newCards = this.state.cardData.slice();
    let idx = newCards.indexOf(card);
    let old_val = newCards[idx].selected;
    newCards.map(item => {
      return (item.selected = false);
    });
    newCards[idx].selected = !old_val;
    this.setState({ cardData: newCards });
  };

  handleOpenForm() {
    this.setState({ addFormOpen: true });
  }
  handleCloseForm() {
    this.setState({ addFormOpen: false });
  }

  handleSearch = () => {
    let results = API.search_restaurant("Burger King", "Berkeley");
    let placeholder_results = this.state.cardData;
    this.setState({ searchResults: placeholder_results });
  };

  handleAddRestaurant = newRestaurant => {
    for (let i = 0; i < this.state.cardData.length; i++) {
      if (this.state.cardData[i].id === newRestaurant.id) {
        console.log("User tried adding a restaurant that already existed");
        return;
      }
    }
    let newCardData = this.state.cardData.slice();
    newCardData.push(newRestaurant);
    this.setState({ cardData: newCardData });
  };
  render() {
      console.log(this.state.cardData);
    let listSearchResults;
    if (this.state.searchResults) {
      listSearchResults = (
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.searchResults.map(result => {
            return (
              <ListItem button>
                <ListItemText primary={result.title} />
                <Button
                  variant="outlined"
                  color="secondary"
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
          variant="outlined"
          color="secondary"
          onClick={this.handleOpenForm}
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
            <TextField autoFocus margin="dense" id="name" fullWidth />
            {this.state.searchResults ? listSearchResults : <span />}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSearch} color="secondary">
              <SearchIcon />
            </Button>
          </DialogActions>
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
