import React, {Component} from 'react'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AppHeader extends Component {

  signOutUser () {
    firebase.auth().signOut();
  }

  render () {
    return (
      <header className="header">
        <h1 className="header__title">Birdy</h1>
        <button onClick={this.signOutUser} className="btn color--beige h-padding--none">
          <FontAwesomeIcon icon="sign-out-alt" size="2x" />
        </button>
      </header>
    )
  }
}

export default AppHeader;
