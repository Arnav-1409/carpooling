import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './Tab.css'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    flexGrow: 1,
				backgroundColor: theme.palette.background.paper,
  },
});

class DaysTab extends React.Component {
  state = {
    value: 1,
    days:[
      {'id':0,name:"Sun"},
      {'id':1,name:"Mon"},
      {'id':2,name:"Tue"},
      {'id':3,name:"Wed"},
      {'id':4,name:"Thur"},
      {'id':5,name:"Fri"},
      {'id':6,name:"Sat"}
    ]
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.handleChange(event,value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className = "tab-bar">
          <Tabs  value={this.state.value} onChange={this.handleChange} className = "parent-container" indicatorColor="primary" centered >
          {
            this.state.days.map(day=>{
              return (         
                (day.id!=0 && day.id!=6) && <Tab label={day.name} key={day.id} value={day.id}/>
              )
            })
          }
          </Tabs>
        </AppBar>
        {value === 1 && <TabContainer><span><b>MONDAY</b>
        </span>
        </TabContainer>}
        {value === 2 && <TabContainer><span><b>TUESDAY</b>
        </span></TabContainer>}
        {value === 3 && <TabContainer><span><b>WEDNESDAY</b>
        </span></TabContainer>}
        {value === 4 && <TabContainer><span><b>THURSDAY</b>
        </span></TabContainer>}
        {value === 5 && <TabContainer><span><b>FRIDAY</b>
        </span></TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(DaysTab);