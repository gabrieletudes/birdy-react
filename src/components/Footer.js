import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AppFooter extends Component {
  render () {
    return (
      <nav className="app-nav">
        <NavLink exact to="/" className="app-nav__link" activeClassName="app-nav__link--selected">
          <FontAwesomeIcon icon="hand-holding"size="2x" />
          Capturer
        </NavLink>
        <NavLink to="/encyclopedie" className="app-nav__link" activeClassName="app-nav__link--selected">
          <FontAwesomeIcon icon="feather-alt" size="2x" />
          Encyclopedie
        </NavLink>
        <NavLink to="/captures" className="app-nav__link" activeClassName="app-nav__link--selected">
          <FontAwesomeIcon icon="dove" size="2x" />
          Captures
        </NavLink>
        <NavLink to="/utilisateurs" className="app-nav__link" activeClassName="app-nav__link--selected">
          <FontAwesomeIcon icon="users" size="2x" />
          Utilisateurs
        </NavLink>
      </nav>
    )
  }
}

export default AppFooter;
