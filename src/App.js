import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import firebase from 'firebase';
import {config} from './configfib';
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Home from './pages/Home'
import Encyclopedia from './pages/Encyclopedia'
import SingleBird from './pages/SingleBird'
import Captures from './pages/Captures'
import Users from './pages/Users'
import RingingSites from './pages/RingingSites'
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
          <BrowserRouter basename="/birdy-react">
            <Switch>
              <Route path="/" exact component={SignInPage}/>
              <Route path="/signup" component={SignUpPage}/>
              <Redirect to="/"/>
            </Switch>
          </BrowserRouter>
          )
      }
      return (
          <BrowserRouter basename="/birdy-react">
            <React.Fragment>
              <AppHeader />
                <main className="app-main">
                  <Switch location={this.props.location}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/sites-de-baguage" component={RingingSites}/>
                    <Route exact path="/encyclopedie" component={Encyclopedia}/>
                    <Route path='/encyclopedie/:birdId' component={SingleBird} />
                    <Route exact path="/mescaptures" component={Captures}/>
                    <Route path="/utilisateurs" component={Users}/>
                    <Redirect to="/"/>
                  </Switch>
                </main>
              <AppFooter />
            </React.Fragment>
          </BrowserRouter>
      )
  }
}

export default App;
