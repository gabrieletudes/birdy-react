import React, { Component } from 'react';
import firebase from 'firebase'

class Users extends Component {
  state = {
    users: null,
  }

  componentDidMount(){
    // Endpoint on the DB
    const users = firebase.database().ref('users');

    users.on('value', users => {
      this.setState({users:  users.val()})
    });
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
                <h2>{user.latin_name}</h2>
                <ul className="list-data">
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Nom et Prenom</span>{user.full_name}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Email</span>{user.email}
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
