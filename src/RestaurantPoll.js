import './App.css';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import Rating from '@material-ui/lab/Rating';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';


export default class RestaurantPoll extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleOpenForm = this.handleOpenForm.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);

  }
  state = {
    addFormOpen : false,
    cardData : [
      {
        avi : "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Panda_Express_logo.svg/1200px-Panda_Express_logo.svg.png",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
        title: 'Panda Express',
        description: 'Panda Express is a fast food restaurant chain which serves American Chinese cuisine. With over 2,200 locations, it is the largest Asian segment restaurant chain in the United States, where it was founded and is mainly located.',
        more_info: 'Pandas are large.',
        tags: ["Chinese", "Black and white"],
        open: false,
        rating: 3,
        dollar_signs: 1,
        location: "North Berkeley",
        selected: false
      },
      {
        avi : "http://www.topdoghotdogs.com/images/logo_black_header.png",
        img: "https://dcewboipbvgi2.cloudfront.net/sites/default/files/styles/article_hero_image/public/Puppy_Dog_Labrador_Jerry.jpg?itok=XGobf9k7",
        title: 'Top Dog',
        description: 'top dog grew out of a boys love for sausage',
        more_info: 'This dog is pretty good.',
        tags: ["Fast Food", "Fluffy"],
        open: false,
        rating: 5,
        dollar_signs: 2,
        location: "Downtown Berkeley",
        selected: false
      },
      {
        avi : "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/rabbits-235417.jpg?h=f699065c&itok=xcSgVx9D",
        img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c11f34da-1f91-41aa-896f-143beac9258e/d22yhqn-8bb51657-36f9-435d-a25b-29b8c5af1be7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxMWYzNGRhLTFmOTEtNDFhYS04OTZmLTE0M2JlYWM5MjU4ZVwvZDIyeWhxbi04YmI1MTY1Ny0zNmY5LTQzNWQtYTI1Yi0yOWI4YzVhZjFiZTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.th_KdgKw84k1rT6_IgFP6GkkOLssLa-4ZyCs4wsrP3Q",
        title: 'Bun',
        description: 'bunnies',
        more_info: 'Hare did not win the race.',
        tags: ["Bunnies", "Very Fast"],
        open: false,
        rating: 4,
        dollar_signs: 4,
        location: "West Berkeley",
        selected: false
      },
    ]

  }
  handleExpandClick(card) {
    let newCards = this.state.cardData.slice();
    let idx = newCards.indexOf(card)
    newCards[idx].open = !newCards[idx].open
    newCards[idx].selected = !newCards[idx].selected
    this.setState({cardData : newCards})
  }
  handleFavoriteClick(card) {
    let newCards = this.state.cardData.slice();
    let idx = newCards.indexOf(card)
    let old_val = newCards[idx].selected
    newCards.map((item) => {
      return item.selected = false
    })
    newCards[idx].selected = !old_val
    this.setState({cardData : newCards})
  }
  handleOpenForm() {
    this.setState({addFormOpen : true})
  }
  handleCloseForm() {
    this.setState({addFormOpen : false})
  }
  render() {

  return (
    <div>
    <Grid container spacing={3}>
      {this.state.cardData.map(card => (
        <Grid item xs>
          <Card
          className = {card.selected ? "restaurantCardfav": "restaurantCardreg"}
          onClick = {() => this.handleFavoriteClick(card)}
          >
            <CardHeader

              action={
                <div className = "headCard">
                   <Rating value={card.rating} readOnly />
                   <br/>
                   {Array(card.dollar_signs).fill(<AttachMoneyRoundedIcon className = "moneyIcon"/>)}
                   <br/>
                  <AddLocationIcon className = "locationIcon"/>
                  {" " + card.location}
                </div>
              }
              title={
                card.title
              }
            />
            <CardMedia
              image={card.img}
              title={card.title}
              className = "cardMedia"
            />
            <CardContent>

              <Typography variant="body2" color="textSecondary" component="p">
                {card.description}
              </Typography>
              {card.tags.map(tag =>
                <Chip className = "restaurantChip" size="small" label={" " + tag + " "} />
              )}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => this.handleExpandClick(card)}
                aria-expanded={card.open}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={card.open} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  {card.more_info}
                </Typography>

              </CardContent>
            </Collapse>
          </Card>
          </Grid>
          ))}
          </Grid>
          <br/>
          <Button variant="outlined" color="secondary" onClick={this.handleOpenForm}>
                  <AddIcon/>
                </Button>
                <Dialog open={this.state.addFormOpen} onClose={this.handleCloseForm} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add a restaurant to the list!</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To add a restuarant to your group's party please search for the name below:
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseForm} color="secondary">
                      <SearchIcon/>
                    </Button>
                  </DialogActions>
                </Dialog>
          <br/>
          <br/>

    </div>
  );
  }
}
