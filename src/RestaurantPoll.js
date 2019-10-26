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

    cardData: [
      {
        id: 0,
        avi:
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Panda_Express_logo.svg/1200px-Panda_Express_logo.svg.png",
        img:
          "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
        photos: [
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
          "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
          "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
        ],
        title: "Panda Express",
        description:
          "Panda Express is a fast food restaurant chain which serves American Chinese cuisine. With over 2,200 locations, it is the largest Asian segment restaurant chain in the United States, where it was founded and is mainly located.",
        more_info: "Pandas are large.",
        tags: ["Chinese", "Black and white"],
        open: false,
        rating: 3,
        dollar_signs: 1,
        location: "North Berkeley",
        selected: false
      },
      {
        id: 1,
        avi: "http://www.topdoghotdogs.com/images/logo_black_header.png",
        img:
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
        photos: [
          "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
          "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
          "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fa4be5dc2-59ed-11e8-9e86-99299e0f1a1c.jpg?crop=1909%2C1074%2C51%2C399&resize=685"
        ],
        title: "Top Dog",
        description: "top dog grew out of a boys love for sausage",
        more_info: "This dog is pretty good.",
        tags: ["Fast Food", "Fluffy"],
        open: false,
        rating: 5,
        dollar_signs: 2,
        location: "Downtown Berkeley",
        selected: false
      }
    ]
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
              avi={card.avi}
              img={card.img}
              photos={card.photos}
              title={card.title}
              description={card.description}
              more_info={card.more_info}
              tags={card.tags}
              rating={card.rating}
              dollar_signs={card.dollar_signs}
              location={card.location}
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
                cost={this.props.dollar_signs}
              />
            }
            title={this.props.title}
          />
          <CardMedia
            image={this.props.img}
            title={this.props.title}
            className="cardMedia"
          />
          <CardContent>
            {this.props.tags.map(tag => (
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
