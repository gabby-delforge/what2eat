import './App.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import {tileData} from './components/TileData';

export default class RestaurantPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : true,

    };
  }

  render() {
  return (
    <div>
      <GridList cellHeight={180} className = "restaurantlist">
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className = "infoicon" >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}

      </GridList>
      <br/>
      <Button
        variant="contained"
        color="default"
        startIcon={<AddIcon />}
      >
        Add new Restaurant
      </Button>
    </div>
  );
  }
}
