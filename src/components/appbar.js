import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Feedback from './feedback';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EventIcon from '@material-ui/icons/Event';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 80,
  },
  grown: {
    flexGrow: 120,
    color: 'white',
    fontSize: '24px',
    fontWeight: '400',
    marginRight: '15px',
  },
  grow: {
    color: 'white',
    marginRight: '25px',
  },
  cursor: {
    cursor: 'pointer',
  },
  aapBarButton: {
    marginLeft: '5px',
    marginRight: '15px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: 'black'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showFeedback: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  goHomePage = (e) => {
    this.props.history.push('/home')
  };

  feeback = () => {
    this.setState({
      showFeedback: true
    })
  };

  closePopUp = () => {
    this.setState({ showFeedback: false })
  };

  handleClose = (e) => {
    this.setState({
      showFeedback: false
    })
  };

  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  openYourBookings = () => {
    this.props.history.push('./yourbookings');
  }

  openYourOfferedRides = () => {
    this.props.history.push('./yourofferedrides');
  }

  render() {
    const { classes, theme, fullScreen } = this.props;
    const { open } = this.state;
    let user = localStorage.getItem('user');
    let userName = JSON.parse(user)

    return (
      <div className={classes.root}>
        <CssBaseline />
        {(localStorage.getItem("user") === null) ?
          <>
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" color="white" className={classes.grown}>
                  PariVahan
          </Typography>
              </Toolbar>
            </AppBar>
          </> :
          <React.Fragment>
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="white" className={classes.grown}> <span className="cursor" onClick={(e) => this.goHomePage(e)}>PariVahan </span></Typography>
                <Typography variant="h6" color="white" className={classes.grow}>
                  Welcome: {userName.name}
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  color="default"
                  className={classes.aapBarButton}
                  onClick={this.feeback}
                ><span>
                    Feedback
						      </span>
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  className={classes.aapBarButton}
                  onClick={this.logout}
                ><span>
                    Logout
                    </span>
                </Button>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={'Hello' + ' ' + userName.name} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.openYourBookings}>
                  <ListItemIcon>
                    <DirectionsCarIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Your Bookings">
                  </ListItemText>
                </ListItem>
              </List>
              <List>
                <ListItem button onClick={this.openYourOfferedRides}>
                  <ListItemIcon>
                    <EventIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Your Offered Rides">
                  </ListItemText>
                </ListItem>
              </List>
              <Divider />
            </Drawer>

            <div className='feedBack-popover'>
              {this.state.showFeedback ? <Dialog
                fullScreen={fullScreen}
                open={this.state.showFeedback}
                onClose={this.handleClose}
              >
                <DialogContent>
                  <DialogContentText>
                    <Feedback
                      basePage={'appBar'}
                      closePopUp={this.closePopUp}
                    />
                  </DialogContentText>
                </DialogContent>
              </Dialog> : ''}
            </div>
          </React.Fragment>
        }
      </div>

    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
