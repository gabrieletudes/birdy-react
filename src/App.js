import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import firebase from 'firebase';
import {config} from './configfib';
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Home from './pages/Home'
import Encyclopedia from './pages/Encyclopedia'
import Captures from './pages/Captures'
import Users from './pages/Users'
import AppHeader from './components/Header'
import AppFooter from './components/Footer'

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    firebase.initializeApp(config);
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({user: null});
        localStorage.removeItem('user');
        }
      }
    )
  }

  render() {
      const {user} = this.state
      if(user === null) {
        return (
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={SignInPage}/>
              <Route path="/signup" component={SignUpPage}/>
              <Redirect to="/"/>
            </Switch>
          </BrowserRouter>
          )
      }
      return (
          <BrowserRouter>
            <React.Fragment>
              <AppHeader />
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/encyclopedie" component={Encyclopedia}/>
                  <Route path="/captures" component={Captures}/>
                  <Route path="/utilisateurs" component={Users}/>
                  <Redirect to="/"/>
                </Switch>
              <AppFooter />
            </React.Fragment>
          </BrowserRouter>
      )
  }
}

export default App;
