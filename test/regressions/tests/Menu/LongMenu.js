import React from 'react';
import IconButton from 'share-we-go-ui/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from 'share-we-go-ui/styles';
import Menu from 'share-we-go-ui/Menu';
import MenuItem from 'share-we-go-ui/MenuItem';
import MoreVertIcon from 'share-we-go-icons/MoreVert';

const styles = {
  root: {
    margin: '200px 0 200px',
    background: 'papayawhip',
    padding: '0 100px',
  },
};

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  buttonRef = React.createRef();

  state = {
    anchorEl: null,
  };

  componentDidMount() {
    this.setState({ anchorEl: this.buttonRef.current });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <IconButton
          ref={this.buttonRef}
          aria-label="more"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

LongMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongMenu);
