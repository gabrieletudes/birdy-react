import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

class AppFooter extends Component {
  render () {
    return (
      <nav>
        <NavLink to="/" activeClassName="selected">
          Capturer
        </NavLink>
        <NavLink to="/encyclopedie" activeClassName="selected">
          Encyclopedie
        </NavLink>
        <NavLink to="/captures" activeClassName="selected">
          Captures
        </NavLink>
        <NavLink to="/utilisateurs" activeClassName="selected">
          Utilisateurs
        </NavLink>
      </nav>
    )
  }
}

export default AppFooter;
