import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Home from './pages/Home'
import Encyclopedia from './pages/Encyclopedia'
import Captures from './pages/Captures'
import Users from './pages/Users'
import AppFooter from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">Birdy</h1>
        </header>
      </div>
    );
        return (
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={SignInPage}/>
              <Route path="/signup" component={SignUpPage}/>
              <Redirect to="/"/>
            </Switch>
          </BrowserRouter>
          )
      return (
          <BrowserRouter>
            <React.Fragment>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/encyclopedie" exact component={Encyclopedia}/>
                  <Route path="/captures" exact component={Captures}/>
                  <Route path="/utilisateurs" exact component={Users}/>
                  <Redirect to="/"/>
                </Switch>
              <AppFooter />
            </React.Fragment>
          </BrowserRouter>
      )
  }
}

export default App;
