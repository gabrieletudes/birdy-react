import React, { Component } from 'react';
import firebase from 'firebase'

class Users extends Component {
  state = {
    users: null,
    single_captures: [],
    uid: firebase.auth().currentUser.uid
  }

  componentDidMount(){
    this.getUsersWithCaptures()
  }

  getUsersWithCaptures () {
    // spread user
    const allusers = {...this.state.users}
    // define the Endpoints on the DB
    const theusers = firebase.database().ref('users');
    const capture_sessions = firebase.database().ref('capture_sessions');
    // Retrives all the users
    theusers.on('child_added', (theusers) => {
      // store the user key
      let userId = theusers.key;
      //add user information and capuresamount properties to the allusers array
      allusers[userId] = {information:'', capturesamount: null}
      // affect the the user information to
      allusers[userId].information = theusers.val()
      // Retrives all the captures made by an user
      capture_sessions.orderByChild("uid").equalTo(userId).once('value', (capturesessions) => {
        // Add the amount of captures made by an user
        allusers[userId].capturesamount = capturesessions.val() ? Object.values(capturesessions.val()).length : 0
        //Add it to the state
        this.setState({users: allusers})
      })
    })
  }

  renderUsers() {
    const {users} = this.state;
    if (users !== null) {
      const theusers = Object.values(users);
      return (
        <React.Fragment>
          {
            theusers.map((user, key) =>
              <div key={key}>
                <ul className="list-data">
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Nom et Prenom</span>{user.information.full_name}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Email</span>{user.information.email}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">captures amount</span>{user.capturesamount}
                  </li>
                </ul>
              </div>
            )
          }
        </React.Fragment>
      )} else {
        return <p>No data yet</p>
      }
    }

  render () {
    return (
      <React.Fragment>
        <h1>Les utilisateurs</h1>
        {this.renderUsers()}
      </React.Fragment>
    )
  }
}

export default Users;
