import React, { Component } from 'react';
import Login from '../Login/Login';
import ChatRoom from '../ChatRoom/ChatRoom';
import NavBar from '../../Components/Navigation/Navigation';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/loginActions'
import classes from './layout.css';
import backgroundImage from './assets/images/neighbors-2.jpg';
class Layout extends Component {
  // get the user's location as soon as they go to the homepage
  componentWillMount() {
    this.getGeoCoords();
  }

  showLocation = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // dispatch action
    this.props.submitLocation(lat, lng)
  }

  getGeoCoords = () => {
    if(navigator.geolocation) {
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
    } else {
       alert("Sorry, browser does not support geolocation!");
    }
  }
  render() {
    let username;
    if (this.props.loggedIn) {
      username = this.props.username
    }
    let image = backgroundImage;
    if (this.props.history[this.props.history.length - 1] === "/chatRoom"){
      console.log("switching to chat route")
      image = ''
    }
    return (
      <div>
        <NavBar username={username}/>
        <div className={classes.BackDrop} style={{backgroundImage: `url(${backgroundImage})`}}></div>
        <main className={classes.Main}>
          <Route path="/" exact component={Login}/>
          <Route path="/chatRoom" exact component = {ChatRoom} />
        </main>
      </div>
    )
  }
}

// store
const mapStateToProps = state => {
  return {
    location: state.loginReducer.location,
    username: state.loginReducer.username,
    loggedIn: state.loginReducer.loggedIn
  }
}

// dispatching actions
const mapDispatchToProps = dispatch => {
  return {
    submitLocation: (lat, lng) => dispatch(actionCreators.submitLocation(lat, lng))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
