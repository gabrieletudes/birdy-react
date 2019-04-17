import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import firebase from 'firebase';

class Captures extends Component {
  state = {
    captures: null,
    uid: firebase.auth().currentUser.uid
  }

  componentDidMount(){
    const userId = this.state.uid;
    // Endpoint on the DB
    const single_captures = firebase.database().ref('single_captures');

    single_captures.orderByChild("uid").equalTo(userId).on('value', single_captures => {
      this.setState({captures:  single_captures.val()})
    });
  }

  renderCaptures() {
    const {captures} = this.state;
    if (captures !== null) {
      const keys = Object.keys(captures);
      return (
        <React.Fragment>
          {
            keys.map((key, capture) =>
              <div key={key}>
                <ul className="list-data">
                  <li className="list-data__element">
                      <h2>{captures[key].latin_name}</h2>
                  </li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Âge</span>{captures[key].age}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Sex</span>{captures[key].gender}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Reprise</span>{captures[key].reprise}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Numéro de bague</span>{captures[key].ring_number}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Poids</span>{captures[key].weight}</li>
                  <li className="list-data__element">
                    <span className="text-bold h-margin-right--tiny">Longueur alaire</span>{captures[key].wings_length}</li>
                  <li className="list-data__element">
                    <NavLink className="btn btn-primary h-margin-top--tiny h-margin-bottom--small" to={'/mescaptures/'+ key} key={key}>Editer</NavLink></li>
                </ul>
              </div>
            )
          }
        </React.Fragment>
      )} else {
        return <p>Vous n’avez encore aucune capture</p>
      }
    }

  render () {
    return (
      <React.Fragment>
        <h1>Mes captures</h1>
        {this.renderCaptures()}
      </React.Fragment>
    )
  }
}

export default Captures;
