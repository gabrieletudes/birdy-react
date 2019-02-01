import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase'

class Encyclopedia extends Component {
  state = {
    encyclopedia: null,
  }

  componentDidMount(){
    // Endpoint on the DB
    const encyclopedia = firebase.database().ref('encyclopedia');

    encyclopedia.on('value', result => {
      this.setState({encyclopedia:  result.val()})
    });
  }

  renderEncyclopedia() {
    const {encyclopedia} = this.state;
    if (encyclopedia !== null) {
      const values = Object.values(encyclopedia);
      return (
        <React.Fragment>
          {
            values.map((record, key) =>
              <div key={key}>
                <ul className="list-data">
                  <li className="list-data__element list-data__element--no-margin h-full-width h-centered">
                    <NavLink className="" to={'/encyclopedie/'+ key} key={key}>
                      <img src={record.picture} alt={record.common_name} width="auto" height="250" />
                    </NavLink>
                  </li>
                  <li className="list-data__element">
                    <h2>
                      <NavLink className="" to={'/encyclopedie/'+ key} key={key}>
                        {record.common_name}
                      </NavLink>
                    </h2>
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Nom Latin</span>{record.latin_name}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Famille</span>{record.family}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Envergure</span>{record.wingspan}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Habitat</span>{record.habitat}
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Lieux de nidifications</span>{record.nesting_spots}
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
        <h1>Encyclopedie</h1>
        {this.renderEncyclopedia()}
      </React.Fragment>
    )
  }
}

export default Encyclopedia;
