import React, { Component } from 'react';
import {BrowserRouter,  Route, Link} from 'react-router-dom';
import './App.css';
import AppNav from './AppNav';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Observation from './Observation';
import DocViewer from './DocViewer';
import Login from './Login';
import * as firebase from 'firebase';
import Database from './Database';


class SenderClient extends Component {
  constructor(props) {
    super(props);
    Database.init()
    this.state = {
      loaded: false,
      initialView: null
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <AppNav>
            <Route exact path="/" component={Login}/>
            <Route path="/observation" component={Observation}/>
            <Route path="/docs" component={DocViewer}/>
            <Route path="/login" component={Login}/>
            {/*<Route path="/mou" component={MOUAgreement}/>*/}
          </AppNav>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

  getInitialView(){
    //<Route path="/login" component={Login}/>
    firebase.auth().onAuthStateChange((user)=> {
      let initialView = user ? "/":"login";
      this.setState({
        loaded: true,
        initialView: initialView
      })
    });
  }
}

export default SenderClient;
